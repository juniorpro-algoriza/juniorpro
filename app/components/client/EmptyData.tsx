import { PanelsTopLeft } from "lucide-react";
import { MainCard } from "../MainCard";

interface EmptyDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactElement;
}

export const EmptyData = ({
  title,
  description,
  icon = <PanelsTopLeft />,
}: EmptyDataProps) => {
  return (
    <MainCard classname=" bg-[#F9FAFB80] place-items-center space-y-2">
      <div className="flex items-center justify-center border border-gray-200 text-gray-600 p-3 rounded-full w-fit">
        {icon}
      </div>
      <p className="font-bold text-lg text-gray-600">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </MainCard>
  );
};
