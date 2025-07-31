import { Button } from "@components";
import { Bell } from "lucide-react";

export const JuniorsHeader = () => {
  return (
    <div className="pb-8">
      <div>
        <div className="flex items-center justify-between w-full pb-6 border-b border-border-secondary">
          <div className="flex items-end text-xs gap-2">
            <h1 className="pl-12 text-[28px] font-medium text-yankees-blue mt-2">
              Junior
            </h1>
            <p className="pb-2 ">
              Dashboard / <span className="text-content-secondary">Junior</span>
            </p>
          </div>
          <Button
            intent="unset"
            size="medium"
            className="bg-white shadow rounded-[40px] p-3"
          >
            <Bell size={20} className="text-cadetGray" />
          </Button>
        </div>
      </div>
    </div>
  );
};
