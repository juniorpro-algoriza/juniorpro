"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Trophy,
  Star,
  ChevronLeft,
  Rocket,
  Target,
  Zap,
  Crown,
  Flame,
  Timer,
  DollarSign,
} from "lucide-react";
import avatarBoy1 from "@public/landing-pages/avatar-team-1.png";
import avatarBoy2 from "@public/landing-pages/avatar-team-2.png";
import avatarGirl from "@public/landing-pages/sarah-avatar.png";
import { Button } from "@components";
import { useRouter } from "next/navigation";
import { CHALLENGES } from "../_components/ChallengesCards";

export default function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = React.use(params);
  const selectedChallenge = CHALLENGES.find((challenge) => challenge.id === id);

  if (!selectedChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black mb-4">
            Challenge Not Found
          </h1>
          <Button onClick={() => router.push("/challenges")} intent="unset">
            Back to Challenges
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-black">
      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <button
            onClick={() => router.push("/challenges")}
            className="group flex items-center gap-3 text-black font-bold mb-8 hover:text-blue-saturated transition-colors relative z-20"
          >
            <div className="w-12 h-12 bg-white rounded-full border-[3px] border-black flex items-center justify-center shadow-thick-4 group-hover:-translate-x-1 transition-all group-hover:shadow-thick-2">
              <ChevronLeft className="w-6 h-6" />
            </div>
            <span className="text-lg uppercase tracking-wide">Back</span>
          </button>

          <div className="bg-white rounded-[3rem] border-[3px] border-black p-8 md:p-12 shadow-thick-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div
              className={`absolute top-0 left-0 w-full md:h-48 h-32 opacity-20 border-b-[3px] border-black
              ${
                selectedChallenge.id === "code-jam-2024"
                  ? "bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px]"
                  : selectedChallenge.id === "design-dash"
                    ? "bg-[linear-gradient(45deg,#000_1px,transparent_1px)] [background-size:20px_20px]"
                    : "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/10 to-transparent"
              }`}
              style={{ backgroundColor: selectedChallenge.color }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 pt-8">
              {/* Left: Info */}
              <div>
                {/* Header with Icon */}
                <div className="flex flex-col md:flex-row gap-8 md:mb-8 mb-5">
                  <div className="md:size-32 size-24 shrink-0 rounded-4xl border-[3px] border-black flex items-center justify-center bg-white shadow-thick-8 rotate-3">
                    {selectedChallenge.id === "code-jam-2024" ? (
                      <Rocket
                        className="text-pink-main md:size-14 size-10"
                        strokeWidth={2.5}
                      />
                    ) : selectedChallenge.id === "design-dash" ? (
                      <Star
                        className="text-purple-main md:size-14 size-10"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Target
                        className="text-mint-bg-mint-green-main md:size-14 size-10"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedChallenge.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md border-2 border-black bg-pink-main text-white text-xs font-black uppercase tracking-wider shadow-thick-2"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="px-3 py-1 rounded-md border-2 border-black bg-white text-black text-xs font-black uppercase tracking-wider shadow-thick-2">
                        {selectedChallenge.difficulty} Mode
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black leading-[0.9] mb-4">
                      {selectedChallenge.title}
                    </h2>
                    <p className="text-xl text-[#1F3D8B] font-bold leading-relaxed">
                      {selectedChallenge.description}
                    </p>
                  </div>
                </div>

                {/* Stats Boxes */}
                <div className="grid sm:grid-cols-2 sm:gap-6 gap-3 sm:mb-10 mb-5">
                  <div className="p-5 rounded-2xl bg-[#F0F9FF] border-[3px] border-black shadow-thick-4 flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-black uppercase tracking-widest text-[#1F3D8B]/60">
                        Deadline
                      </span>
                      <Timer className="w-5 h-5 text-blue-saturated" />
                    </div>
                    <div className="text-3xl font-black text-black">
                      {selectedChallenge.daysLeft}{" "}
                      <span className="text-lg text-[#1F3D8B]/60">Days</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#FFF5F7] border-[3px] border-black shadow-thick-4 flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-black uppercase tracking-widest text-purple-main/60">
                        Total Prize
                      </span>
                      <DollarSign className="w-5 h-5 text-pink-main" />
                    </div>
                    <div className="text-3xl font-black text-black">
                      {selectedChallenge.cashPrize}
                    </div>
                  </div>
                </div>

                {/* Participants Section */}
                <div className="mb-10 bg-gray-50 p-6 rounded-2xl border-[3px] border-black/10">
                  <div className="flex items-center justify-between flex-wrap mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-black/40">
                      Current Contenders
                    </span>
                    <span className="text-xs font-bold text-black">
                      {selectedChallenge.participants} Joined
                    </span>
                  </div>
                  <div className="flex items-center sm:gap-4 gap-2 flex-wrap">
                    {[avatarBoy1, avatarGirl, avatarBoy2].map((src, i) => (
                      <div
                        key={i}
                        className="relative hover:-translate-y-1 transition-transform cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl border-[3px] border-black bg-white overflow-hidden">
                          <Image
                            src={src.src}
                            alt="Contender"
                            className="w-full h-full object-cover"
                            width={48}
                            height={48}
                          />
                        </div>
                        {i === 0 && (
                          <div className="absolute -top-3 -right-3">
                            <Crown
                              className="w-5 h-5 text-yellow-main drop-shadow-sm"
                              fill="#FFE285"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <button className="w-12 h-12 rounded-xl border-[3px] border-black bg-white flex items-center justify-center hover:bg-gray-100 font-black text-black">
                      +
                    </button>
                  </div>
                </div>
                <Button
                  intent="mainBlue"
                  size="mainDefault"
                  className="rounded-xl text-base w-full md:text-2xl sm:text-lg text-md py-4"
                >
                  <Zap
                    className="w-7 h-7 text-yellow-main group-hover:scale-110 transition-transform"
                    fill="#FFE285"
                  />
                  Start Mission
                </Button>
              </div>

              {/* Right: Rewards Panel */}
              <div className="flex flex-col h-full">
                <div className="bg-yellow-main text-yellow-main rounded-4xl border-[3px] border-black p-8 h-full shadow-thick-8 relative">
                  <div className="flex items-center gap-3 mb-8 border-b-[3px] border-black pb-6">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-white border-[3px] border-black flex items-center justify-center">
                      <Trophy className="text-black md:size-6 size-5" />
                    </div>
                    <h3 className="md:text-3xl text-xl font-black text-black uppercase tracking-tighter">
                      Mission Rewards
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Grand Prize Card */}
                    <div className="bg-white rounded-2xl border-[3px] border-black p-6 shadow-thick-4 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                      <div className="absolute top-0 right-0 px-4 py-1 bg-pink-main text-white text-[10px] font-black uppercase border-l-[3px] border-b-[3px] border-black">
                        Grand Prize
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="md:text-4xl text-2xl font-black text-black">
                          {selectedChallenge.cashPrize}
                        </span>
                        <span className="text-sm font-bold text-black/60">
                          Cash Reward + {selectedChallenge.prizes[0]}
                        </span>
                      </div>
                    </div>

                    {/* Other Prizes List */}
                    <div className="space-y-3">
                      {selectedChallenge.prizes.slice(1).map((prize, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border-2 border-black/10"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center font-black text-xs text-black">
                            {idx + 2}
                          </div>
                          <span className="font-bold text-black">{prize}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto md:pt-8 pt-4">
                    <div className="bg-white/40 rounded-xl p-4 border-2 border-black/5">
                      <h4 className="font-black text-black mb-2 text-xs uppercase tracking-wider flex items-center gap-2">
                        <Flame className="w-3.5 h-3.5" /> Briefing
                      </h4>
                      <ul className="space-y-2 text-sm text-black font-bold">
                        <li className="flex items-start gap-2">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black" />
                          Submit your project via GitHub repository link.
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black" />
                          Teams can have up to 4 cadets.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
