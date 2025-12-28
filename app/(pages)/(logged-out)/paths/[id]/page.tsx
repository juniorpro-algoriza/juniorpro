"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Clock,
  Trophy,
  Lock,
  Play,
  CheckCircle2,
  Plus,
  Gamepad2,
  BrainCircuit,
  Rocket,
  MapPin,
  Flag,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@components";
import { ALL_PATHS } from "../_components/AvailablePaths";

type Path = (typeof ALL_PATHS)[number];
type Mission = Path["missions"][number];

export default function PathDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const selectedPath = ALL_PATHS.find((p: Path) => p.id === params?.id);
  const [assignedPaths, setAssignedPaths] = useState<string[]>([]);

  const handleAssign = (pathId: string) => {
    if (assignedPaths.includes(pathId)) {
      setAssignedPaths((prev) => prev.filter((id) => id !== pathId));
    } else {
      setAssignedPaths((prev) => [...prev, pathId]);
    }
  };

  if (!selectedPath) {
    return (
      <div className="min-h-screen relative overflow-hidden font-sans">
        <div className="relative z-10 container mx-auto max-w-7xl px-6 py-32">
          <button
            onClick={() => router.push("/paths")}
            className="group flex items-center gap-3 text-black font-bold mb-8 hover:text-blue-saturated transition-colors relative z-20"
          >
            <div className="w-12 h-12 bg-white backdrop-blur-md rounded-full border-2 border-black flex items-center justify-center group-hover:bg-white group-hover:-translate-x-1 transition-all shadow-thick-2">
              <ChevronLeft className="w-6 h-6 text-black" />
            </div>
            <span className="text-lg">Back to Mission Control</span>
          </button>

          <div className="bg-white rounded-4xl border-[3px] border-black p-8 shadow-thick-8">
            <h1 className="text-2xl font-black text-black mb-2">
              Path not found
            </h1>
            <p className="text-[#1F3D8B] font-bold text-sm">
              The requested path does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-32">
        <motion.div
          key="details-view"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <button
            onClick={() => router.push("/paths")}
            className="group flex items-center gap-3 text-black font-bold mb-8 hover:text-blue-saturated transition-colors relative z-20"
          >
            <div className="w-12 h-12 bg-white backdrop-blur-md rounded-full border-2 border-black flex items-center justify-center group-hover:bg-white group-hover:-translate-x-1 transition-all shadow-thick-2">
              <ChevronLeft className="w-6 h-6 text-black" />
            </div>
            <span className="text-lg">Back to Mission Control</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 sticky top-32">
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-4xl border-[3px] border-black transition-all duration-300"
                  style={{
                    boxShadow: `8px 8px 0px 0px #000000`,
                  }}
                />

                <div className="relative z-10 bg-white rounded-4xl border-[3px] border-transparent overflow-hidden flex flex-col">
                  <div
                    className="h-24 w-full border-b-[3px] border-black relative opacity-60"
                    style={{
                      backgroundColor: selectedPath.color,
                      backgroundImage:
                        "radial-gradient(#000 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />

                  <div className="absolute top-6 left-6">
                    <div
                      className="w-16 h-16 rounded-2xl border-[3px] border-black flex items-center justify-center shadow-thick-4"
                      style={{ backgroundColor: selectedPath.accent }}
                    >
                      <selectedPath.icon
                        className="text-white w-8 h-8"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  <div className="pt-8 px-6 pb-6">
                    <div className="mt-4 mb-3">
                      <h2 className="text-3xl font-black text-black leading-none mb-2">
                        {selectedPath.title}
                      </h2>
                      <p className="text-[#1F3D8B] font-bold text-xs leading-relaxed">
                        {selectedPath.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex flex-col p-3 bg-white rounded-xl border-2 border-black/10">
                        <span className="text-[10px] font-black text-black/60 uppercase tracking-wider mb-1">
                          Duration
                        </span>
                        <span className="font-black text-black text-sm flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {selectedPath.time}
                        </span>
                      </div>
                      <div className="flex flex-col p-3 bg-white rounded-xl border-2 border-black/10">
                        <span className="text-[10px] font-black text-black/60 uppercase tracking-wider mb-1">
                          Total XP
                        </span>
                        <span className="font-black text-black text-sm flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5" /> {selectedPath.xp}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAssign(selectedPath.id)}
                      intent="mainPink"
                      size="mainDefault"
                      className={`w-full ${
                        assignedPaths.includes(selectedPath.id)
                          ? "bg-mint-green-main text-black hover:bg-mint-green-main"
                          : ""
                      }`}
                      icon={
                        assignedPaths.includes(selectedPath.id) ? (
                          <CheckCircle2
                            className="w-4.5 h-4.5"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Plus className="w-4.5 h-4.5" strokeWidth={2.5} />
                        )
                      }
                      iconPosition="left"
                    >
                      {assignedPaths.includes(selectedPath.id)
                        ? "Assigned"
                        : "Assign Path"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-4xl border-[3px] border-black p-8 shadow-thick-8 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b-2 border-dashed border-black/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-black text-black mb-1 tracking-tight flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-blue-saturated" /> Mission
                      Map
                    </h3>
                    <p className="text-[#1F3D8B] font-bold text-sm">
                      Follow the path to master this skill.
                    </p>
                  </div>
                </div>

                <div className="space-y-0 relative max-w-3xl mx-auto lg:pl-4 ">
                  <div className="absolute lg:left-[2.5rem] left-[1.2rem] top-2 bottom-4 w-1 border-l-[3px] border-dashed border-black/20 -z-10" />

                  {selectedPath.missions.map(
                    (mission: Mission, index: number) => {
                      return (
                        <motion.div
                          key={mission.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          className={`relative lg:pl-16 pl-12 pb-6 last:pb-0 group`}
                        >
                          <div
                            className={`absolute left-0 top-0 lg:size-12 size-9 rounded-xl border-[3px] border-black z-10 flex items-center justify-center transition-all duration-300 bg-white shadow-thick-3 group-hover:scale-110
                          `}
                          >
                            <div className="text-sm font-black text-black">
                              {index + 1}
                            </div>
                            <div
                              className={`absolute -right-1 -top-1 w-3 h-3 rounded-full border-2 border-black
                                ${
                                  mission.status === "Completed"
                                    ? "bg-[#A7FADC]"
                                    : mission.status === "In Progress"
                                      ? "bg-[#FFE285]"
                                      : "bg-gray-300"
                                }
                            `}
                            />
                          </div>

                          <div className="absolute lg:left-[3rem] lg:top-[1.5rem] left-[2rem] top-[1rem] w-6 h-[3px] bg-black opacity-20 dashed" />

                          <motion.div
                            className="relative group cursor-pointer"
                            whileHover={{ x: 4 }}
                          >
                            <div
                              className="absolute inset-0 rounded-2xl border-[3px] border-black transition-all duration-300 bg-white"
                              style={{
                                boxShadow: `4px 4px 0px 0px #000000`,
                              }}
                            />

                            <div className="relative z-10 p-4 rounded-2xl border-[3px] border-transparent transition-colors flex items-center justify-between gap-4 flex-wrap">
                              <div className="flex items-center gap-4 flex-wrap">
                                <div
                                  className={`w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center shrink-0
                                        ${
                                          mission.type === "Video"
                                            ? "bg-[#C7E4FF]"
                                            : mission.type === "Interactive"
                                              ? "bg-[#FFE285]"
                                              : mission.type === "Project"
                                                ? "bg-pink-main text-white"
                                                : "bg-[#FFB3D9]"
                                        }
                                    `}
                                >
                                  {mission.type === "Video" ? (
                                    <Play
                                      className="w-4 h-4"
                                      fill="currentColor"
                                    />
                                  ) : mission.type === "Interactive" ? (
                                    <Gamepad2 className="w-4 h-4" />
                                  ) : mission.type === "Project" ? (
                                    <Rocket className="w-4 h-4" />
                                  ) : (
                                    <BrainCircuit className="w-4 h-4" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[9px] font-black text-blue-saturated uppercase tracking-widest bg-[#E0F2FF] px-1.5 py-0.5 rounded border border-blue-saturated/20">
                                      {mission.type}
                                    </span>
                                    {mission.status === "Locked" && (
                                      <Lock className="w-2.5 h-2.5 text-gray-600" />
                                    )}
                                  </div>
                                  <h4 className="text-base font-black text-black leading-tight">
                                    {mission.title}
                                  </h4>
                                </div>
                              </div>

                              <div className="px-3 py-1 bg-white rounded-lg border-2 border-black/10 font-black text-black text-xs flex items-center gap-1 shadow-sm shrink-0 ms-auto">
                                <Trophy
                                  className="w-3 h-3 text-pink-main"
                                  fill="#FF5E73"
                                />{" "}
                                {mission.xp} XP
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    }
                  )}

                  <div className="relative pl-16 pt-2">
                    <div className="absolute left-[0.5rem] top-6 w-10 h-10 rounded-lg border-[3px] border-black bg-[#FFE285] flex items-center justify-center shadow-thick-3">
                      <Flag className="w-4 h-4 text-black" fill="#0C1335" />
                    </div>
                    <div className="text-xs font-black text-blue-saturated pt-8 pl-1 uppercase tracking-wider">
                      Finish
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
