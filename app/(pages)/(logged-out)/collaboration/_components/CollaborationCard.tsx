"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Users,
  Search,
  ArrowRight,
  Wallet,
  ShoppingCart,
  Gamepad2,
  Recycle,
} from "lucide-react";
import avatarBoy1 from "@public/landing-pages/avatar-team-1.png";
import avatarGirl from "@public/landing-pages/sarah-avatar.png";
import { useRouter } from "next/navigation";
import { TEAMS } from "../_data/teams";

const PROJECT_ICONS = {
  ShoppingCart,
  Gamepad2,
  Recycle,
} as const;

export function CollaborationCard() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-black">
      {/* ==================== CONTENT ==================== */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-32">
        <motion.div
          key="list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border-[3px] border-black shadow-thick-4 mb-8 transform hover:scale-105 hover:-rotate-2 transition-transform">
              <Users className="w-5 h-5 text-blue-saturated" fill="#3771F2" />
              <span className="text-sm tracking-wide font-black text-black uppercase">
                Squad Up
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-black max-w-5xl mx-auto leading-[1.15] tracking-tight font-extrabold drop-shadow-sm">
              Join a Crew
            </h1>
            <p className="text-xl md:text-2xl text-[#1F3D8B] font-medium leading-relaxed max-w-3xl mb-12 mx-auto">
              Find your perfect team and build amazing projects together.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAMS.map((team, index) => {
              const bgPattern =
                index === 0
                  ? "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
                  : index === 1
                    ? "bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6),linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6)] [background-position:0_0,10px_10px] [background-size:20px_20px]"
                    : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent";

              const ProjectIcon = PROJECT_ICONS[team.projectIconKey];

              return (
                <motion.div
                  key={team.id}
                  onClick={() => router.push(`/collaboration/${team.id}`)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-4xl border-[3px] border-black cursor-pointer shadow-thick-8 hover:shadow-thick-12 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                  {/* Header Pattern */}
                  <div
                    className={`h-20 w-full border-b-[3px] border-black relative ${bgPattern} opacity-60`}
                  >
                    <div className="absolute top-4 right-5">
                      <div className="px-2.5 py-1 rounded-xl bg-yellow-main border-2 border-black text-black text-[9px] font-black flex items-center gap-1 shadow-thick-2 transform rotate-2 group-hover:rotate-0 transition-transform">
                        <Wallet className="w-2.5 h-2.5" strokeWidth={2.5} />{" "}
                        {team.funding}
                      </div>
                    </div>
                  </div>

                  {/* Floating Project Icon */}
                  <div className="absolute top-4 left-5">
                    <div
                      className="w-12 h-12 rounded-xl border-[3px] border-black flex items-center justify-center shadow-thick-3 group-hover:scale-110 transition-transform group-hover:-rotate-3"
                      style={{ backgroundColor: team.color }}
                    >
                      <ProjectIcon
                        className="text-black w-5 h-5"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-black text-black mb-1 group-hover:text-blue-saturated transition-colors leading-tight truncate">
                      {team.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-saturated" />
                      <span className="text-[10px] font-black text-blue-saturated uppercase tracking-wider">
                        {team.projectType}
                      </span>
                    </div>

                    <p className="text-[#1F3D8B] font-bold text-xs leading-relaxed mb-4 line-clamp-2">
                      {team.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center gap-1.5 mb-2 text-black/40">
                        <Search className="w-3 h-3" strokeWidth={3} />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          Looking For
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {team.roles.map((role) => (
                          <span
                            key={role}
                            className="px-2 py-1 rounded-md border-2 border-black/10 bg-gray-50 text-black text-[10px] font-bold group-hover:border-blue-saturated group-hover:bg-[#E0F2FF] transition-colors"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-gray-200">
                      <div className="flex items-center -space-x-1.5">
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
                        <span className="text-[10px] font-bold text-gray-400">
                          +{team.members} Joined
                        </span>
                      </div>

                      <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center shadow-thick-blue-2 group-hover:shadow-thick-blue-3 group-hover:-translate-y-0.5 transition-all">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
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
