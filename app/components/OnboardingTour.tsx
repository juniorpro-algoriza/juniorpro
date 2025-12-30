"use client";

import { useState, useCallback, useEffect } from "react";
import Tour, { ReactourStep } from "reactour";
import { Button } from "@components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  useJuniorsLearningPathCurrent,
  useJuniorsLearningPathCurrentMission,
} from "../(pages)/(loged-in)/junior/tanstack/paths/useJuniorsPaths";
import { MISSION_STATUS } from "../configs/constants";

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

  // Check if user is on dashboard page
  const isOnDashboardPage =
    typeof window !== "undefined" &&
    window.location.pathname === "/junior/dashboard";

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        const url = new URL(window.location.href);
        url.searchParams.delete("step");
        window.history.replaceState({}, "", url.toString());
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

  const steps: ReactourStep[] = [
    {
      selector: "",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Welcome to Your Tour!</h3>
          <p className="text-gray-800 font-bold">
            {isOnDashboardPage
              ? "Let's explore your dashboard and discover all the amazing features waiting for you!"
              : "This tour works best on your dashboard page. Let's navigate there to get started!"}
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            {isOnDashboardPage ? (
              <Button
                intent="main2"
                size="mainDefault"
                onClick={() => goTo(1)}
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
    {
      selector: "#level-progress-section",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Your Level Journey</h3>
          <p className="text-gray-800 font-bold">
            This shows your Junior Level! As you complete missions, this bar
            fills up. Reach 100% to unlock the next level and get cool rewards!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(0)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(2)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#xp-text",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Experience Points (XP)</h3>
          <p className="text-gray-800 font-bold">
            This is your Total XP (Experience Points). It's the fuel for your
            level up! You gain XP by completing missions. More XP means you're
            becoming a master!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(1)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(3)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#day-streak",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Day Streak</h3>
          <p className="text-gray-800 font-bold">
            This shows how many days in a row you've been learning! Come back
            every single day to keep your streak on fire. Can you reach 30 days?
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(2)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(4)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#points",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Your Points</h3>
          <p className="text-gray-800 font-bold">
            These are your Points! You earn them for everything you do—finishing
            missions, quizzes, and daily goals. Save them up for the Points
            Shop!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(3)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(5)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#badges",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Badges</h3>
          <p className="text-gray-800 font-bold">
            This is your trophy case! You earn special badges for completing
            challenges and mastering skills. Collect them all!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(4)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(6)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#total-xp",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Total XP</h3>
          <p className="text-gray-800 font-bold">
            This is your Total Experience Points! You earn XP by completing
            missions and challenges. The more XP you have, the higher your
            level!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(5)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(7)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#missions-completed",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Missions Completed</h3>
          <p className="text-gray-800 font-bold">
            Count your victories! This number goes up every time you finish a
            mission. How high can you get it?
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(6)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(8)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#projects-completed",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Projects Completed</h3>
          <p className="text-gray-800 font-bold">
            Here you can see how many big projects you've built. Building
            projects is the best way to show off your skills!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(7)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(9)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#challenges-won",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Challenges</h3>
          <p className="text-gray-800 font-bold">
            Challenges are tougher than normal missions, but they give better
            rewards! Keep an eye on this counter.
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(8)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(10)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#daily-goals",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Daily Goal</h3>
          <p className="text-gray-800 font-bold">
            Every day brings a new goal! Finishing your daily goal gives you
            extra XP and helps you build a strong learning habit.
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(9)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(11)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#live-sessions",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Live Sessions</h3>
          <p className="text-gray-800 font-bold">
            Check here for your scheduled live sessions with mentors. Don't miss
            out on the fun learning parties!
          </p>
          <div className="flex justify-between items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(10)}
              className="px-6"
            >
              Back
            </Button>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(12)}
              className="px-6"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Learning Paths Library</h3>
          <p className="text-gray-800 font-bold">
            Welcome to the Learning Paths! This is where you choose your
            adventure. Whether it's coding, art, or science, it all starts here.
          </p>
          <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
            <Button
              intent="main"
              size="mainDefault"
              onClick={() => goTo(11)}
              className="px-6 w-full"
            >
              Back
            </Button>
            <Link href="/junior/paths?tour=true&step=13" className="w-full">
              <Button intent="main2" size="mainDefault" className="px-6 w-full">
                Open Learning Paths <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      ),
    },
    {
      selector: "#my-current-path",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold ">Your Current Path</h3>
          <p className="text-gray-800 font-bold">
            This is your current learning path! Track your progress, see
            completed missions, and continue your journey to mastering new
            skills. Keep going - you're doing great!
          </p>
          <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
            <Link href="/junior/dashboard?tour=true&step=12" className="w-full">
              <Button intent="main" size="mainDefault" className="px-6 w-full">
                Back
              </Button>
            </Link>
            <Button
              intent="main2"
              size="mainDefault"
              onClick={() => goTo(14)}
              className="px-6 w-full"
            >
              Next <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      selector: "#recommended-paths",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => {
        const firstPathId = getFirstPathId();

        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">
              Recommended Paths for You
            </h3>
            <p className="text-gray-800 font-bold">
              These paths are selected based on your interests and skill level.
              Each path helps you master new technologies and build projects!
              Click a path to see missions or "Join Path" to start learning.
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
              <Button
                intent="main"
                size="mainDefault"
                onClick={() => goTo(13)}
                className="px-6 w-full"
              >
                Back
              </Button>
              <Button
                intent="main2"
                size="mainDefault"
                onClick={() => {
                  if (firstPathId) {
                    goTo(15);
                  } else {
                    onClose();
                  }
                }}
                className="px-6 w-full"
              >
                {firstPathId ? "Next" : "Got it!"}{" "}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      selector: ".my-current-path",
      style: {
        borderRadius: "20px",
      },
      content: ({ goTo }: { goTo: (step: number) => void }) => {
        const firstPathId = getFirstPathId();

        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">
              Now you can explore your current path!
            </h3>
            <p className="text-gray-800 font-bold">
              This is your current learning path with detailed progress! You can
              see your missions, track completion, and continue where you left
              off. Keep up the great work!
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
              <Button
                intent="main"
                size="mainDefault"
                onClick={() => goTo(14)}
                className="px-6 w-full"
              >
                Back
              </Button>
              <Link
                href={`/junior/paths/${firstPathId}/current?tour=true&step=16`}
                className="w-full"
              >
                <Button
                  intent="main2"
                  size="mainDefault"
                  className="px-6 w-full"
                >
                  Go to path details page <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        );
      },
    },
    getCurrentMissionId()
      ? {
          selector: "#continue-mission",
          style: {
            borderRadius: "20px",
          },
          content: () => {
            const firstPathId = getFirstPathId();
            const currentMissionId = getCurrentMissionId();
            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">
                  Continue Your Mission!
                </h3>
                <p className="text-gray-800 font-bold">
                  Ready to keep learning? This button takes you right back to
                  where you left off in your current mission. Every step forward
                  is progress toward your goals!
                </p>
                <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
                  <Link
                    href={`/junior/paths?tour=true&step=15`}
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
                  <Link
                    href={`/junior/paths/${firstPathId}/current/${currentMissionId}?tour=true&step=17&tab=1`}
                    className="w-full"
                  >
                    <Button
                      intent="main2"
                      size="mainDefault"
                      onClick={onClose}
                      className="px-6 w-full"
                    >
                      Go to mission details page{" "}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          },
        }
      : {
          selector: "#review-mission",
          style: {
            borderRadius: "20px",
          },
          content: () => {
            const firstPathId = getFirstPathId();
            const completedMissionId = getCompletedMissionId();
            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">
                  Review Your Mission!
                </h3>
                <p className="text-gray-800 font-bold">
                  You've finished this mission! This button lets you look back
                  at your completed work and review the details of your success.
                  Every mission you complete brings you closer to being a
                  master!
                </p>
                <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
                  <Link
                    href={`/junior/paths?tour=true&step=15`}
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
                  <Link
                    href={`/junior/paths/${firstPathId}/current/${completedMissionId}?tour=true&step=17&tab=1`}
                    className="w-full"
                  >
                    <Button
                      intent="main2"
                      size="mainDefault"
                      onClick={onClose}
                      className="px-6 w-full"
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
    {
      selector: "#step-by-step-guide",
      style: {
        borderRadius: "20px",
      },
      content: () => {
        const firstPathId = getFirstPathId();
        const currentMissionId = getCurrentMissionId();
        const completedMissionId = getCompletedMissionId();
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">Step by Step Guide</h3>
            <p className="text-gray-800 font-bold">
              This is your Step by Step Guide! Here you'll find detailed
              instructions to help you complete your mission. Follow each step
              carefully to master the skills and successfully finish your
              assignment.
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
              <Link
                href={`/junior/paths/${firstPathId}/current?tour=true&step=16`}
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
              <Link
                href={`/junior/paths/${firstPathId}/current/${currentMissionId ?? completedMissionId}?tour=true&step=18&tab=2`}
                className="w-full"
              >
                <Button
                  intent="main2"
                  size="mainDefault"
                  className="px-6 w-full"
                >
                  Next <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      selector: "#learning-resources",
      style: {
        borderRadius: "20px",
      },
      content: () => {
        const firstPathId = getFirstPathId();
        const currentMissionId = getCurrentMissionId();
        const completedMissionId = getCompletedMissionId();
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold ">Learning Resources</h3>
            <p className="text-gray-800 font-bold">
              This is your Learning Resources section! Here you'll find
              additional materials, videos, and links to help you understand the
              concepts better. Use these resources to deepen your knowledge and
              succeed in your mission!
            </p>
            <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
              <Link
                href={`/junior/paths/${firstPathId}/current/${currentMissionId ?? completedMissionId}?tour=true&step=17&tab=1`}
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
              <Link
                href={`/junior/paths/${firstPathId}/current/${currentMissionId ?? completedMissionId}?tour=true&step=19&tab=3`}
                className="w-full"
              >
                <Button
                  intent="main2"
                  size="mainDefault"
                  className="px-6 w-full"
                >
                  Next <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        );
      },
    },
    getCurrentMissionId()
      ? {
          selector: "#submit-your-work",
          style: {
            borderRadius: "20px",
          },
          content: () => {
            const firstPathId = getFirstPathId();
            const currentMissionId = getCurrentMissionId();
            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">Submit Your Work</h3>
                <p className="text-gray-800 font-bold">
                  This is where you submit your completed mission! Share a link
                  to your code repository (GitHub, CodePen, etc.) and add any
                  notes about your solution. Once submitted, you'll earn XP and
                  points to level up!
                </p>
                <div className="flex justify-between flex-wrap items-center gap-2 pt-2 w-full">
                  <Link
                    href={`/junior/paths/${firstPathId}/current/${currentMissionId}?tour=true&step=18&tab=2`}
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
                    Finish Tour! <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            );
          },
        }
      : {
          selector: "#review-your-work",
          style: {
            borderRadius: "20px",
          },
          content: () => {
            const firstPathId = getFirstPathId();
            const completedMissionId = getCompletedMissionId();
            return (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold ">Review Your Work</h3>
                <p className="text-gray-800 font-bold">
                  You've already conquered this mission! Here you can review
                  your submission and the work you've shared. It's a great place
                  to see how far you've come before starting your next
                  challenge.
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
                    Finish Tour! <ArrowRight className="size-4" />
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
      {isMounted && (
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
