import React from "react";
import {
  ChallengesSection,
  CollaborationSection,
  FinalLaunchSection,
  FuelMeter,
  HeroSection,
  LearningPathSection,
  MissionsSection,
} from "./_components";

const page = () => {
  return (
    <>
      <main className="relative z-10 flex flex-col">
        <FuelMeter />
        <HeroSection />
        <LearningPathSection />
        <MissionsSection />
        <ChallengesSection />
        <CollaborationSection />
        <FinalLaunchSection />
      </main>
    </>
  );
};

export default page;
