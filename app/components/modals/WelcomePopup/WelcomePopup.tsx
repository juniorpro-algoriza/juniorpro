"use client";

import { Button, Modal } from "@components";
import Image from "next/image";
import RocketManImage from "@public/images/rocket-man.png";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";

export const WelcomePopup = () => {
  const router = useRouter();

  const handleStartTour = () => {
    // Close modal by removing modal query param and add tour param
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?tour=true`);
  };

  return (
    <>
      <Modal panelClassName="w-full max-w-2xl p-8 text-center bg-white rounded-2xl shadow-xl place-items-center sm:space-y-6 relative">
        <div className="relative">
          <Image
            src={RocketManImage}
            alt="Astronaut on Rocket"
            className="sm:w-[200px] w-[150px] relative z-10 mb-4"
            width={200}
            height={200}
          />
          <div className="sm:size-[120px] size-[80px] rounded-full bg-[#F0F9FF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <h2 className="font-extrabold sm:text-3xl text-xl relative z-10">
          Welcome to SAWIHA!
        </h2>
        <p className="text-gray-600 sm:text-lg text-base relative z-10 max-w-md mx-auto font-medium">
          Get ready to blast off into your learning journey! Explore amazing
          worlds, complete missions, and become a superstar learner!
        </p>
        <Button
          intent="main2"
          size="mainDefault"
          className="lg:w-4/5 w-full"
          onClick={handleStartTour}
        >
          Start Tour <ArrowRight className="size-5" />
        </Button>
      </Modal>
    </>
  );
};
