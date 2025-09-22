import { Button } from "@components";
import { DiamondIcon, DocumentIcon, FireIcon, HourGlassIcon } from "@icons";
interface DashboardCardsProps {
  statistics: {
    dailyStreak: number;
    finishedTasks: number;
    pendingTasks: number;
    myPoints: number;
  };
}

export const DashboardCards = async ({ statistics }: DashboardCardsProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-light-red p-4 rounded-2xl border border-border-secondary">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 font-medium">
              <p className="text-3xl text-danger-500">
                {statistics?.dailyStreak || 0}
              </p>
              <p className="text-content-secondary font-medium text-xl">
                Daily Streak
              </p>
              <span className="text-content-secondary font-medium">
                Keep learning every day!
              </span>
            </div>
            <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
              <FireIcon fill="#5879DC" width="25" height="25" />
            </div>
          </div>
        </div>
        <div className="bg-light-green p-4 rounded-2xl border border-border-secondary">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 font-medium">
              <p className="text-3xl text-success-500">
                {statistics?.finishedTasks || 0}
              </p>
              <p className="text-content-secondary font-medium text-xl">
                Finished Tasks
              </p>
              <span className="text-content-secondary font-medium">
                Impressive work!
              </span>
            </div>
            <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
              <DocumentIcon fill="#5879DC" width="25" height="25" />
            </div>
          </div>
        </div>
        <div className="bg-light-carrot-orange p-4 rounded-2xl border border-border-secondary">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 font-medium">
              <p className="text-3xl text-dark-orange">
                {statistics?.pendingTasks || 0}
              </p>
              <p className="text-content-secondary font-medium text-xl">
                Pending Tasks
              </p>
              <span className="text-content-secondary font-medium">
                You've got this!
              </span>
            </div>
            <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
              <HourGlassIcon fill="#5879DC" width="25" height="25" />
            </div>
          </div>
        </div>
        <div className="bg-white shadow p-4 rounded-2xl border border-antiflash-white space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 font-medium">
              <p className="text-3xl text-yankees-blue">
                {statistics?.myPoints || 0}
              </p>
              <p className="text-content-secondary font-medium text-xl">
                My Points
              </p>
            </div>
            <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
              <DiamondIcon fill="#5879DC" width="25" height="25" />
            </div>
          </div>
          <Button intent="primary" className="w-full">
            Request Points
          </Button>
        </div>
      </div>
    </div>
  );
};
