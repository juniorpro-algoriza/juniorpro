import { PathCard } from "@components/client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@atoms";

export const MyCurrentPath = ({
  paths,
}: {
  paths: {
    id: number;
    image: string;
    title: string;
    description: string;
    progress?: number;
    missions: number;
    xp: number;
    points: number;
  }[];
}) => {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Prevent multiple triggers
    if (hasTriggered.current) return;

    if (
      paths?.length === 1 &&
      !user.isGuided &&
      sessionStorage.getItem("hasOpenedCurrentPathStep") !== "true"
    ) {
      hasTriggered.current = true;
      sessionStorage.setItem("hasOpenedCurrentPathStep", "true");

      // Try using setTimeout to ensure state updates are processed
      setTimeout(() => {
        router.push("?tour=true&step=15");
      }, 0);
    }
  }, [paths.length, user.isGuided, router]);

  return (
    <div id="my-current-path" className="space-y-5">
      <h2 className=" uppercase text-gray-600 font-bold">My Current Path</h2>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-5">
        {paths.map((path) => (
          <PathCard
            key={path.id}
            path={path}
            userType="junior"
            cardClassName="border-dark-blue-main/30"
            cardLink={`/junior/paths/${path.id}/current`}
          />
        ))}
        {paths.length === 0 && (
          <p className="ms-4 text-gray-600">No current paths found.</p>
        )}
      </div>
    </div>
  );
};
