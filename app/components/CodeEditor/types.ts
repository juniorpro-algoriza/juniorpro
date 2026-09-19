export const CODE_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "java", label: "Java" },
] as const;

export type CodeLanguage = (typeof CODE_LANGUAGES)[number]["value"];

export type EditorTheme = "dark" | "light";

export interface CursorPosition {
  line: number;
  column: number;
}

export interface SyntaxIssue {
  line: number;
  column: number;
  message: string;
}

export interface CodeEditorProps {
  label?: React.ReactNode;
  optionalHint?: string;
  value: string;
  onChange?: (value: string) => void;
  language?: CodeLanguage;
  onLanguageChange?: (language: CodeLanguage) => void;
  onIssuesChange?: (issues: SyntaxIssue[]) => void;
  placeholder?: string;
  error?: string;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  className?: string;
  initialTheme?: EditorTheme;
  showThemeToggle?: boolean;
  showLanguageSelect?: boolean;
  showToolbar?: boolean;
  showStatusBar?: boolean;
  showLineNumbers?: boolean;
  showFoldGutter?: boolean;
  enableFullscreen?: boolean;
  enableCopy?: boolean;
  enableClear?: boolean;
  enableFontSizeControl?: boolean;
}
