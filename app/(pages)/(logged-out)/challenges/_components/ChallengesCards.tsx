"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Flame,
  Timer,
  ArrowRight,
  Banknote,
  Rocket,
  Star,
  Target,
} from "lucide-react";
import avatarBoy1 from "@public/landing-pages/avatar-team-1.png";
import avatarGirl from "@public/landing-pages/sarah-avatar.png";
import { useRouter } from "next/navigation";

export function ChallengesCards() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-black">
      {/* ==================== CONTENT ==================== */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-32">
        {/* LIST VIEW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border-[3px] border-black shadow-thick-4 mb-8 transform hover:scale-105 hover:-rotate-2 transition-transform">
              <Flame className="w-5 h-5 text-pink-main" fill="#FF5E73" />
              <span className="text-sm tracking-wide font-black text-black uppercase">
                Active Competitions
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-black max-w-5xl mx-auto leading-[1.15] tracking-tight font-extrabold drop-shadow-sm">
              Skill Challenges{" "}
            </h1>

            <p className="text-xl md:text-2xl text-[#1F3D8B] font-medium leading-relaxed max-w-3xl mb-12 mx-auto">
              Win prizes, earn XP, and test your coding skills in real
              challenges.{" "}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CHALLENGES.map((challenge, index) => {
              // Mapping icons locally since we can't edit the data constant
              const Icon = [Rocket, Star, Target][index];
              const bgPattern =
                index === 0
                  ? "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
                  : index === 1
                    ? "bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6),linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6)] [background-position:0_0,10px_10px] [background-size:20px_20px]"
                    : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent";

              return (
                <motion.div
                  key={challenge.id}
                  onClick={() => router.push(`/challenges/${challenge.id}`)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-4xl border-[3px] border-black overflow-hidden cursor-pointer shadow-thick-8 hover:shadow-thick-12 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Card Header Background */}
                  <div
                    className={`h-20 w-full relative ${bgPattern} opacity-50 border-b-2 border-black/5`}
                  >
                    <div className="absolute top-4 right-5 flex gap-2">
                      <div className="px-2.5 py-1 rounded-full bg-white border-2 border-black text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-thick-2">
                        <Timer className="w-2.5 h-2.5" /> {challenge.daysLeft}{" "}
                        Days
                      </div>
                    </div>
                  </div>

                  {/* Floating Icon (Aligned with timer) */}
                  <div className="absolute top-4 left-5">
                    <div
                      className="w-12 h-12 rounded-xl border-[3px] border-black bg-white flex items-center justify-center shadow-thick-3 group-hover:scale-110 transition-transform group-hover:rotate-3"
                      style={{ backgroundColor: challenge.color }}
                    >
                      <Icon
                        className="text-white drop-shadow-md w-5 h-5"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">
                        {challenge.tags[0]}
                      </span>
                      <h3 className="text-xl font-black text-black leading-tight group-hover:text-blue-saturated transition-colors truncate">
                        {challenge.title}
                      </h3>
                    </div>

                    <p className="text-[#1F3D8B]/80 font-bold text-xs leading-relaxed mb-4 line-clamp-2">
                      {challenge.description}
                    </p>

                    {/* Prize Ticket */}
                    <div className="mt-auto mb-4">
                      <div className="flex items-center justify-between p-2.5 rounded-xl border-2 border-black/10 bg-gray-50 group-hover:bg-green-50 group-hover:border-green-100 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">
                            Prize Pool
                          </span>
                          <span className="text-sm font-black text-black">
                            {challenge.cashPrize}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-mint-green-main border-2 border-black flex items-center justify-center text-black">
                          <Banknote className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          {[avatarBoy1, avatarGirl].map((src, i) => (
                            <Image
                              key={i}
                              src={src.src}
                              className="w-6 h-6 rounded-full border-2 border-white bg-gray-100"
                              alt="Participant"
                              width={24}
                              height={24}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">
                          +{challenge.participants} Joined
                        </span>
                      </div>

                      <div className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-blue-saturated group-hover:text-white transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
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
export const CHALLENGES = [
  {
    id: "code-jam-2024",
    title: "Cosmic Game Jam",
    description: "Create a space game in 48 hours.",
    participants: 1240,
    daysLeft: 3,
    difficulty: "Hard",
    prizes: ["MacBook Pro", "SpaceX Tour"],
    cashPrize: "200 SAR",
    color: "#FF5E73", // Red
    accent: "#FFB3C0",
    tags: ["Game Dev", "Hackathon"],
  },
  {
    id: "design-dash",
    title: "UI Star Dash",
    description: "Redesign the dashboard.",
    participants: 850,
    daysLeft: 5,
    difficulty: "Medium",
    prizes: ["iPad Pro", "Figma Pro"],
    cashPrize: "100 SAR",
    color: "#9C7FFF", // Purple
    accent: "#D4C4FF",
    tags: ["UI/UX", "Design"],
  },
  {
    id: "bug-hunt",
    title: "Alien Bug Hunt",
    description: "Squash bugs in our repo.",
    participants: 2300,
    daysLeft: 12,
    difficulty: "Easy",
    prizes: ["Swag Pack", "Gift Cards"],
    cashPrize: "50 SAR",
    color: "#A7FADC", // Mint
    accent: "#D1FBE9",
    tags: ["Open Source", "Debugging"],
  },
];
