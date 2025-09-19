import { PointsCard } from "@components";
import { DiamondIcon, WalletIcon } from "@icons";
import type { SVGProps } from "react";
import { getPointsData } from "@server";

export const Points = async () => {
  const { pointsBalance, cashBalance } = await getPointsData();
  const data = [
    {
      title: "Points Balance",
      value: pointsBalance as number,
      Icon: DiamondIcon as React.FC<SVGProps<SVGSVGElement>>,
    },
    {
      title: "Cash Balance",
      value: cashBalance as number,
      Icon: WalletIcon as React.FC<SVGProps<SVGSVGElement>>,
    },
  ];
  return (
    <>
      <h1 className="text-2xl font-medium text-yankees-blue mb-4">
        Points Allocation
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <PointsCard key={index} {...item} />
        ))}
      </div>
    </>
  );
};
