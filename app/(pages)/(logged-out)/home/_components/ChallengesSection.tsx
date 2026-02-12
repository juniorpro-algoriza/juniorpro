"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Swords, Users, Trophy } from "lucide-react";

const challenges = [
  {
    id: 1,
    title: "Speed Challenge",
    description: "Can you finish before the timer hits zero? Earn bonus fuel!",
    icon: Clock,
    emoji: "⚡",
    gradient: "from-white to-[#FFB3D9]",
    accentColor: "#FF5E73",
  },
  {
    id: 2,
    title: "Friendly Battle",
    description:
      "Challenge a friend to a coding duel. Who will solve it first?",
    icon: Swords,
    emoji: "⚔️",
    gradient: "from-white to-[#FFE285]",
    accentColor: "#FFD54F",
  },
  {
    id: 3,
    title: "Squad Mission",
    description: "Team up with your crew to solve big puzzles together!",
    icon: Users,
    emoji: "🚀",
    gradient: "from-white to-[#C7B3FF]",
    accentColor: "#9C7FFF",
  },
];

export function ChallengesSection() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);
  return (
    <section className="md:py-24 py-12 px-6 relative z-10 overflow-hidden">
      {/* Floating Stars instead of clouds */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              type: "tween",
              ease: "easeInOut",
            }}
          >
            <span className="text-white text-sm">✨</span>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-black bg-[#FF9ECE] text-black text-xs font-black uppercase tracking-wider mb-6 shadow-thick-4"
          >
            <Trophy className="w-4 h-4" strokeWidth={2.5} />
            Step 3: Unlock Advanced Challenges
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            As They Grow, New Challenges Appear.{" "}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C7E4FF] md:text-xl text-lg font-medium max-w-2xl mx-auto"
          >
            After completing core missions, juniors unlock higher-level
            challenges that test deeper understanding and problem-solving skills
            with other learners
          </motion.p>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-[2rem] border-2 border-black p-8 relative overflow-hidden shadow-thick-6 transition-all hover:shadow-thick-8 hover:-translate-y-1"
            >
              {/* Icon - Static, Filled, Bordered */}
              <div
                className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-6 relative z-10 shadow-thick-4"
                style={{ backgroundColor: challenge.accentColor }}
              >
                <challenge.icon
                  className="text-black w-8 h-8"
                  strokeWidth={2.5}
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-black mb-2 relative z-10">
                {challenge.title}
              </h3>

              {/* Description */}
              <p className="text-black/80 text-base mb-6 font-medium relative z-10">
                {challenge.description}
              </p>

              {/* Bottom Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border-2 border-black shadow-sm relative z-10">
                <challenge.icon className="text-black w-4 h-4" />
                <span className="text-xs font-bold text-black uppercase tracking-wide">
                  Arena Challenge
                </span>
              </div>

              {/* Decorative blob - Simplified */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10"
                style={{ backgroundColor: challenge.accentColor }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
