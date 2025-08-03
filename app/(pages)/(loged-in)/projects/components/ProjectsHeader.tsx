import { Notifications } from "../../components";

export const ProjectsHeader = () => {
  return (
    <div className="pb-8">
      <div>
        <div className="flex items-center justify-between w-full pb-6 border-b border-border-secondary">
          <div className="flex items-end text-xs gap-2">
            <h1 className="pl-12 text-[28px] font-medium text-yankees-blue mt-2">
              Projects
            </h1>
            <p className="pb-2 ">
              Projects / <span className="text-content-secondary">Junior</span>
            </p>
          </div>
          <Notifications />
        </div>
      </div>
    </div>
  );
};
