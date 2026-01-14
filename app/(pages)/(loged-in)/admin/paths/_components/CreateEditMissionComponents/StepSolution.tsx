import { CodeBlockInput } from "@components";

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
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Reference Answer</h3>

      <CodeBlockInput
        value={solutionCode}
        onChange={(e) => updateSolution(e.target.value)}
        placeholder="// Paste the complete solution code here..."
        className="min-h-[300px] font-mono"
        error={fieldErrors.referenceAnswer}
      />
    </div>
  );
};
