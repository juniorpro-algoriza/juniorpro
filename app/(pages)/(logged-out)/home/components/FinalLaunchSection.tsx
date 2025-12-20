"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import solarSystemImg from "@public/landing-pages/4b15a01f584178d6adc725af416b117d500271cf.png";
import { Button } from "@components";

export function FinalLaunchSection() {
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
    <section className="pb-24 px-6 relative z-10 text-center  flex flex-col justify-center">
      {/* Twinkling Stars */}
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

      <div className="container mx-auto relative z-10 max-w-5xl">
        {/* Solar System - Blended Behind/Below the Title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-full max-w-6xl -z-10 flex justify-center pointer-events-none opacity-80 mix-blend-screen overflow-hidden">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.5, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Image
              src={solarSystemImg}
              alt="Solar System Orbits"
              width={1200}
              height={800}
              className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              priority
            />
          </motion.div>
        </div>

        {/* Epic Title */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:mb-32 mb-12 pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-8 py-3 rounded-full border-2 border-yellowish-green-main bg-yellowish-green-main/10 text-yellowish-green-main text-sm font-black uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(198,255,62,0.3)]"
          >
            MISSION STATUS: GO
          </motion.div>

          <h2 className="text-3xl md:text-5xl text-white mb-6 leading-tight font-black tracking-tight drop-shadow-xl">
            Fueled Up &<br />
            Ready to Soar.
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:text-xl text-lg text-white/90 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md"
          >
            Your junior is ready to go anywhere above the sky. Armed with
            real-world skills and critical thinking, they are prepared to face
            anything the future holds.
          </motion.p>
        </motion.div>

        {/* CTA Buttons - Brainfish Style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20">
          <Button
            intent="mainPink"
            size="custom"
            className="text-lg sm:px-10 shadow-thick-5 py-5 max-sm:w-full"
          >
            <Sparkles className="inline mr-2 size-6" />
            Launch Their Journey Now
          </Button>

          <Button
            intent="mainWhite"
            size="custom"
            className="text-lg sm:px-10 shadow-thick-5 py-5 max-sm:w-full"
          >
            Try Free Missions First
          </Button>
        </div>
      </div>
    </section>
  );
}
