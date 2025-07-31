import { Button } from "@components";
import { Bell } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="pb-8">
      <div>
        <div className="flex items-center justify-between w-full pb-6 border-b border-border-secondary">
          <h1 className="pl-12 text-[28px] font-medium text-yankees-blue mt-2">
            Dashboard
          </h1>
          <Button
            intent="unset"
            size="medium"
            className="bg-white shadow rounded-[40px] p-3"
          >
            <Bell size={20} className="text-cadetGray" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <h2 className="text-3xl text-violet-normal font-medium">
            Welcome, Adam!
          </h2>
        </div>
        <p className="text-storm-500 text-xl mt-1">
          Manage your juniors' profiles and monitor their progress
        </p>
      </div>
    </div>
  );
};
