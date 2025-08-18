import { DiamondIcon, WalletIcon } from "@icons";
import { getPointsData } from "../../../../../server";

export const PointsAllocationSection = async () => {
  const { pointsBalance, cashBalance } = await getPointsData();
  return (
    <div className="bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4">
      <div>
        <div className="flex items-center">
          <h3 className="text-2xl font-medium text-yankees-blue">
            Points Allocation
          </h3>
        </div>
      </div>

      <div>
        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-carolina-blue-opacity p-4 rounded-2xl border border-antiflash-white drop-shadow-xl">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2 font-medium">
                <p className="text-3xl">{pointsBalance}</p>
                <p>Points Balance</p>
              </div>
              <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
                <DiamondIcon fill="#5879DC" width="25" height="25" />
              </div>
            </div>
          </div>
          <div className="bg-carolina-blue-opacity p-4 rounded-2xl border border-antiflash-white drop-shadow-xl">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2 font-medium">
                <p className="text-3xl">{cashBalance}</p>
                <p>Cash Balance</p>
              </div>
              <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
                <WalletIcon width="25" height="25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
