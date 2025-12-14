import { Button, Input, MainCard } from "@components";
import { CircleCheck, Plus, XIcon } from "lucide-react";
import { Criteria } from "./types";

interface StepCriteriaProps {
  criteria: Criteria[];
  addCriteria: () => void;
  updateCriteria: (id: string, value: string) => void;
  removeCriteria: (id: string) => void;
  fieldErrors?: Record<string, string>;
}

export const StepCriteria = ({
  criteria,
  addCriteria,
  updateCriteria,
  removeCriteria,
  fieldErrors = {}
}: StepCriteriaProps) => (
  <div className="space-y-2 max-h-[550px] overflow-y-auto">
    <div className="p-5 rounded-2xl text-center border-[#E0E7FF] border bg-[#EEF2FF] mb-5 sm:space-y-3">
      <p className="font-semibold text-lg">Success Criteria</p>
      <p className="text-sm text-dark-blue-main">
        Define clear goals for the student. What must be true for this mission
        to be considered complete?
      </p>
    </div>
    <div className="flex items-center justify-between flex-wrap gap-3">
      <h3 className="font-semibold text-lg">Success Criteria</h3>
      <Button
        intent="main"
        size="mainDefault"
        type="button"
        onClick={addCriteria}
      >
        <Plus /> Add Success Criteria
      </Button>
    </div>

    <MainCard classname="space-y-4 ">
      {criteria.map((item, index) => (
        <div key={item.id} className="flex items-center sm:gap-3 gap-1 w-full">
          <div className="p-1 rounded-full bg-green-100 text-green-700">
            <CircleCheck className="size-5" />
          </div>
          <div className="flex-1">
            <Input
                  name={`successCriterias[${index}][description]`}
              value={item.label}
              onChange={(e) => updateCriteria(item.id, e.target.value)}
              placeholder="e.g. Code runs without errors"
                  error={fieldErrors[`successCriterias.${index}.description`]}
            />
          </div>
          <XIcon
            className="size-4 cursor-pointer text-gray-300 hover:text-red-500 transition-colors"
            onClick={() => removeCriteria(item.id)}
          />
        </div>
      ))}
    </MainCard>
  </div>
);
