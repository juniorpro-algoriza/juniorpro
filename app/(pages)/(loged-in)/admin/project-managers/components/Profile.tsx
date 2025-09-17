import { UserIcon, UserManagerIcon, UsersIcon } from "@icons";
import { Button } from "@components";

type ManagerProfile = {
  id: number;
  name: string;
  email: string;
  juniorsCount: number;
};

type Props = {
  manager: ManagerProfile;
};

export default function ProjectManagerProfile({ manager }: Props) {
  return (
    <div className="border border-[#F1F3F9] rounded-lg p-4 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#EEF2FF] text-[#5879DC]">
            <UserManagerIcon />
          </div>

          <div>
            <h2 className="text-base font-semibold capitalize">
              {manager.name}
            </h2>
            <p className="text-gray-500 text-sm">{manager.email}</p>
          </div>
        </div>

        <Button intent="primary" className="text-sm" size="large">
          Edit Profile
        </Button>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between items-center mt-4 ">
        {/* ID + Juniors */}
        <div className="flex items-center space-x-2 border border-[#DBE4FF] rounded-md p-2 text-md">
          <div className="flex items-center text-sm px-2 py-1 border-r-2 border-gray-50">
            <UserIcon />
            <span className="px-2"> ID: #{manager.id}</span>
          </div>
          <div className="flex items-center text-sm px-2 py-1">
            <UsersIcon />
            <span className="px-2"> Juniors: {manager.juniorsCount}</span>
          </div>
        </div>

        {/* Practice + Team Projects */}
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center text-sm">
            <span className="text-orange-500 font-medium">5</span>
            <span className="text-gray-500">Practice Zone</span>
          </div>
          <div className="flex flex-col items-center text-sm">
            <span className="text-blue-500 font-medium">5</span>
            <span className="text-gray-500">Team Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
