"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { linter, type Diagnostic } from "@codemirror/lint";
import { ensureSyntaxTree } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { java } from "@codemirror/lang-java";

import { getEditorTheme } from "./themes";
import type {
  CodeLanguage,
  CursorPosition,
  EditorTheme,
  SyntaxIssue,
} from "./types";

const languageExtension = (language: CodeLanguage = "javascript") => {
  switch (language) {
    case "typescript":
      return javascript({ jsx: true, typescript: true });
    case "python":
      return python();
    case "html":
      return html();
    case "css":
      return css();
    case "java":
      return java();
    default:
      return javascript({ jsx: true });
  }
};

const findSyntaxErrors = (state: EditorState): Diagnostic[] => {
  const tree = ensureSyntaxTree(state, state.doc.length, 5000);
  if (!tree) return [];

  const diagnostics: Diagnostic[] = [];
  const seenLines = new Set<number>();

  tree.cursor().iterate((node) => {
    if (!node.type.isError) return;

    const line = state.doc.lineAt(node.from);
    const from = Math.min(node.from, line.to);
    const to = node.to > node.from ? node.to : Math.min(from + 1, line.to);

    if (seenLines.has(line.number)) return;
    seenLines.add(line.number);

    diagnostics.push({
      from,
      to: to > from ? to : from,
      severity: "error",
      message: describeError(state, node.from, node.to),
    });
  });

  return diagnostics;
};

const describeError = (state: EditorState, from: number, to: number) => {
  if (from >= state.doc.length) {
    return "Unexpected end of input — check for an unclosed bracket, quote, or tag";
  }

  const raw = state.doc.sliceString(from, to > from ? to : from + 12);
  const token = raw.trim().split(/\s+/)[0];

  return token
    ? `Unexpected token "${token.slice(0, 24)}"`
    : "Unexpected syntax here";
};

export interface CodeMirrorFieldProps {
  value: string;
  onChange?: (value: string) => void;
  onIssuesChange?: (issues: SyntaxIssue[]) => void;
  onCursorChange?: (pos: CursorPosition) => void;
  language?: CodeLanguage;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  theme?: EditorTheme;
  fontSize?: number;
  showLineNumbers?: boolean;
  showFoldGutter?: boolean;
}

const CodeMirrorField = ({
  value,
  onChange,
  onIssuesChange,
  onCursorChange,
  language = "javascript",
  placeholder,
  readOnly = false,
  minHeight = "260px",
  maxHeight,
  theme = "dark",
  fontSize = 13,
  showLineNumbers = true,
  showFoldGutter = true,
}: CodeMirrorFieldProps) => {
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const onIssuesChangeRef = useRef(onIssuesChange);
  const onCursorChangeRef = useRef(onCursorChange);
  const lastReportedIssuesRef = useRef<string>("");

  useEffect(() => {
    onIssuesChangeRef.current = onIssuesChange;
  }, [onIssuesChange]);

  useEffect(() => {
    onCursorChangeRef.current = onCursorChange;
  }, [onCursorChange]);

  const reportIssues = useCallback(
    (state: EditorState, diagnostics: Diagnostic[]) => {
      const issues: SyntaxIssue[] = diagnostics.map((diagnostic) => {
        const line = state.doc.lineAt(diagnostic.from);
        return {
          line: line.number,
          column: diagnostic.from - line.from + 1,
          message: diagnostic.message,
        };
      });

      const serialized = JSON.stringify(issues);
      if (serialized === lastReportedIssuesRef.current) return;
      lastReportedIssuesRef.current = serialized;
      onIssuesChangeRef.current?.(issues);
    },
    []
  );

  const customExtensions = useMemo(() => {
    return [
      languageExtension(language),
      EditorView.lineWrapping,
      keymap.of([indentWithTab]),
      EditorView.updateListener.of((update) => {
        if (update.selectionSet || update.docChanged) {
          const head = update.state.selection.main.head;
          const line = update.state.doc.lineAt(head);
          const column = head - line.from + 1;
          onCursorChangeRef.current?.({ line: line.number, column });
        }
      }),
      linter(
        (view) => {
          const diagnostics = findSyntaxErrors(view.state);
          reportIssues(view.state, diagnostics);
          return diagnostics;
        },
        { delay: 350 }
      ),
      ...getEditorTheme(theme, fontSize),
    ];
  }, [language, theme, fontSize, reportIssues]);

  return (
    <div className="w-full h-full relative font-mono">
      <CodeMirror
        ref={editorRef}
        key={`${language}-${theme}`}
        value={value}
        onChange={onChange}
        extensions={customExtensions}
        placeholder={placeholder}
        readOnly={readOnly}
        minHeight={minHeight}
        maxHeight={maxHeight}
        basicSetup={{
          lineNumbers: showLineNumbers,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: showFoldGutter,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: false,
          crosshairCursor: false,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};

export default CodeMirrorField;
