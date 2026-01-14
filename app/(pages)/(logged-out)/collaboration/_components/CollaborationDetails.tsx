"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Users,
  ChevronLeft,
  Rocket,
  Code,
  Globe,
  Search,
  Wallet,
  ShoppingCart,
  Gamepad2,
  Recycle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { CollaborationTeam } from "../_data/teams";
import { Button } from "@components";

const PROJECT_ICONS = {
  ShoppingCart,
  Gamepad2,
  Recycle,
} as const;

export function CollaborationDetails({ team }: { team: CollaborationTeam }) {
  const router = useRouter();

  const ProjectIcon = PROJECT_ICONS[team.projectIconKey];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-black">
      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-5 sm:pb-20">
        <motion.div
          key="details"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-black font-bold mb-8 hover:text-blue-saturated transition-colors relative z-20"
          >
            <div className="w-12 h-12 bg-white rounded-full border-[3px] border-black flex items-center justify-center shadow-thick-4 group-hover:-translate-x-1 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </div>
            <span className="text-lg uppercase tracking-wide">Back</span>
          </button>

          <div className="bg-white rounded-[2rem] sm:rounded-[3rem] border-[3px] border-black p-4 sm:p-8 md:p-12 shadow-thick-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-center sm:text-left">
                  <div
                    className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl sm:rounded-4xl border-[3px] border-black flex items-center justify-center shadow-thick-4 sm:shadow-thick-8 rotate-3"
                    style={{ backgroundColor: team.color }}
                  >
                    <ProjectIcon
                      className="text-black w-12 h-12 sm:w-16 sm:h-16"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {team.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md border-2 border-black bg-yellow-main text-black text-xs font-black uppercase tracking-wider shadow-thick-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-2 text-black">
                      {team.name}
                    </h2>
                    <div className="text-lg sm:text-xl text-blue-saturated font-black flex items-center justify-center sm:justify-start gap-2">
                      <Rocket className="w-6 h-6" /> {team.projectType}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-[#F0F9FF] border-[3px] border-black shadow-thick-4">
                    <h3 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 flex items-center gap-2 text-black">
                      <Globe className="w-6 h-6 text-blue-saturated" /> Project
                      Brief
                    </h3>
                    <p className="text-[#1F3D8B] leading-relaxed text-base sm:text-lg font-bold">
                      {team.description}
                    </p>
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#FFF5F7] border-[3px] border-black shadow-thick-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <div className="text-xs text-[#1F3D8B] font-black uppercase tracking-wider mb-1">
                        Funding Grant
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-black flex items-center gap-2">
                        {team.funding}
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-main border-[3px] border-black flex items-center justify-center text-white">
                      <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 flex items-center gap-2 text-black">
                      <Search className="w-6 h-6 text-pink-main" /> Open Roles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {team.roles.map((role) => (
                        <div
                          key={role}
                          className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white border-2 border-black hover:border-blue-saturated transition-colors group cursor-pointer shadow-thick-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#E0F2FF] flex items-center justify-center border-2 border-black shrink-0">
                              <Code className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                            </div>
                            <span className="font-bold text-black text-sm sm:text-base flex-1">
                              {role}
                            </span>
                          </div>
                          <button className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg bg-black text-white text-xs font-black opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shrink-0">
                            APPLY
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl sm:rounded-4xl border-[3px] border-black p-4 sm:p-6 lg:p-8 h-fit mt-8 lg:mt-0">
                <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-black">
                  <Users className="w-6 h-6 text-pink-main" /> Crew Manifest
                </h3>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-white border-2 border-black shadow-thick-2">
                    <Image
                      src={team.leadAvatarSrc}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black"
                      alt="Team Lead"
                      width={48}
                      height={48}
                    />
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-black">
                        Team Lead
                      </div>
                      <div className="text-xs text-gray-500 font-bold">
                        Project Creator
                      </div>
                    </div>
                  </div>

                  {[...Array(team.members - 1)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 sm:p-4 rounded-xl border-2 border-transparent"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 border-2 border-black flex items-center justify-center font-black text-black text-sm sm:text-lg shrink-0">
                        {String.fromCharCode(66 + i)}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-black">
                          Cadet {String.fromCharCode(66 + i)}
                        </div>
                        <div className="text-xs text-gray-400 font-bold">
                          Joined recently
                        </div>
                      </div>
                    </div>
                  ))}

                  {[...Array(team.maxMembers - team.members)].map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="flex items-center gap-3 sm:gap-4 opacity-60 p-2 sm:p-3 rounded-xl border-2 border-dashed border-black/20 bg-black/5"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-black/40 flex items-center justify-center text-black/40 shrink-0">
                        <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-black">
                          Slot Available
                        </div>
                        <div className="text-xs font-bold text-blue-saturated uppercase tracking-wide">
                          {team.roles[i] || "Any Role"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  intent="mainBlack"
                  size="mainDefault"
                  className="rounded-xl md:text-lg text-base w-full"
                >
                  Request to Join
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
