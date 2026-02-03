"use client";
import React from "react";
import { motion } from "motion/react";
import { Globe2, MessageCircle, Target, Users } from "lucide-react";

const collaborationFeatures = [
  {
    id: 1,
    title: "Global Teams",
    description: "Work with friends worldwide",
    icon: Globe2,
    emoji: "🌍",
    gradient: "from-white to-#C7B3FF",
  },
  {
    id: 2,
    title: "Real Communication",
    description: "Learn to articulate ideas",
    icon: MessageCircle,
    emoji: "💬",
    gradient: "from-white to-[#A7FADC]",
  },
  {
    id: 3,
    title: "Real Practice Tasks",
    description: "Build together & ship projects",
    icon: Target,
    emoji: "🎯",
    gradient: "from-white to-[#FFB3D9]",
  },
];

export function CollaborationSection() {
  return (
    <section className="md:py-24 py-12 px-6 relative z-10 overflow-hidden">
      {/* Orbiting Planets */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${25 + i * 20}%`,
              top: `${25 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          >
            <div
              className="rounded-full border-2 border-white/30 bg-gradient-to-br from-[#9C7FFF]/20 to-[#5CA9FF]/20 backdrop-blur-sm"
              style={{
                width: `${24 + i * 6}px`,
                height: `${24 + i * 6}px`,
              }}
            />
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-black text-black text-xs font-black uppercase tracking-wider mb-6 shadow-thick-4 bg-pale-purple-main"
          >
            <Users className="size-4" strokeWidth={2.5} />
            Step 4: Join Collaborations
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Join Collaborations &<br />
            Real Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#A7D2FF] md:text-xl text-lg font-medium max-w-2xl mx-auto"
          >
            From small tasks to real projects — juniors practice teamwork,
            communication, and creative thinking.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 max-w-6xl mx-auto">
          {collaborationFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-4xl border-2 border-black p-8 relative overflow-hidden shadow-thick-6 transition-all hover:shadow-thick-6 hover:-translate-y-1"
            >
              {/* Icon - Static, Filled, Bordered */}
              <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-6 relative z-10 shadow-thick-4 bg-[#F0F7FF]">
                <feature.icon className="text-black size-8" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-black mb-3 relative z-10">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-black/80 text-base mb-6 font-medium relative z-10">
                {feature.description}
              </p>

              {/* Icon Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border-2 border-black shadow-sm relative z-10">
                <feature.icon className="text-black size-4" />
                <span className="text-xs font-bold text-black uppercase tracking-wide">
                  Team Feature
                </span>
              </div>

              {/* Decorative blob - Simplified */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-blue-saturated" />
            </motion.div>
          ))}
        </div>

        {/* Orbiting Animation Visual */}
        <motion.div
          className="mt-20 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </section>
  );
}
