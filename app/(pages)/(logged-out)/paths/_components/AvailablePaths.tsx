"use client";
import React from "react";
import { motion } from "motion/react";
import {
  Code,
  Gamepad2,
  BrainCircuit,
  Clock,
  Trophy,
  Play,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function AvailablePaths() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* ==================== CONTENT ==================== */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-32">
        <motion.div
          key="list-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header Section (Matching Pricing Page) */}
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border-[3px] border-black shadow-thick-4 mb-8 transform hover:scale-105 hover:-rotate-2 transition-transform">
              <Rocket className="w-4.5 h-4.5 text-purple-main" />
              <span className="text-sm tracking-wide text-black font-black uppercase">
                Path Control
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-black max-w-5xl mx-auto leading-[1.15] tracking-tight font-extrabold drop-shadow-sm">
              Choose Your Path
            </h1>

            <p className="text-xl md:text-2xl text-[#1F3D8B] font-medium leading-relaxed max-w-3xl mb-12 mx-auto">
              Every great astronaut starts somewhere. Pick a path to begin your
              journey into code, creativity, and logic.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_PATHS.map((path, index) => {
              const bgPattern =
                index === 0
                  ? "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
                  : index === 1
                    ? "bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6),linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6)] [background-position:0_0,10px_10px] [background-size:20px_20px]"
                    : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent";

              return (
                <motion.div
                  key={path.id}
                  onClick={() => router.push(`/paths/${path.id}`)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-4xl border-[3px] border-black cursor-pointer shadow-thick-8 hover:shadow-thick-12 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                  {/* Header Pattern */}
                  <div
                    className={`h-20 w-full border-b-[3px] border-black relative ${bgPattern} opacity-60`}
                    style={{ backgroundColor: path.color + "40" }}
                  />

                  {/* Floating Icon */}
                  <div className="absolute top-4 left-5">
                    <div
                      className="w-12 h-12 rounded-xl border-[3px] border-black flex items-center justify-center shadow-thick-3 group-hover:scale-110 transition-transform group-hover:-rotate-3"
                      style={{ backgroundColor: path.accent }}
                    >
                      <path.icon
                        className="text-white w-5 h-5"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-black text-black group-hover:text-blue-saturated transition-colors leading-tight truncate pr-2">
                        {path.title}
                      </h3>
                    </div>

                    <p className="text-[#1F3D8B] font-bold text-xs leading-relaxed mb-4 line-clamp-2">
                      {path.description}
                    </p>

                    {/* Footer Stats */}
                    <div className="mt-auto flex items-center gap-3 pt-3 border-t-2 border-dashed border-gray-200">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-black/10 text-[10px] font-black text-black uppercase">
                        <Clock className="w-3 h-3" />
                        {path.time}
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-black/10 text-[10px] font-black text-black uppercase">
                        <Trophy className="w-3 h-3" />
                        {path.xp} XP
                      </div>

                      <div className="ml-auto w-7 h-7 rounded-lg bg-black flex items-center justify-center shadow-thick-blue-2 group-hover:shadow-thick-blue-3 group-hover:-translate-y-0.5 transition-all">
                        <Play className="w-2.5 h-2.5 text-white fill-current" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export const ALL_PATHS = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Build real websites and apps. Master HTML, CSS, Javascript, and React to create your own corner of the internet.",
    icon: Code,
    emoji: "🌐",
    color: "#C7E4FF", // Blue
    accent: "#3771F2",
    xp: 2500,
    modules: 12,
    time: "4 Weeks",
    missions: [
      {
        id: 1,
        title: "HTML Hero: The Structure",
        type: "Video",
        status: "Completed",
        xp: 100,
      },
      {
        id: 2,
        title: "CSS Stylist: Make it Pretty",
        type: "Interactive",
        status: "In Progress",
        xp: 150,
      },
      {
        id: 3,
        title: "JS Logic: The Brains",
        type: "Challenge",
        status: "Locked",
        xp: 200,
      },
      {
        id: 4,
        title: "React Rocket: Components",
        type: "Project",
        status: "Locked",
        xp: 500,
      },
    ],
  },
  {
    id: "game-dev",
    title: "Game Creation",
    description:
      "Design and code your own games. Learn game physics, character movement, and level design.",
    icon: Gamepad2,
    emoji: "🎮",
    color: "#C7B3FF", // Purple
    accent: "#9C7FFF",
    xp: 3000,
    modules: 15,
    time: "6 Weeks",
    missions: [
      {
        id: 1,
        title: "Sprite Maker",
        type: "Creative",
        status: "Completed",
        xp: 100,
      },
      {
        id: 2,
        title: "Physics 101: Gravity",
        type: "Interactive",
        status: "Locked",
        xp: 150,
      },
      {
        id: 3,
        title: "Level Design Basics",
        type: "Video",
        status: "Locked",
        xp: 100,
      },
      {
        id: 4,
        title: "Boss Battle Logic",
        type: "Challenge",
        status: "Locked",
        xp: 300,
      },
    ],
  },
  {
    id: "ai-basics",
    title: "AI & Data Science",
    description:
      "Understand how computers think. Train simple models and learn about neural networks.",
    icon: BrainCircuit,
    emoji: "🤖",
    color: "#A7FADC", // Mint
    accent: "#0CA678",
    xp: 2000,
    modules: 8,
    time: "3 Weeks",
    missions: [
      {
        id: 1,
        title: "What is AI?",
        type: "Video",
        status: "Completed",
        xp: 50,
      },
      {
        id: 2,
        title: "Data Detective",
        type: "Interactive",
        status: "Completed",
        xp: 150,
      },
      {
        id: 3,
        title: "Train a Model",
        type: "Lab",
        status: "In Progress",
        xp: 250,
      },
    ],
  },
];
