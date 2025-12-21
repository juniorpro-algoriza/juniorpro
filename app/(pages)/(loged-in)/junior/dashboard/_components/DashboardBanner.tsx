import { Button, MainCard } from "@components";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import JuniorsDashboardImage from "@public/images/JuniorsDashboardImage.png";
export const DashboardBanner = () => {
  return (
    <MainCard classname="relative space-y-3">
      <Image src={JuniorsDashboardImage} alt="Juniors Dashboard Image" className="w-[200px] sm:w-[300px] sm:absolute sm:right-0 sm:-bottom-3 mx-auto"  />
      <div className="space-y-3 sm:w-3/5">
        <h2 className="lg:text-2xl text-xl font-semibold">
          Finish Mission, Unlock Challenges, Start Earning
        </h2>
        <p className="lg:text-lg text-base text-gray-600 font-medium">
          Complete your missions to level up! When you finish them, you unlock
          fun challenges, team collaborations, and even real projects where you
          can earn real money for your skills.
        </p>
        <Button intent="main" size="mainDefault">
          Show Missions <ArrowRight className="size-5" />
        </Button>
      </div>
    </MainCard>
  );
};
