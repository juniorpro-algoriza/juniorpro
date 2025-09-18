"use client";

import { useSidebar } from "@atoms";
import { userAtom } from "@atoms";
import { Notifications } from "../../../components";
import { useAtom } from "jotai";

export const DashboardHeader = () => {
  const [{ firstName, lastName }] = useAtom(userAtom);
  const { isOpen } = useSidebar();
  return (
    <div className="pb-8">
      <div>
        <div className="flex items-center justify-between w-full pb-6 border-b border-border-secondary">
          <h1
            className={`${!isOpen && "pl-12"} text-[28px] font-medium text-yankees-blue mt-2`}
          >
            Dashboard
          </h1>
          <Notifications />
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <h2 className="text-3xl text-violet-normal font-medium">
            Welcome, {firstName} {lastName}!
          </h2>
        </div>
        <p className="text-storm-500 text-xl mt-1">
          Ready to continue your learning adventure?
        </p>
      </div>
    </div>
  );
};
