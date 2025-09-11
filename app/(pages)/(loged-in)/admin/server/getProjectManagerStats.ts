"use server";

import type { Stats } from "../types";
import { cookies } from "next/headers";

export const getProjectManagerStats = async (): Promise<Stats[]> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new Error("No auth token found. User may not be logged in.");
    }

    const res = await fetch(
      "https://juniorpro-001-site1.ntempurl.com/api/admin-dashboard/project-managers-stats",
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
      { label: "Active Project Managers", value: data.activeProjectManager },
      { label: "Today's Sessions", value: data.todaysSessions },
      { label: "Waiting List", value: data.waitingList },
      { label: "Wallet", value: data.wallet },
    ];

    return stats;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);

    // fallback to empty data (avoids crashing UI)
    return [
      { label: "Active Project Managers", value: 0 },
      { label: "Today's Sessions", value: 0 },
      { label: "Waiting List", value: 0 },
      { label: "Wallet", value: 0 },
    ];
  }
};
