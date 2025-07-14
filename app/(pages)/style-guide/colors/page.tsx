import { twMerge } from "tailwind-merge";

const colors = ["bg-primary-50"];

const ColorsPage = () => {
  return (
    <div>
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

const colorBlockStyle = "border border-black rounded-lg";
