/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserProfile } from "../../../profile/UserProfile";
import { useState, useEffect } from "react";

export const Profile = ({ params }: { params: { id: string } }) => {
  const [manager, setManager] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/getUserDetails?id=${params.id}&type=project-manager`)
      .then((res) => res.json())
      .then(setManager);
  }, [params.id]);

  if (!manager) return <div>Loading...</div>;
  // Mock manager data

  return <UserProfile userType="project-manager" user={manager} />;
};
