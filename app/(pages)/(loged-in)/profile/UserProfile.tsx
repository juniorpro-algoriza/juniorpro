/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, ModalLink } from "@components";
import { userConfigs, type UserType } from "../../../config/userConfig";

export const UserProfile = ({
  userType,
  user,
}: {
  userType: UserType;
  user: any;
}) => {
  const config = userConfigs[userType];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <ModalLink name={config.modals.edit} query={{ id: user.id }}>
          <Button intent="primary">Edit Profile</Button>
        </ModalLink>
      </div>

      {/* Example stats */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium">{user.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Joined</p>
          <p className="font-medium">{user.joinedOn}</p>
        </div>
      </div>
    </div>
  );
};
