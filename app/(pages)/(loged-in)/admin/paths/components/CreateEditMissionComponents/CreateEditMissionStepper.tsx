import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@components";
import { cx } from "@lib";

export function CreateEditMissionStepper({
  value,
  onClick,
  steps,
}: {
  value: number;
  onClick: (value: number) => void;
  steps: {
    step: number;
    title: string;
  }[];
}) {
  return (
    <Stepper value={value} className="w-full ">
      {steps.map(({ step, title }) => (
        <StepperItem
          className="relative flex-1 flex-col!"
          key={step}
          step={step}
        >
          <div className="flex-col flex justify-center items-center z-10 gap-2 rounded">
            <StepperIndicator
              className={cx(step < value && "cursor-pointer")}
              onClick={() => {
                if (step < value) {
                  onClick(step);
                }
              }}
            />
            <StepperTitle>{title}</StepperTitle>
          </div>
          {step < steps.length && (
            <StepperSeparator className="-order-1 -translate-y-1/2 absolute inset-x-0 top-4 left-[calc(50%+0.75rem+0.125rem)] m-0 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
          )}
        </StepperItem>
      ))}
    </Stepper>
  );
}
