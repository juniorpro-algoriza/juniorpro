import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import type { EditorTheme } from "./types";

export const getEditorTheme = (
  theme: EditorTheme,
  fontSize: number = 13
): Extension[] => {
  const baseTheme = EditorView.theme({
    "&": {
      fontSize: `${fontSize}px`,
      height: "100%",
    },
    "&.cm-focused": {
      outline: "none",
    },
    ".cm-scroller": {
      fontFamily:
        '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      lineHeight: "1.65",
    },
    ".cm-content": {
      padding: "12px 0",
      caretColor: theme === "dark" ? "#38bdf8" : "#2563eb",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftWidth: "2px",
      borderLeftColor: theme === "dark" ? "#38bdf8" : "#2563eb",
    },
    ".cm-gutters": {
      border: "none",
      fontSize: `${Math.max(11, fontSize - 2)}px`,
      userSelect: "none",
    },
    ".cm-foldGutter": {
      width: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: theme === "dark" ? "#334155" : "#e2e8f0",
      border: "none",
      color: theme === "dark" ? "#94a3b8" : "#64748b",
      padding: "0 6px",
      borderRadius: "4px",
      margin: "0 2px",
    },
    ".cm-tooltip": {
      borderRadius: "8px",
      boxShadow:
        "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      border: theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
    },
    ".cm-tooltip-autocomplete": {
      "& > ul": {
        maxHeight: "220px",
        fontFamily: "inherit",
      },
      "& > ul > li": {
        padding: "4px 8px",
        borderRadius: "4px",
        margin: "1px 4px",
      },
    },
  });

  if (theme === "dark") {
    const darkOverrides = EditorView.theme(
      {
        "&": {
          backgroundColor: "#181825",
          color: "#cdd6f4",
        },
        ".cm-gutters": {
          backgroundColor: "#11111b",
          color: "#6c7086",
          borderRight: "1px solid #1e1e2e",
        },
        ".cm-activeLine": {
          backgroundColor: "#1e1e2e80",
        },
        ".cm-activeLineGutter": {
          backgroundColor: "#181825",
          color: "#cdd6f4",
        },
        ".cm-selectionMatch": {
          backgroundColor: "#45475a66",
        },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
          {
            backgroundColor: "#45475a80 !important",
          },
      },
      { dark: true }
    );

    return [oneDark, baseTheme, darkOverrides];
  }

  // Light Theme
  const lightTheme = EditorView.theme({
    "&": {
      backgroundColor: "#ffffff",
      color: "#1e293b",
    },
    ".cm-gutters": {
      backgroundColor: "#f8fafc",
      color: "#94a3b8",
      borderRight: "1px solid #f1f5f9",
    },
    ".cm-activeLine": {
      backgroundColor: "#f8fafc",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#f1f5f9",
      color: "#334155",
      fontWeight: "bold",
    },
    ".cm-selectionMatch": {
      backgroundColor: "#e0e7ff",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: "#dbeafe !important",
      },
  });

  return [
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    baseTheme,
    lightTheme,
  ];
};
