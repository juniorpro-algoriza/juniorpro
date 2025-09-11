"use server";

import type { Stats } from "../types";
import { cookies } from "next/headers";

export const getDashboardStats = async (): Promise<Stats[]> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new Error("No auth token found. User may not be logged in.");
    }

    const res = await fetch(
      "https://juniorpro-001-site1.ntempurl.com/api/admin-dashboard/all-users-stats",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch stats: ${res.status}`);
    }

    const data = await res.json();

    const stats: Stats[] = [
      { label: "Juniors", value: data.juniors },
      { label: "Contributors", value: data.contributors },
      { label: "Project Managers", value: data.projectManagers },
      { label: "Active Projects", value: data.activeProjects },
    ];

    return stats;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);

    // fallback to empty data (avoids crashing UI)
    return [
      { label: "Juniors", value: 0 },
      { label: "Contributors", value: 0 },
      { label: "Project Managers", value: 0 },
      { label: "Active Projects", value: 0 },
    ];
  }
};
