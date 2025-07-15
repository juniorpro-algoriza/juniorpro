// TODO: Add all colors from design
import { twMerge } from "tailwind-merge";

const ColorsPage = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {colors.map((c) => {
        const className = twMerge(colorBlockStyle, c);
        return (
          <div className={className} key={c}>
            {c}
          </div>
        );
      })}
    </div>
  );
};

export default ColorsPage;

const colorBlockStyle =
  "border border-black w-24 h-24 py-2 px-2 flex items-center justify-center text-center rounded-full";

const colors = [
  "bg-primary-50",
  "bg-primary-100",
  "bg-primary-200",
  "bg-primary-300",
  "bg-primary-400",
  "bg-primary-500",
  "bg-primary-600",
  "bg-primary-700",
  "bg-primary-800",
  "bg-primary-900",
  "bg-primary-1000",
];
