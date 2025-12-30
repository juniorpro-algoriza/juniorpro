"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const WelcomePopupTrigger = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if welcome popup has already been shown in this session
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcomePopup");

    if (!hasSeenWelcome && !searchParams.get("modal")) {
      // Show the welcome popup
      router.push("?modal=WelcomePopup");
      // Mark that the user has seen the popup this session
      sessionStorage.setItem("hasSeenWelcomePopup", "true");
    }
  }, [router, searchParams]);

  return null;
};
