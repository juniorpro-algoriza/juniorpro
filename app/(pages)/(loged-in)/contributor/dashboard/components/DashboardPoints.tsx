import { Button, ModalLink, PointsCard } from "@components";
import { EmptyData } from "@components/client";
import { DiamondIcon, WalletIcon } from "@icons";
import { getPointsData } from "@server";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import type { SVGProps } from "react";

interface Junior {
  id: number;
  name: string;
  points: number;
}

interface PointsData {
  pointsAllocation: number;
  pointsBalance: number;
  cashBalance: number;
  juniors: Junior[];
}

export const DashboardPoints = async () => {
  const { pointsBalance, cashBalance, juniors }: PointsData =
    await getPointsData();

  const data = [
    {
      title: "Points Balance",
      value: pointsBalance,
      Icon: DiamondIcon as React.FC<SVGProps<SVGSVGElement>>,
    },
    {
      title: "Cash Balance",
      value: cashBalance,
      Icon: WalletIcon as React.FC<SVGProps<SVGSVGElement>>,
    },
  ];

  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium text-yankees-blue">
          Points Allocation ({juniors.length})
        </h3>
        {juniors.length ? (
          <Link href="./points">
            <Button
              intent="tertiary"
              iconPosition="right"
              size="small"
              className="border-none text-violet-normal"
              icon={<ChevronRight className="w-4 h-4" />}
            >
              View All
            </Button>
          </Link>
        ) : null}
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {data.map((item, index) => (
          <PointsCard key={index} {...item} />
        ))}
      </div>

      {/* Points List */}
      <div className="space-y-4">
        {juniors.length ? (
          juniors.map(({ name, points, id }) => (
            <div
              key={id}
              className="flex items-end justify-between p-3 rounded-2xl border border-antiflash-white shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <p className="font-medium">{name}</p>
                <p className="text-2xl font-medium text-violet-normal">
                  {points}
                </p>
              </div>
              <ModalLink name="AssignPointsForJuniors">
                {" "}
                <Button
                  intent="tertiary"
                  size="small"
                  className="text-violet-normal border-violet-normal p-2"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </ModalLink>
            </div>
          ))
        ) : (
          <EmptyData projectsNum={0} description="No points added yet" />
        )}
      </div>
    </div>
  );
};
