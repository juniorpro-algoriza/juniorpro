import { CODE_LANGUAGES, type CodeLanguage } from "../components/CodeEditor/types";

export interface ParsedSubmission {
  notes: string;
  code: string;
  language: CodeLanguage;
}

const VALID_LANGUAGES = new Set<string>(
  CODE_LANGUAGES.map((item) => item.value.toLowerCase())
);

/**
 * Parses raw submissionNotes containing optional notes and a markdown-fenced code block.
 * Format:
 *   [Notes text]
 *   ```[language]
 *   [Code content]
 *   ```
 */
export function parseSubmissionNotes(raw?: string | null): ParsedSubmission {
  if (!raw || !raw.trim()) {
    return { notes: "", code: "", language: "javascript" };
  }

  const trimmed = raw.trim();

  // Match markdown fenced code block at the end: ```[lang]?\n[code]\n```
  const codeBlockRegex = /```([a-zA-Z0-9_-]+)?\r?\n([\s\S]*?)\r?\n```$/;
  const match = trimmed.match(codeBlockRegex);

  if (match) {
    const rawLang = match[1]?.trim().toLowerCase();
    const language: CodeLanguage =
      rawLang && VALID_LANGUAGES.has(rawLang)
        ? (rawLang as CodeLanguage)
        : "javascript";

    const code = match[2]?.trim() || "";
    const notes = trimmed.slice(0, match.index).trim();

    return { notes, code, language };
  }

  // If no fenced code block was found, treat entire string as notes
  return { notes: trimmed, code: "", language: "javascript" };
}

/**
 * Combines separate notes and code into a single markdown string to be stored in the backend.
 */
export function formatSubmissionNotes(
  notes?: string | null,
  code?: string | null,
  language: CodeLanguage = "javascript"
): string | undefined {
  const cleanCode = code?.trim();
  const cleanNotes = notes?.trim() || "";

  if (!cleanCode && !cleanNotes) {
    return undefined;
  }

  if (!cleanCode) {
    return cleanNotes;
  }

  const codeFence = `\`\`\`${language}\n${cleanCode}\n\`\`\``;

  return cleanNotes ? `${cleanNotes}\n\n${codeFence}` : codeFence;
}
