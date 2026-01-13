"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  useJuniorsLearningPathCurrent,
  useJuniorsLearningPathCurrentMission,
} from "../(pages)/(loged-in)/junior/tanstack/paths/useJuniorsPaths";
import { MISSION_STATUS } from "../configs/constants";
import { useConfirmGuidance } from "../tanstack";
import { useAtom } from "jotai";
import { userAtom } from "@atoms";

// Dynamically import Tour to prevent SSR issues
const Tour = dynamic(() => import("reactour"), {
  ssr: false,
});

// NOTE: The reactour library (v1.19.4) uses deprecated React lifecycle methods internally
// which causes warnings in strict mode. This is a library issue, not our code.
// The warning can be safely ignored as the library still functions correctly.

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
}
export const OnboardingTour = ({
  isOpen,
  onClose,
  initialStep = 0,
}: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [tourOpen, setTourOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: currentPathData } = useJuniorsLearningPathCurrent();
  const { data: currentMission } = useJuniorsLearningPathCurrentMission({
    Id: currentPathData?.data?.[0]?.id,
  });
  const [user] = useAtom(userAtom);
  const { mutate: confirmGuidanceMutate } = useConfirmGuidance();

  // Check if user is on dashboard page
  const isOnDashboardPage =
    typeof window !== "undefined" &&
    typeof window.location !== "undefined" &&
    window.location.pathname === "/junior/dashboard";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (currentStep === 15 && !user?.isGuided) {
      confirmGuidanceMutate();
    }
  }, [currentStep, confirmGuidanceMutate, user]);

  useEffect(() => {
    // Update current step when initialStep changes
    if (initialStep !== undefined) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  useEffect(() => {
    if (isMounted) {
      setTourOpen(isOpen);
      if (!isOpen) {
        setCurrentStep(0);
        // Remove step parameter when tour closes
        if (
          typeof window !== "undefined" &&
          typeof window.location !== "undefined"
        ) {
          const url = new URL(window.location.href);
          url.searchParams.delete("step");
          window.history.replaceState({}, "", url.toString());
        }
      }
    }
  }, [isOpen, isMounted]);

  // Get the first path ID from hook data for use in multiple steps
  const getFirstPathId = useCallback(() => {
    return currentPathData?.data?.[0]?.id;
  }, [currentPathData]);
  const getCurrentMissionId = useCallback(() => {
    return currentMission?.data?.find(
      (mission) =>
        MISSION_STATUS[mission.status as keyof typeof MISSION_STATUS] ===
        "InProgress"
    )?.id;
  }, [currentMission]);
  const getCompletedMissionId = useCallback(() => {
    return currentMission?.data?.find(
      (mission) =>
        MISSION_STATUS[mission.status as keyof typeof MISSION_STATUS] ===
        "Completed"
    )?.id;
  }, [currentMission]);

  // Function to update step query parameter
  const updateStepParam = useCallback((step: number) => {
    if (
      typeof window !== "undefined" &&
      typeof window.location !== "undefined"
    ) {
      const url = new URL(window.location.href);
      url.searchParams.set("step", step.toString());
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // Wrapper function for goTo that updates step parameter
  const goToWithStepUpdate = useCallback(
    (step: number) => {
      updateStepParam(step);
      setCurrentStep(step);
    },
    [updateStepParam]
  );

  interface TourStep {
    selector: string;
    style?: React.CSSProperties;
    content: () => React.ReactNode;
  }

  const steps: TourStep[] = [
    // Step 0 (welcome) — removed isOnDashboardPage, always "Start Tour"
    {
      selector: "",
      style: {
        borderRadius: "20px",
      },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Welcome to Your Tour!</h3>
          <p className="text-gray-800 font-bold">
            {isOnDashboardPage
              ? "Let’s look around! I’ll show you the most important parts in 1 minute."
              : "This tour works best on your dashboard page. Let's navigate there to get started!"}
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            {isOnDashboardPage ? (
              <Button
                intent="main2"
                size="mainDefault"
                onClick={() => goToWithStepUpdate(1)}
                className="px-6 w-full"
              >
                Start Tour <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Link
                href="/junior/dashboard?tour=true&step=0"
                className="w-full"
              >
                <Button
                  intent="main2"
                  size="mainDefault"
                  className="px-6 w-full"
                >
                  Go to Dashboard <ArrowRight className="size-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      ),
    },

    // Step 1
    {
      selector: "#level-progress-section",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Your Level Bar 📊</h3>
          <p className="text-gray-800 font-bold">
            Finish missions to fill this bar. When it’s full, you level up!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(0)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(2)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 2
    {
      selector: "#xp-text",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">XP = Rocket Fuel 🚀</h3>
          <p className="text-gray-800 font-bold">
            XP is what you earn after missions. More XP helps you level up
            faster!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(1)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(3)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 3
    {
      selector: "#day-streak",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Streak 🔥</h3>
          <p className="text-gray-800 font-bold">
            This is how many days in a row you learned. Come back tomorrow to
            keep it going!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(2)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(4)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 4
    {
      selector: "#points",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Points ⭐</h3>
          <p className="text-gray-800 font-bold">
            You get points for learning and finishing goals. Save them for
            rewards!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(3)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(5)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 5
    {
      selector: "#badges",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Badges 🏅</h3>
          <p className="text-gray-800 font-bold">
            Badges are trophies you collect when you do something awesome. Try
            to earn them all!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(4)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(6)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 6
    {
      selector: "#total-xp",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Your Total XP 📈</h3>
          <p className="text-gray-800 font-bold">
            This is all the XP you’ve earned so far. Keep going and watch it
            grow!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(5)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(7)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 7
    {
      selector: "#missions-completed",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Missions Done ✅</h3>
          <p className="text-gray-800 font-bold">
            Every time you finish a mission, this number goes up. Nice work!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(6)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(8)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 8
    {
      selector: "#projects-completed",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Projects Done 🧩</h3>
          <p className="text-gray-800 font-bold">
            Projects are bigger builds. They show what you can really do!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(7)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(9)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 9
    {
      selector: "#challenges-won",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Challenges Done ⚔️</h3>
          <p className="text-gray-800 font-bold">
            Challenges are harder than missions, but they give bigger rewards
            when you win!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(8)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(10)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 10
    {
      selector: "#daily-goals",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Today’s Goal 🎯</h3>
          <p className="text-gray-800 font-bold">
            Finish this goal to earn a bonus. Small goal → big progress!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(9)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(11)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 11
    {
      selector: "#live-sessions",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Live Sessions 🗓️</h3>
          <p className="text-gray-800 font-bold">
            Your mentor sessions are here. Tap one to see the time and join.
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(10)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(12)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 12
    {
      selector: "",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Learning Paths 🧭</h3>
          <p className="text-gray-800 font-bold">
            This is where you choose what to learn next. Pick a path and start
            your missions!
          </p>
          <div className="flex justify-between flex-wrap items-center gap-2 pt-2">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(11)}
              className="px-6"
            >
              Back
            </Button>
            <Link href="/junior/paths?tour=true&step=13">
              <Button intent="main2" size="mainDefault" className="px-6">
                Go to Paths <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      ),
    },

    // Step 13 (updated to cover: current path + join any path)
    {
      selector: "#my-paths",
      style: { borderRadius: "20px" },
      content: () => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Your Learning Paths 🧠</h3>
          <p className="text-gray-800 font-bold">
            Here you can see your current path , and also choose any other path
            you like. Tap a path to explore it, then join to start!
          </p>
          <div className="flex justify-between flex-wrap items-center gap-2 pt-2 ">
            <Link href="/junior/dashboard?tour=true&step=12">
              <Button intent="main" size="mainDefault" className="px-6 ">
                Back
              </Button>
            </Link>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goToWithStepUpdate(14)}
              className="px-6 "
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },

    // Step 14 (same selector/logic, but NO “recommended” wording)
    {
      selector: "#recommended-paths",
      style: { borderRadius: "20px" },
      content: () => {
        const firstPathId = getFirstPathId();

        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">Choose a Path 🧩</h3>
            <p className="text-gray-800 font-bold">
              These are paths you can join. Tap any path to see what’s inside,
              then hit “Join Path” to start.
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2">
              <Button
                intent="main"
                size="mainDefault"
                onClick={() => goToWithStepUpdate(13)}
                className="px-6"
              >
                Back
              </Button>
              <Button
                intent="main2"
                size="mainDefault"
                onClick={() => {
                  if (firstPathId) {
                    goToWithStepUpdate(15);
                  } else {
                    onClose();
                  }
                }}
                className="px-6"
              >
                {firstPathId ? "Next" : "Got it!"}{" "}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        );
      },
    },

    // Step 15
    {
      selector: ".my-current-path",
      style: { borderRadius: "20px" },
      content: () => {
        const firstPathId = getFirstPathId();

        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">Path Details 📍</h3>
            <p className="text-gray-800 font-bold">
              Here you can see your missions, what’s done, and what’s next. One
              step at a time!
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2 ">
              <Button
                intent="main"
                size="mainDefault"
                onClick={() => goToWithStepUpdate(14)}
                className="px-6 "
              >
                Back
              </Button>
              <Link
                href={`/junior/paths/${firstPathId}/current?tour=true&step=16`}
              >
                <Button intent="main2" size="mainDefault" className="px-6 ">
                  Path details <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        );
      },
    },

    // Step 16
    getCurrentMissionId()
      ? {
          selector: "#continue-mission",
          style: { borderRadius: "20px" },
          content: () => {
            const firstPathId = getFirstPathId();
            const currentMissionId = getCurrentMissionId();

            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">
                  Continue Your Mission ▶️
                </h3>
                <p className="text-gray-800 font-bold">
                  Jump back in right where you stopped. One step at a time!
                </p>
                <div className="flex justify-between flex-wrap items-center gap-2 pt-2 ">
                  <Link href={`/junior/paths?tour=true&step=15`} className="">
                    <Button intent="main" size="mainDefault" className="px-6 ">
                      Back
                    </Button>
                  </Link>
                  <Link
                    href={`/junior/paths/${firstPathId}/current/${currentMissionId}?tour=true&step=17&tab=1`}
                    className=""
                  >
                    <Button
                      intent="main2"
                      size="mainDefault"
                      onClick={onClose}
                      className="px-6 "
                    >
                      Mission details <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          },
        }
      : {
          selector: "#review-mission",
          style: { borderRadius: "20px" },
          content: () => {
            const firstPathId = getFirstPathId();
            const completedMissionId = getCompletedMissionId();

            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">
                  Review Your Mission 👀
                </h3>
                <p className="text-gray-800 font-bold">
                  Want to see what you did? You can open your finished mission
                  here.
                </p>
                <div className="flex justify-between flex-wrap items-center gap-2 pt-2 ">
                  <Link href={`/junior/paths?tour=true&step=15`} className="">
                    <Button intent="main" size="mainDefault" className="px-6 ">
                      Back
                    </Button>
                  </Link>
                  <Link
                    href={`/junior/paths/${firstPathId}/current/${completedMissionId}?tour=true&step=17&tab=1`}
                    className=""
                  >
                    <Button
                      intent="main2"
                      size="mainDefault"
                      onClick={onClose}
                      className="px-6 "
                    >
                      Go to mission details page{" "}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          },
        },

    // Step 17
    {
      selector: "#path-details-tabs",
      style: { borderRadius: "20px" },
      content: () => {
        const firstPathId = getFirstPathId();
        const currentMissionId = getCurrentMissionId();
        const completedMissionId = getCompletedMissionId();

        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">Mission Steps 🪜</h3>
            <p className="text-gray-800 font-bold">
              Follow these steps to finish the mission. Do them one by one.
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2 ">
              <Link
                href={`/junior/paths/${firstPathId}/current?tour=true&step=16`}
                className=""
              >
                <Button intent="main" size="mainDefault" className="px-6 ">
                  Back
                </Button>
              </Link>
              <Link
                href={`/junior/paths/${firstPathId}/current/${currentMissionId ?? completedMissionId}?tour=true&step=18&tab=2`}
                className=""
              >
                <Button intent="main2" size="mainDefault" className="px-6 ">
                  Next <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        );
      },
    },

    // Step 18
    {
      selector: "#path-details-tabs",
      style: { borderRadius: "20px" },
      content: () => {
        const firstPathId = getFirstPathId();
        const currentMissionId = getCurrentMissionId();
        const completedMissionId = getCompletedMissionId();

        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">Help & Resources 📚</h3>
            <p className="text-gray-800 font-bold">
              Need help? Find videos and tips here to understand the mission
              faster.
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2 ">
              <Link
                href={`/junior/paths/${firstPathId}/current/${currentMissionId ?? completedMissionId}?tour=true&step=17&tab=1`}
                className=""
              >
                <Button intent="main" size="mainDefault" className="px-6 ">
                  Back
                </Button>
              </Link>
              <Link
                href={`/junior/paths/${firstPathId}/current/${currentMissionId ?? completedMissionId}?tour=true&step=19&tab=3`}
                className=""
              >
                <Button intent="main2" size="mainDefault" className="px-6 ">
                  Next <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        );
      },
    },

    // Step 19
    getCurrentMissionId()
      ? {
          selector: "#path-details-tabs",
          style: { borderRadius: "20px" },
          content: () => {
            const firstPathId = getFirstPathId();
            const currentMissionId = getCurrentMissionId();

            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">Send Your Work 📤</h3>
                <p className="text-gray-800 font-bold">
                  Paste your link and submit. Then you’ll earn your rewards!
                </p>
                <div className="flex justify-between flex-wrap items-center gap-2 pt-2 ">
                  <Link
                    href={`/junior/paths/${firstPathId}/current/${currentMissionId}?tour=true&step=18&tab=2`}
                    className=""
                  >
                    <Button intent="main" size="mainDefault" className="px-6 ">
                      Back
                    </Button>
                  </Link>
                  <Button
                    intent="main2"
                    size="mainDefault"
                    onClick={onClose}
                    className="px-6 "
                  >
                    Finish Tour! <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            );
          },
        }
      : {
          selector: "#path-details-tabs",
          style: { borderRadius: "20px" },
          content: () => {
            const firstPathId = getFirstPathId();
            const completedMissionId = getCompletedMissionId();

            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">Your Submission 📄</h3>
                <p className="text-gray-800 font-bold">
                  This is what you submitted. You can check it anytime. ✅
                </p>
                <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
                  <Link
                    href={`/junior/paths/${firstPathId}/current/${completedMissionId}?tour=true&step=18&tab=2`}
                    className="w-full"
                  >
                    <Button
                      intent="main"
                      size="mainDefault"
                      className="px-6 w-full"
                    >
                      Back
                    </Button>
                  </Link>
                  <Button
                    intent="main2"
                    size="mainDefault"
                    onClick={onClose}
                    className="px-6 w-full"
                  >
                    Finish Tour! 🎉 <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            );
          },
        },
  ];

  const handleTourClose = useCallback(() => {
    setTourOpen(false);
    setCurrentStep(0);
    onClose();
  }, [onClose]);

  return (
    <>
      {isMounted && typeof window !== "undefined" && (
        <Tour
          key={currentStep} // Force remount when step changes
          steps={steps}
          isOpen={tourOpen}
          onRequestClose={handleTourClose}
          getCurrentStep={setCurrentStep}
          startAt={currentStep}
          showNavigation={false}
          showButtons={false}
          showNumber={false}
          className="reactour-custom"
          maskClassName="reactour-mask-custom text-black/50 "
          highlightedMaskClassName="reactour-highlighted-custom"
        />
      )}
    </>
  );
};
