import { CodeBlockInput } from "@components";

interface StepSolutionProps {
  solutionCode: string;
  updateSolution: (value: string) => void;
}

export const StepSolution = ({
  solutionCode,
  updateSolution,
}: StepSolutionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Reference Answer</h3>

      <CodeBlockInput
        value={solutionCode}
        onChange={(e) => updateSolution(e.target.value)}
        placeholder="// Paste the complete solution code here..."
        className="min-h-[300px] font-mono"
      />
    </div>
  );
};
