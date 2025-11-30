"use client";

import { MainCard, Modal } from "@components";
import Image from "next/image";
import CelebrateImage from "@public/images/celebrate.png";
import FireImage from "@public/images/fire-icon2.png";
import Diamond2Image from "@public/images/diamond-icon-2.png";
import LightningImage from "@public/images/lightning-icon.png";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

export const MissionCompleted = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
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
      scalar: 1.8, // Make them big
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
  }, []);

  return (
    <Modal panelClassName="w-full max-w-xl p-8 py-20 bg-white rounded-2xl shadow-xl place-items-center space-y-6 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-50"
      />
      <Image
        src={CelebrateImage}
        alt="Celebrate Icon"
        className="w-[150px] relative z-10"
        width={150}
        height={150}
      />
      <h2 className="font-bold text-3xl text-center relative z-10">
        Woho! You Completed the Mission!
      </h2>
      <p className="text-gray-600 text-2xl relative z-10">HTML Basics</p>
      <div className="grid grid-cols-3 w-full gap-5 relative z-10">
        <MainCard classname="space-y-2 place-items-center">
          <Image
            src={LightningImage}
            alt="Lightning Icon"
            className="w-[38px]"
            width={38}
            height={38}
          />

          <p className="font-semibold text-3xl">+40</p>
          <p className="text-gray-600 text-13">XP Earned</p>
        </MainCard>
        <MainCard classname="space-y-2 place-items-center">
          <Image
            src={Diamond2Image}
            alt="Diamond2 Icon"
            className="w-[38px]"
            width={38}
            height={38}
          />
          <p className="font-semibold text-3xl">+1</p>
          <p className="text-gray-600 text-13">Points Earned</p>
        </MainCard>
        <MainCard classname="space-y-2 place-items-center">
          <Image
            src={FireImage}
            alt="Fire Icon"
            className="w-[38px]"
            width={38}
            height={38}
          />
          <p className="font-semibold text-3xl">7 Days</p>
          <p className="text-gray-600 text-13">Streak</p>
        </MainCard>
      </div>
    </Modal>
  );
};
