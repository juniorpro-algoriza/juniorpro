"use client";
import React from "react";
import { motion } from "motion/react";
import { Code, Gamepad2, BrainCircuit, ArrowRight } from "lucide-react";
import { Button } from "@components";

const paths = [
  {
    id: 1,
    title: "Web Development",
    description: "Build websites & apps",
    icon: Code,
    emoji: "🌐",
    gradient: "from-white to-[#C7E4FF]",
    progress: 75,
  },
  {
    id: 2,
    title: "Game Creation",
    description: "Design fun games",
    icon: Gamepad2,
    emoji: "🎮",
    gradient: "from-white to-[#C7B3FF]",
    progress: 40,
  },
  {
    id: 3,
    title: "AI Basics",
    description: "Understand smart tech",
    icon: BrainCircuit,
    emoji: "🤖",
    gradient: "from-white to-mint-green-main",
    progress: 20,
  },
];

export function LearningPathSection() {
  return (
    <section className="md:py-24 py-12 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
              },
            }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            viewport={{ once: true, margin: "-20px" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-black bg-mint-green-main text-black text-xs font-black uppercase tracking-wider mb-6 shadow-thick-4 will-change-transform"
          >
            <BrainCircuit className="size-4" strokeWidth={2.5} />
            Step 1: Choose a Path
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 100,
                damping: 12,
              },
            }}
            viewport={{ once: true, margin: "-20px" }}
            className="text-3xl md:text-5xl font-extrabold text-black mb-4 will-change-transform"
          >
            Follow Your Path
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 12,
              },
            }}
            viewport={{ once: true, margin: "-20px" }}
            className="text-blue-saturated md:text-xl text-lg font-medium max-w-2xl mx-auto will-change-transform"
          >
            Guided journeys designed for their age and skill level — small
            tasks, fun lessons, friendly explanations.
          </motion.p>
        </div>

        {/* Path Cards - Vertical Stack */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              className="bg-white rounded-4xl p-6 cursor-pointer relative overflow-hidden border-2 border-black shadow-thick-4 transition-all hover:shadow-thick-6 hover:-translate-y-1 will-change-transform"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-center justify-between">
                {/* Left Side - Icon & Text */}
                <div className="flex items-center gap-5">
                  {/* Icon - Static, Filled, Bordered */}
                  <div
                    className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center relative z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    style={{
                      backgroundColor:
                        path.id === 1
                          ? "#C7E4FF"
                          : path.id === 2
                            ? "#C7B3FF"
                            : "#A7FADC",
                    }}
                  >
                    <path.icon
                      className="size-6.5 text-black"
                      strokeWidth={2.5}
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-xl font-black text-black mb-1">
                      {path.title}
                    </h3>
                    <p className="text-sm font-medium text-black/70">
                      {path.description}
                    </p>
                  </div>
                </div>

                {/* Right Side - Arrow */}
                <motion.div
                  whileHover={{
                    x: 5,
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  className="w-10 h-10 bg-gray-50 rounded-full border-2 border-black flex items-center justify-center shadow-sm will-change-transform"
                >
                  <ArrowRight className="size-5 text-black" />
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="mt-5 w-full h-3 bg-gray-100 rounded-full border-2 border-black overflow-hidden relative">
                <div className="absolute inset-0 opacity-20" />
                <motion.div
                  className="h-full bg-mint-green-main border-r-2 border-black will-change-transform"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${path.progress}%`,
                    transition: {
                      duration: 1,
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  }}
                  viewport={{ once: true, margin: "-20px" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs font-bold text-black/60 uppercase tracking-wide">
                <span>{path.progress}% Complete</span>
                <span>{path.progress < 100 ? "In Progress" : "Completed"}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 12,
            },
          }}
          viewport={{ once: true, margin: "-20px" }}
          className="mt-12 text-center will-change-transform"
        >
          <Button intent="mainWhite" size="custom" className="font-bold">
            Explore All Paths →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
