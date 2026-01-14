"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import { OnboardingTour } from "../../../../../components/OnboardingTour";

export const OnboardingTourTrigger = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const showTour = searchParams.get("tour") === "true";
  const stepParam = searchParams.get("step");
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  // Redirect to dashboard if tour is on paths page with step < 13
  // Redirect to paths page if tour is on dashboard with step 13 or 14
  useEffect(() => {
    if (showTour && stepParam && !isRedirecting) {
      const stepNum = parseInt(stepParam, 10);

      // From paths to dashboard for steps 1-12
      if (pathname !== "/junior/dashboard" && stepNum > 0 && stepNum < 13) {
        setIsRedirecting(true);
        window.location.href = `/junior/dashboard?tour=true&step=${stepNum}`;
      }
      // From dashboard to paths for steps 13-14
      else if (
        pathname !== "/junior/paths" &&
        (stepNum === 13 || stepNum === 14 || stepNum === 15)
      ) {
        setIsRedirecting(true);
        window.location.href = `/junior/paths?tour=true&step=${stepNum}`;
      }
    }
  }, [showTour, stepParam, pathname, router, isRedirecting]);

  const handleTourClose = () => {
    // Remove tour and step query params
    router.push(pathname);
  };

  return (
    <OnboardingTour
      isOpen={showTour}
      onClose={handleTourClose}
      initialStep={stepParam ? parseInt(stepParam, 10) : 0}
    />
  );
};
