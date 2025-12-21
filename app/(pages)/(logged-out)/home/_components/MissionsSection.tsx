"use client"
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Code,
  Rocket,
  Target,
  Brain,
} from "lucide-react";
import { Button } from "@components";

const missionCards = [
  {
    id: 1,
    category: "Easy Integration",
    title: "Debug the Rocket Code",
    description:
      "Fix real bugs and learn how pros think. Jump into pre-written code challenges and debug like a pro.",
    xp: 50,
    skill: "Coding Skill",
    difficulty: "Easy",
    icon: Code,
    color: "#FF9ECE",
  },
  {
    id: 2,
    category: "Quick Deploy",
    title: "Design a Logo",
    description:
      "Build creative confidence with mini-design missions. Learn design principles while creating something amazing.",
    xp: 75,
    skill: "Creative Skill",
    difficulty: "Medium",
    icon: Target,
    color: "#A7FADC",
  },
  {
    id: 3,
    category: "Smart Collaboration",
    title: "Logic Puzzle Challenge",
    description:
      "Train your brain with quick problem-solving challenges. Unlock new thinking patterns with fun puzzles.",
    xp: 60,
    skill: "Problem Solving",
    difficulty: "Easy",
    icon: Brain,
    color: "#FFE285",
  },
  {
    id: 4,
    category: "Secure & Scalable",
    title: "Build Your First App",
    description:
      "Create a real working application from scratch. Learn full-stack development with guided missions.",
    xp: 100,
    skill: "Full Stack",
    difficulty: "Hard",
    icon: Rocket,
    color: "#C7B3FF",
  },
];

export function MissionsSection() {
  const [particles, setParticles] = useState<Array<{id: number, left: number, top: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = [...Array(100)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="md:pt-24 pt-12 px-6 relative z-10">

      {/* Ambient Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/80 rounded-full will-change-transform"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              type: "tween",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Top: Title and Description */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-black bg-yellow-main text-black text-xs font-black uppercase tracking-wider mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <Rocket className="size-4" strokeWidth={2.5} />
              Step 2: Ignition Boost
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 leading-tight">
              Complete Missions.
              <br />
              Build Your Power.
            </h2>

            <p className="text-blue-saturated md:text-xl text-lg font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
              Missions are fun, bite-sized challenges that level up your real
              skills. Solve puzzles, fix code, design UI, or unlock logic
              quests.
            </p>

            <Button intent="mainPink" size="custom">
              Start Missions →
            </Button>
          </motion.div>
        </div>

        {/* Cards Section - Vertical Stacking */}
        <div className="relative flex flex-col items-center pb-32 px-4">
          <div className="w-full max-w-xl space-y-24">
            {missionCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="sticky"
                style={{
                  top: `${140 + index * 20}px`,
                  zIndex: index + 1,
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div
                  className="bg-white rounded-[2rem] border-2 border-black p-8 relative overflow-hidden group hover:shadow-thick-8 transition-all shadow-thick-6 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, white 0%, ${card.color} 100%)`,
                  }}
                >

                  {/* Card Header - Category & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="px-3 py-1.5 bg-white/90 rounded-full border-2 border-black shadow-thick-2">
                      <span className="text-xs tracking-wider uppercase">
                        ✨ {card.category}
                      </span>
                    </div>
                    <div className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-thick-3 group-hover:rotate-12 transition-transform">
                      <card.icon
                        className="text-black size-5.5"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-2xl mb-3 text-black leading-tight font-bold">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-black/70 mb-5 leading-relaxed font-medium">
                    {card.description}
                  </p>

                  {/* Card Stats - All on same line */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 rounded-full border-2 border-black shadow-thick-2">
                      <Zap
                        className="text-yellow-main size-4"
                        fill="#FFE285"
                      />
                      <span className="text-xs font-bold">+{card.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 rounded-full border-2 border-black shadow-thick-2">
                      <Rocket className="text-pinkbg-pink-main size-4" />
                      <span className="text-xs font-bold">{card.skill}</span>
                    </div>
                    <div className="px-3 py-1.5 bg-white/90 rounded-full border-2 border-black shadow-thick-2">
                      <span className="text-xs font-bold">
                        {card.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Progress Dots */}
                  <div className="flex gap-2 mt-4">
                    {[...Array(missionCards.length)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full border-2 border-black transition-colors ${
                          i === index ? "bg-mint-green-main" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
