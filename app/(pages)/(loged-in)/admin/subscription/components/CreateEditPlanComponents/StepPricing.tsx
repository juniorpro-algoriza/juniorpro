import { Input, Select } from "@components";
import { PlanFormData } from "./types";
import { Dispatch, SetStateAction } from "react";
import { DollarSign } from "lucide-react";

interface StepPricingProps {
  formData: PlanFormData;
  setFormData: Dispatch<SetStateAction<PlanFormData>>;
}

// const PricingInput = ({
//   cycle,
//   price,
//   onChange,
// }: {
//   cycle: "monthly" | "yearly";
//   price: number;
//   onChange: (value: number) => void;
// }) => (
//   <Input
//     label={`${cycle === "monthly" ? "Monthly" : "Yearly"} Price *`}
//     placeholder="0"
//     type="number"
//     min={0}
//     value={price || ""}
//     onChange={(e) => onChange(Number(e.target.value))}
//     leftIcon={<DollarSign className="size-4 text-gray-400" strokeWidth={3} />}
//     helperText={`Amount charged per ${cycle === "monthly" ? "month" : "year"}`}
//     containerClassName="max-w-md"
//     className="placeholder:text-3xl h-16 text-3xl font-semibold placeholder:max-md:text-3xl"
//   />
// );

export const StepPricing = ({ formData, setFormData }: StepPricingProps) => {
  const handleChange = <T extends keyof PlanFormData>(
    field: T,
    value: PlanFormData[T],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const tabs: TabData[] = useMemo(
  //   () => [
  //     {
  //       name: "Monthly",
  //       content: (
  //         <PricingInput
  //           cycle="monthly"
  //           price={formData.monthlyPrice}
  //           onChange={(val) => handleChange("monthlyPrice", val)}
  //         />
  //       ),
  //     },
  //     {
  //       name: "Yearly",
  //       content: (
  //         <PricingInput
  //           cycle="yearly"
  //           price={formData.yearlyPrice}
  //           onChange={(val) => handleChange("yearlyPrice", val)}
  //         />
  //       ),
  //     },
  //   ],
  //   [formData.monthlyPrice, formData.yearlyPrice]
  // );

  return (
    <div className="space-y-6 py-2">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Pricing</h3>
        <p className="text-sm text-gray-600">
          Set your plan pricing and billing cycle
        </p>
      </div>

      {/* <div className="space-y-3">
        <p className="text-sm font-medium text-midnight">Billing Cycle</p>
        <Tabs
          tabs={tabs}
          tabListClassName="border-0 p-0"
          tabPanelsClassName="mt-3"
        />

      </div> */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-midnight mb-2">
            Duration Type *
          </label>
          <Select
            value={formData.durationType.toString()}
            options={[
              { value: "1", label: "Daily" },
              { value: "2", label: "Weekly" },
              { value: "3", label: "Monthly" },
              { value: "4", label: "Annual" },
            ]}
            onChange={(value) => handleChange("durationType", Number(value))}
            placeholder="Select duration type"
          />
        </div>
        
        <Input
          label="Price *"
          placeholder="0"
          type="number"
          min={0}
          value={formData.price ?? ""}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          leftIcon={<DollarSign className="size-4 text-gray-400" strokeWidth={3} />}
          helperText={`Amount charged per ${formData.durationType === 1 ? "day" : formData.durationType === 2 ? "week" : formData.durationType === 3 ? "month" : "year"}`}
          containerClassName="max-w-md"
          className="placeholder:text-3xl h-16 text-3xl font-semibold placeholder:max-md:text-3xl"
        />
      </div>
    </div>
  );
};
