"use client";

import { Button, MainCard, Modal } from "@components";
import Image from "next/image";
import CelebrateImage from "@public/images/celebrate.png";
import Diamond2Image from "@public/images/diamond-icon-2.png";
import LightningImage from "@public/images/lightning-icon.png";
import confetti from "canvas-confetti";
import { Fragment, useEffect, useRef, useState } from "react";
import { CloseButton } from "@headlessui/react";
import { useSearchParams } from "next/navigation";

export const MissionCompleted = () => {
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const missionName = searchParams.get("mission") || "Mission";
  const points = searchParams.get("points") || "0";
  const xp = searchParams.get("xp") || "0";
  const [isModalReady, setIsModalReady] = useState(false);

  useEffect(() => {
    // Wait for modal to be fully rendered and ready
    const readyTimer = setTimeout(() => {
      setIsModalReady(true);
    }, 100); // Give modal time to complete entrance animation

    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!isModalReady || !canvasRef.current) return;

    const canvas = canvasRef.current;

    // Ensure canvas has proper dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 1000,
      ticks: 300,
      zIndex: 0,
      shapes: ["square"] as confetti.Shape[],
      scalar: 1.8,
      colors: ["#6903F9", "#FF15E5", "#9810FA"],
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30 * (timeLeft / duration);

      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => {
      clearInterval(interval);
      myConfetti.reset();
    };
  }, [isModalReady]);

  return (
    <Modal panelClassName="w-full max-w-xl p-8 text-center bg-white rounded-2xl shadow-xl place-items-center sm:space-y-6 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-50"
      />
      <div className="relative">
        <Image
          src={CelebrateImage}
          alt="Celebrate Icon"
          className="sm:w-[250px] w-[150px] relative z-10 mb-0"
          width={250}
          height={250}
        />
        <div className="sm:size-[150px] size-[100px] rounded-full bg-[#F5F6F8] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <h2 className="font-bold sm:text-3xl text-xl  relative z-10">
        You Completed the Mission!
      </h2>
      <p className="text-gray-600 sm:text-2xl text-lg relative z-10">
        {missionName}
      </p>
      <div className="flex justify-center w-full sm:gap-5 gap-3 relative z-10">
        <MainCard classname="space-y-2 place-items-center w-[150px] shadow-none border-[#F3F4F6] bg-[#F9FAFB]">
          <Image
            src={LightningImage}
            alt="Lightning Icon"
            className="sm:w-[60px] w-[40px]"
            width={60}
            height={60}
          />

          <p className="font-semibold text-3xl">+{xp}</p>
          <p className="text-gray-300 text-13 font-bold">XP Earned</p>
        </MainCard>
        <MainCard classname="space-y-2 place-items-center max-w-[150px] shadow-none border-[#F3F4F6] bg-[#F9FAFB]">
          <Image
            src={Diamond2Image}
            alt="Diamond2 Icon"
            className="sm:w-[60px] w-[40px]"
            width={60}
            height={60}
          />
          <p className="font-semibold text-3xl">+{points}</p>
          <p className="text-gray-300 text-13 font-bold">Points Earned</p>
        </MainCard>
      </div>
      <CloseButton as={Fragment}>
        <Button intent="main2" size="mainDefault" className="lg:w-4/5 w-full">
          Compare Solution
        </Button>
      </CloseButton>
    </Modal>
  );
};
