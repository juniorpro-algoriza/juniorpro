import type { SVGProps } from "react";

interface PointsCardProps {
  title: string;
  value: number;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
}

export const PointsCard = ({ title, value, Icon }: PointsCardProps) => {
  return (
    <div className="bg-carolina-blue-opacity p-4 rounded-2xl border border-antiflash-white drop-shadow-xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 font-medium">
          <p className="text-3xl">{value}</p>
          <p>{title}</p>
        </div>
        <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
          <Icon fill="var( --color-violet-normal)" width="25" height="25" />
        </div>
      </div>
    </div>
  );
};
