"use server";

import type { Stats } from "../types";
import { cookies } from "next/headers";

export const getContributorStats = async (): Promise<Stats[]> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new Error("No auth token found. User may not be logged in.");
    }

    const res = await fetch(
      "https://juniorpro-001-site1.ntempurl.com/api/admin-dashboard/contributors-stats",
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
      { label: "Active Contributors", value: data.activeContributors },
      { label: "Today's Sessions", value: data.todaysSessions },
      { label: "Waiting List", value: data.waitingList },
      { label: "Wallet", value: data.wallet },
    ];

    return stats;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);

    // fallback to empty data (avoids crashing UI)
    return [
      { label: "Juniors", value: 0 },
      { label: "Pending Reviews", value: 0 },
      { label: "Today's Sessions", value: 0 },
      { label: "Waiting List", value: 0 },
    ];
  }
};
