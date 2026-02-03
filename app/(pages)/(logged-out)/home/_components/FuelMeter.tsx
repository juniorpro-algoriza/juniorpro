"use client";
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Rocket } from "lucide-react";

export function FuelMeter() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const fuelHeight = useTransform(smoothProgress, [0, 1], ["0%", "93%"]);
  const fuelPercentage = useTransform(smoothProgress, [0, 1], [0, 100]);
  const bubblesOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]); // Show bubbles after 10%

  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = fuelPercentage.on("change", (latest) => {
      if (textRef.current) {
        textRef.current.innerText = Math.round(latest) + "%";
      }
    });
    return unsubscribe;
  }, [fuelPercentage]);

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Fuel Tank - Vertical */}
      <div className="relative">
        <div className="w-16 h-64 bg-white/90 backdrop-blur-sm rounded-full border-2 border-black shadow-thick-4 p-2 overflow-hidden">
          {/* Fuel Fill */}
          <motion.div
            className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-[#C6FF3E] via-[#A7FADC] to-[#5CA9FF] rounded-full"
            style={{
              height: fuelHeight,
            }}
          >
            {/* Bubbles Animation */}
            <motion.div style={{ opacity: bubblesOpacity }}>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/40 rounded-full"
                  style={{
                    left: `${30 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -50],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Measurement Lines */}
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 right-0 h-[2px] bg-black/20"
              style={{
                bottom: `${mark}%`,
              }}
            />
          ))}
        </div>

        {/* Rocket Icon on Top */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-2 border-black shadow-thick-3 flex items-center justify-center"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Rocket className="w-6 h-6 text-pink-main" />
        </motion.div>
      </div>

      {/* Fuel Percentage */}
      <div className="px-3 py-2 bg-white rounded-full border-2 border-black shadow-thick-3 text-xs w-[60px] flex justify-center">
        <span ref={textRef} className="text-[#0C1335]">
          0%
        </span>
      </div>

      {/* Label */}
      <div className="text-xs text-white/80 tracking-wider uppercase -rotate-90 origin-center mt-16">
        Journey Progress
      </div>
    </motion.div>
  );
}
