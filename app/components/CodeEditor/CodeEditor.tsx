"use client";

import { useCallback, useEffect, useId, useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Maximize2,
  Minimize2,
  Moon,
  RotateCcw,
  Sun,
} from "lucide-react";
import { cx } from "@lib";
import {
  CODE_LANGUAGES,
  type CodeEditorProps,
  type CodeLanguage,
  type CursorPosition,
  type EditorTheme,
  type SyntaxIssue,
} from "./types";

const CodeMirrorField = dynamic(() => import("./CodeMirrorField"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[260px] animate-pulse bg-gray-900/10 flex items-center justify-center text-sm text-gray-400"
      aria-hidden="true"
    >
      Loading editor...
    </div>
  ),
});

export const CodeEditor = ({
  label,
  optionalHint,
  value,
  onChange,
  language = "javascript",
  onLanguageChange,
  onIssuesChange,
  placeholder,
  error,
  readOnly = false,
  minHeight = "260px",
  maxHeight,
  className,
  initialTheme = "dark",
  showThemeToggle = true,
  showLanguageSelect = true,
  showToolbar = true,
  showStatusBar = true,
  showLineNumbers = true,
  showFoldGutter = true,
  enableFullscreen = true,
  enableCopy = true,
  enableClear = true,
  enableFontSizeControl = true,
}: CodeEditorProps) => {
  const [theme, setTheme] = useState<EditorTheme>(initialTheme);
  const [fontSize, setFontSize] = useState<number>(13);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [cursor, setCursor] = useState<CursorPosition>({ line: 1, column: 1 });
  const [issues, setIssues] = useState<SyntaxIssue[]>([]);
  const [showIssuesDrawer, setShowIssuesDrawer] = useState<boolean>(false);
  const editorId = useId();

  const handleIssuesChange = useCallback(
    (next: SyntaxIssue[]) => {
      setIssues(next);
      onIssuesChange?.(next);
    },
    [onIssuesChange]
  );

  // Close fullscreen on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // Lock body scroll when in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFullscreen]);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleClear = () => {
    if (readOnly || !onChange) return;
    if (window.confirm("Are you sure you want to clear the editor?")) {
      onChange("");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const zoomIn = () => setFontSize((s) => Math.min(22, s + 1));
  const zoomOut = () => setFontSize((s) => Math.max(11, s - 1));

  const lineCount = value.split("\n").length;
  const charCount = value.length;
  const hasCode = value.trim().length > 0;
  const hasIssues = issues.length > 0;

  const isDark = theme === "dark";

  const editorContainer = (
    <div
      className={cx(
        "rounded-2xl border transition-all flex flex-col overflow-hidden shadow-sm",
        isDark ? "bg-[#181825] border-gray-800" : "bg-white border-gray-200",
        error || (hasIssues && hasCode)
          ? "border-red-500/80 ring-1 ring-red-500/30"
          : isDark
            ? "border-gray-800"
            : "border-gray-200",
        isFullscreen ? "w-full h-full flex-1 max-h-[92vh]" : ""
      )}
    >
      {/* Toolbar */}
      {showToolbar && (
        <div
          className={cx(
            "flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 border-b select-none transition-colors",
            isDark
              ? "bg-[#11111b] border-gray-800/80 text-gray-300"
              : "bg-gray-50 border-gray-200 text-gray-700"
          )}
        >
          {/* Left: Window Controls & Language */}
          <div className="flex items-center gap-3">
            <div className="flex space-x-1.5" aria-hidden="true">
              <span className="w-3 h-3 bg-red-500/90 rounded-full inline-block" />
              <span className="w-3 h-3 bg-yellow-500/90 rounded-full inline-block" />
              <span className="w-3 h-3 bg-green-500/90 rounded-full inline-block" />
            </div>

            {showLanguageSelect && onLanguageChange ? (
              <select
                aria-label="Programming Language"
                value={language}
                onChange={(e) =>
                  onLanguageChange(e.target.value as CodeLanguage)
                }
                disabled={readOnly}
                className={cx(
                  "text-xs font-semibold rounded-lg px-2.5 py-1 outline-none transition-all cursor-pointer border disabled:cursor-not-allowed",
                  isDark
                    ? "bg-[#1e1e2e] hover:bg-[#313244] text-gray-200 border-gray-700"
                    : "bg-white hover:bg-gray-100 text-gray-800 border-gray-300"
                )}
              >
                {CODE_LANGUAGES.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className={
                      isDark
                        ? "bg-[#1e1e2e] text-gray-200"
                        : "bg-white text-gray-900"
                    }
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className={cx(
                  "text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md",
                  isDark
                    ? "bg-[#1e1e2e] text-blue-300 border border-blue-900/30"
                    : "bg-blue-50 text-blue-700 border border-blue-100"
                )}
              >
                {language}
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            {/* Font Size Zoom Controls */}
            {enableFontSizeControl && (
              <div
                className={cx(
                  "hidden sm:flex items-center rounded-lg border text-xs overflow-hidden",
                  isDark
                    ? "border-gray-800 bg-[#1e1e2e] text-gray-300"
                    : "border-gray-300 bg-white text-gray-700"
                )}
              >
                <button
                  type="button"
                  onClick={zoomOut}
                  title="Decrease font size"
                  className="px-2 py-1 hover:bg-black/10 transition-colors"
                >
                  A-
                </button>
                <span className="px-1.5 text-[11px] font-mono text-gray-400">
                  {fontSize}px
                </span>
                <button
                  type="button"
                  onClick={zoomIn}
                  title="Increase font size"
                  className="px-2 py-1 hover:bg-black/10 transition-colors"
                >
                  A+
                </button>
              </div>
            )}

            {/* Theme Switcher */}
            {showThemeToggle && (
              <button
                type="button"
                onClick={toggleTheme}
                title={
                  isDark ? "Switch to light theme" : "Switch to dark theme"
                }
                className={cx(
                  "p-1.5 rounded-lg border transition-colors flex items-center justify-center",
                  isDark
                    ? "border-gray-700/80 bg-[#1e1e2e] hover:bg-[#313244] text-amber-300"
                    : "border-gray-300 bg-white hover:bg-gray-100 text-indigo-600"
                )}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="size-3.5" />
                ) : (
                  <Moon className="size-3.5" />
                )}
              </button>
            )}

            {/* Copy Button */}
            {enableCopy && (
              <button
                type="button"
                onClick={handleCopy}
                disabled={!value}
                title="Copy code"
                className={cx(
                  "flex items-center gap-1 px-2 py-1 text-xs rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed",
                  copied
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                    : isDark
                      ? "border-gray-700/80 bg-[#1e1e2e] hover:bg-[#313244] text-gray-300"
                      : "border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                )}
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}

            {/* Clear Button */}
            {enableClear && !readOnly && hasCode && onChange && (
              <button
                type="button"
                onClick={handleClear}
                title="Clear code"
                className={cx(
                  "p-1.5 rounded-lg border transition-colors",
                  isDark
                    ? "border-gray-700/80 bg-[#1e1e2e] hover:bg-red-950/40 text-gray-400 hover:text-red-400"
                    : "border-gray-300 bg-white hover:bg-red-50 text-gray-500 hover:text-red-600"
                )}
                aria-label="Clear code"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}

            {/* Fullscreen Toggle */}
            {enableFullscreen && (
              <button
                type="button"
                onClick={() => setIsFullscreen((prev) => !prev)}
                title={isFullscreen ? "Exit Fullscreen (Esc)" : "Expand Editor"}
                className={cx(
                  "p-1.5 rounded-lg border transition-colors",
                  isDark
                    ? "border-gray-700/80 bg-[#1e1e2e] hover:bg-[#313244] text-gray-300"
                    : "border-gray-300 bg-white hover:bg-gray-100 text-gray-700"
                )}
                aria-label={
                  isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                }
              >
                {isFullscreen ? (
                  <Minimize2 className="size-3.5" />
                ) : (
                  <Maximize2 className="size-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* CodeMirror Field */}
      <div className="flex-1 min-h-0 overflow-auto">
        <CodeMirrorField
          value={value}
          onChange={onChange}
          onIssuesChange={handleIssuesChange}
          onCursorChange={setCursor}
          language={language}
          placeholder={placeholder}
          readOnly={readOnly}
          minHeight={isFullscreen ? "calc(100vh - 220px)" : minHeight}
          maxHeight={isFullscreen ? undefined : maxHeight}
          theme={theme}
          fontSize={fontSize}
          showLineNumbers={showLineNumbers}
          showFoldGutter={showFoldGutter}
        />
      </div>

      {/* Syntax Issues Drawer */}
      {hasIssues && showIssuesDrawer && (
        <div
          className={cx(
            "border-t p-3 text-xs max-h-48 overflow-y-auto space-y-1.5 animate-fadeIn",
            isDark
              ? "bg-[#181825] border-red-900/50 text-red-300"
              : "bg-red-50/70 border-red-200 text-red-700"
          )}
        >
          <div className="flex items-center justify-between pb-1 font-semibold border-b border-red-500/20">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="size-3.5" /> Syntax Issues (
              {issues.length})
            </span>
            <button
              type="button"
              onClick={() => setShowIssuesDrawer(false)}
              className="text-[11px] underline opacity-80 hover:opacity-100"
            >
              Hide
            </button>
          </div>
          <ul className="space-y-1 pl-1">
            {issues.map((issue, idx) => (
              <li
                key={`${issue.line}-${issue.column}-${idx}`}
                className="flex items-start gap-2 font-mono text-[11px]"
              >
                <span className="font-semibold shrink-0 opacity-75">
                  Line {issue.line}:{issue.column}
                </span>
                <span>— {issue.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Status Bar */}
      {showStatusBar && (
        <div
          className={cx(
            "flex flex-wrap items-center justify-between gap-2 px-3.5 py-1.5 border-t text-[11px] font-mono select-none transition-colors",
            isDark
              ? "bg-[#11111b] border-gray-800/80 text-gray-400"
              : "bg-gray-50 border-gray-200 text-gray-600"
          )}
        >
          {/* Left Stats */}
          <div className="flex items-center gap-3">
            <span>
              Ln {cursor.line}, Col {cursor.column}
            </span>
            <span className="text-gray-500">•</span>
            <span>
              {lineCount} {lineCount === 1 ? "line" : "lines"}
            </span>
            <span className="text-gray-500">•</span>
            <span>{charCount} chars</span>
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-2">
            {hasCode ? (
              hasIssues ? (
                <button
                  type="button"
                  onClick={() => setShowIssuesDrawer((prev) => !prev)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-400 font-sans font-medium transition-colors"
                >
                  <AlertCircle className="size-3.5" />
                  <span>
                    {issues.length} {issues.length === 1 ? "issue" : "issues"}
                  </span>
                  {showIssuesDrawer ? (
                    <ChevronDown className="size-3" />
                  ) : (
                    <ChevronUp className="size-3" />
                  )}
                </button>
              ) : (
                <span className="flex items-center gap-1 text-emerald-500 font-sans font-medium">
                  <CheckCircle2 className="size-3.5" />
                  <span>Syntax valid</span>
                </span>
              )
            ) : (
              <span className="text-gray-500 font-sans">Ready</span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={cx("flex flex-col space-y-1.5", className)}>
      {label && (
        <label
          htmlFor={editorId}
          className="text-sm font-medium text-midnight flex items-center justify-between"
        >
          <span>{label}</span>
          {optionalHint && (
            <span className="text-gray-400 text-xs font-normal">
              {optionalHint}
            </span>
          )}
        </label>
      )}

      {/* Regular View */}
      {editorContainer}

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-full max-w-6xl h-full flex flex-col">
            {editorContainer}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};
