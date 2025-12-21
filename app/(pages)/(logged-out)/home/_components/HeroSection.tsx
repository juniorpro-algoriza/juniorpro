"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Play, Rocket, Trophy, Users, Code, Brain, Lock } from "lucide-react";
import Image from "next/image";
import cloudImg from "@public/landing-pages/clouds.png";
import avatarTeam1 from "@public/landing-pages/avatar-team-1.png";
import avatarTeam2 from "@public/landing-pages/avatar-team-2.png";
import rocketGirlImg from "@public/landing-pages/rocket-girl.png";
import sarahAvatar from "@public/landing-pages/sarah-avatar.png";
import { Button } from "@components";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden text-center">
      {/* Animated Floating Clouds - Parallax */}
      {useMemo(() => (
        <>
          <motion.div 
            className="absolute top-[15%] left-[-5%] w-64 md:w-96 opacity-80 z-0 will-change-transform"
            animate={{ x: [0, 100, 0] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear",
              type: "tween"
            }}
          >
            <Image
              src={cloudImg}
              alt="Cloud"
              width={512}
              height={256}
              className="w-full h-auto object-contain"
              priority
              quality={40}
            />
          </motion.div>
          <motion.div 
            className="absolute top-[40%] right-[-10%] w-80 md:w-[500px] opacity-70 z-0 will-change-transform"
            animate={{ x: [0, -80, 0] }}
            transition={{ 
              duration: 35, 
              repeat: Infinity, 
              ease: "linear",
              type: "tween"
            }}
          >
            <Image
              src={cloudImg}
              alt="Cloud"
              width={800}
              height={400}
              className="w-full h-auto object-contain"
              priority
              quality={40}
            />
          </motion.div>
          <motion.div 
            className="absolute bottom-[20%] left-[5%] w-48 opacity-60 z-0 will-change-transform"
            animate={{ x: [0, 60, 0] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear",
              type: "tween"
            }}
          >
            <Image
              src={cloudImg}
              alt="Cloud"
              width={384}
              height={192}
              className="w-full h-auto object-contain"
              priority
              quality={40}
            />
          </motion.div>
        </>
      ), [])}

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Friendly Welcome Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-main border-2 border-black shadow-thick-3 text-black text-xs font-black tracking-wide mb-8"
        >
          <Rocket className="size-4" fill="currentColor" />
          <span className="uppercase">Welcome to Sawiha</span>
        </motion.div>

        {/* Big Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 max-w-5xl tracking-tight"
        >
          Your Junior's Journey <br />
          Begins Here
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#1F3D8B] font-medium leading-relaxed max-w-3xl mb-12"
        >
          A guided, playful learning path that grows real skills — one mission
          at a time.
        </motion.p>

        {/* CTAs - Brainfish Style */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            intent="mainPink"
            size="custom"
            className="lg:text-lg px-10 font-black shadow-thick-5 py-5"
          >
            <Rocket className="size-6" fill="currentColor" /> LAUNCH LEARNING
          </Button>
          <Button
            intent="mainWhite"
            size="custom"
            className="lg:text-lg px-10 shadow-thick-5 py-5"
          >
            <Play className="inline mr-2 w-5 h-5" fill="currentColor" />
            Try a Demo Mission
          </Button>
        </motion.div>

        {/* Floating Glass Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-4xl p-8 md:p-10 border-2 border-black shadow-thick-8 relative overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 ">
            <div className="flex items-center gap-4">
              <div className="md:size-16 rounded-full bg-gradient-to-br from-[#C7E4FF] to-[#80C0FF] border-2 border-black p-1 shadow-md">
                <Image
                  src={sarahAvatar}
                  alt="Sarah"
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                  priority
                  quality={50}
                />
              </div>
              <div className="text-left">
                <div className="text-black md:text-xl text-lg font-bold">Sarah</div>
                <div className="text-blue-saturated text-sm font-medium">
                  Level 4 • Future System Architect
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-main to-[#FFD54F] md:px-4 px-2 py-2 rounded-full border-2 border-black shadow-sm">
                <span className="text-lg">⚡</span>
                <span className="text-black text-xs md:text-base">1,240 XP</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#FF9ECE] to-[#FF8CF1] px-4 py-2 rounded-full border-2 border-black shadow-sm">
                <span className="text-lg">🔥</span>
                <span className="text-white text-sm md:text-base">12</span>
              </div>
            </div>
          </div>

          {/* Dashboard Grid - Unified Journey */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side: Visual Motivation */}
            <div className="hidden md:flex flex-col items-center  justify-center p-6 opacity-80">
              <div className="relative w-56 h-56">
                <motion.div
                  className="absolute inset-0 bg-[#C7E4FF] rounded-full mix-blend-multiply filter blur-2xl opacity-50"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Clouds behind rocket */}
                <motion.div
                  className="absolute top-10 -left-10 w-24 opacity-60 z-0"
                  animate={{ x: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={cloudImg}
                    alt="Cloud"
                    width={96}
                    height={48}
                    className="w-full h-auto"
                    quality={40}
                  />
                </motion.div>
                <motion.div
                  className="absolute bottom-10 -right-8 w-20 opacity-60 z-0"
                  animate={{ x: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Image
                    src={cloudImg}
                    alt="Cloud"
                    width={80}
                    height={40}
                    className="w-full h-auto"
                    quality={40}
                  />
                </motion.div>

                <Image
                  src={rocketGirlImg}
                  alt="Rocket Girl"
                  width={224}
                  height={224}
                  className="relative z-10 w-full h-full object-contain drop-shadow-xl"
                  priority
                  quality={50}
                />
              </div>
              <p className="mt-8 text-[#1F3D8B] font-medium text-center text-lg italic">
                "Every expert was once a beginner. <br />
                Keep exploring, cadet!"
              </p>
            </div>

            {/* Right Side: Mission Journey List */}
            <div className="relative py-4 lg:col-span-1 md:col-span-2">
              {/* Path Header - Web Development */}
              <div className="flex items-center gap-4 mb-8 md:ml-8">
                <div className="md:size-14 size-10 aspect-square rounded-xl bg-blue-saturated flex items-center justify-center border-2 border-black shadow-thick-4 rotate-3">
                  <Code className="md:size-8 size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-black font-black md:text-2xl text-lg leading-none uppercase tracking-tight">
                    Web Development
                  </h3>
                  <p className="text-blue-saturated text-xs font-bold mt-1 uppercase tracking-widest">
                    Career Path
                  </p>
                </div>
              </div>

              {/* Vertical Line */}
              <div className="absolute md:left-[35px] top-24 bottom-6 w-0.5 bg-black/10" />

              <div className="space-y-6">
                {/* Active Mission - System Architecture */}
                <motion.div
                  className="relative md:pl-12 pl-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Status Dot */}
                  <div className="absolute md:left-[28px] -left-2 top-6 w-4 h-4 bg-blue-saturated rounded-full border-2 border-white shadow-[0_0_0_2px_#3771F2] z-10 animate-pulse" />

                  {/* Card */}
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-saturated shadow-[6px_6px_0px_0px_rgba(55,113,242,0.2)] relative group overflow-visible hover:scale-[1.02] transition-transform">
                    {/* Floating Rewards - Encouragement */}
                    <motion.div
                      className="absolute -top-3 -right-3 bg-yellow-main rounded-full p-1.5 border border-black shadow-sm z-20"
                      animate={{ y: [-4, 4, -4], rotate: [-10, 10, -10] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Trophy className="text-black size-5" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-3 -right-2 bg-pink-main text-white text-xs font-bold px-2 py-1 rounded-full border border-black transform rotate-6"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      +50 Gems 💎
                    </motion.div>

                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-blue-saturated uppercase tracking-widest flex items-center gap-1.5">
                        <Brain className="size-3.5 shrink-0" /> System Logic Track
                      </span>
                      <span className="text-[10px] bg-blue-saturated px-2 py-0.5 rounded text-white font-bold">
                        MISSION 1.2
                      </span>
                    </div>

                    <h4 className="text-black font-black text-xl mb-1 flex items-center gap-2 max-md:text-start">
                      HTML Structure
                    </h4>
                    <p className="text-sm text-black/70 mb-4 font-medium max-md:text-start">
                      Build the skeleton of the web.
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-black/60 uppercase">
                        <span>Progress</span>
                        <span>4/10 Challenges</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden border border-black/10">
                          <motion.div
                            className="bg-gradient-to-r from-blue-saturated to-[#A7FADC] h-full rounded-full relative"
                            initial={{ width: 0 }}
                            animate={{ width: "40%" }}
                            transition={{ duration: 1, delay: 0.8 }}
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50" />
                          </motion.div>
                        </div>
                        <span className="text-xs font-black text-blue-saturated">
                          40%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Next Challenge - Locked */}
                <motion.div
                  className="relative md:pl-12 pl-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="absolute md:left-[30px] -left-[3.5px] top-5 w-3 h-3 bg-white rounded-full border-2 border-black/30 z-10" />
                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-black/20 flex items-center gap-4 cursor-not-allowed opacity-70">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-black/10 shadow-sm">
                      <Lock className="size-4 text-black/40" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-0.5">
                        <h4 className="text-black/60 font-bold text-sm max-md:text-start">
                          CSS Styling
                        </h4>
                        <span className="text-[10px] font-bold text-pink-main bg-pink-main/10 px-1.5 rounded h-fit">
                          HARD
                        </span>
                      </div>
                      <p className="text-xs text-black/40 font-medium max-md:text-start">
                        Master the art of design
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Collaboration Squad */}
                <motion.div
                  className="relative md:pl-12 pl-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="absolute md:left-[29px] -left-[5px] top-5 w-3.5 h-3.5 bg-pink-main rounded-full border-2 border-white shadow-[0_0_0_2px_#FF5E73] z-10" />

                  <div className="bg-gradient-to-r from-[#FFF0F3] to-white rounded-xl p-4 border-2 border-pink-main/30 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-black font-bold text-sm flex items-center gap-2 max-md:text-start">
                        <Users className="text-pink-main size-4 shrink-0" />
                        Squad Challenge
                      </h4>
                      <p className="text-[10px] text-black/60 font-bold mt-1 uppercase tracking-wide max-md:text-start">
                        Weekly Collaboration
                      </p>
                    </div>

                    <div className="flex max-sm:flex-col sm:-space-x-2 -space-y-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden"
                        title="Team Member: Pat"
                      >
                        <Image
                          src={avatarTeam1}
                          alt="Pat"
                          className="w-full h-full object-cover"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden"
                        title="Team Member: Alex"
                      >
                        <Image
                          src={avatarTeam2}
                          alt="Alex"
                          className="w-full h-full object-cover"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-main flex items-center justify-center text-[10px] font-bold text-black">
                        +2
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
