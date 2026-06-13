"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@atoms";

export const WelcomePopupTrigger = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user] = useAtom(userAtom);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Wait for the user profile to load
    if (!user?.id) return;

    // Prevent multiple triggers
    if (hasTriggered.current) return;

    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcomePopup");

    if (!hasSeenWelcome && !searchParams.get("modal") && !user.isGuided) {
      hasTriggered.current = true;
      sessionStorage.setItem("hasSeenWelcomePopup", "true");

      // Try using setTimeout to ensure the state updates are processed
      setTimeout(() => {
        router.push("?modal=WelcomePopup");
      }, 0);
    }
  }, [router, searchParams, user.isGuided, user?.id]);

  return null;
};
