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
      <Modal panelClassName="w-full max-w-xl p-8 text-center bg-white rounded-2xl shadow-xl place-items-center sm:space-y-6 relative">
        <div className="relative">
          <Image
            src={RocketManImage}
            alt="Astronaut on Rocket"
            className="sm:w-[220px] w-[170px] relative z-10 mb-6 
          drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
            width={300}
            height={300}
          />
          <div
            className="sm:size-[140px] size-[200px] 
              rounded-full 
              bg-gradient-to-br from-[#EEF2FF] to-[#F0F9FF]
              absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 
              shadow-[0_15px_40px_rgba(99,102,241,0.15)] 
              ring-1 ring-indigo-100"
          ></div>
        </div>
        <h2
          className="font-extrabold sm:text-4xl text-2xl 
tracking-tight text-slate-900 
mb-2"
        >
          Welcome to SAWIHA!
        </h2>
        <p
          className="text-slate-600 sm:text-lg text-base 
max-w-md mx-auto 
leading-relaxed 
font-medium"
        >
          Your coding adventure starts now. Complete missions, earn XP, and
          unlock new challenges as you level up step by step.
        </p>
        <Button
          intent="main2"
          size="mainDefault"
          className="lg:w-4/5 w-full"
          onClick={handleStartTour}
        >
          Let’s Go
          <ArrowRight className="size-5" />
        </Button>
      </Modal>
    </>
  );
};
