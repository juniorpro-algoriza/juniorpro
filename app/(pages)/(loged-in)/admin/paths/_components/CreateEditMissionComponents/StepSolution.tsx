"use client";

import { useState } from "react";
import { CodeEditor, type CodeLanguage } from "@components";

interface StepSolutionProps {
  solutionCode: string;
  updateSolution: (value: string) => void;
  fieldErrors?: Record<string, string>;
}

export const StepSolution = ({
  solutionCode,
  updateSolution,
  fieldErrors = {},
}: StepSolutionProps) => {
  const [language, setLanguage] = useState<CodeLanguage>("javascript");

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Reference Answer</h3>

      <CodeEditor
        value={solutionCode}
        onChange={updateSolution}
        language={language}
        onLanguageChange={setLanguage}
        placeholder="// Paste or write the complete solution code here..."
        minHeight="320px"
        error={fieldErrors.referenceAnswer}
      />
    </div>
  );
};
