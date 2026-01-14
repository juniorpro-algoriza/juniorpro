"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import cloudImg from "@public/landing-pages/clouds.png";
import { motion } from "motion/react";
import { Rocket, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  // * Add children to the return statement if you want to render the page.tsx file for this route.
  children: ReactNode;
  slot: ReactNode;
}

const AuthLayout = ({ slot }: Readonly<AuthLayoutProps>) => {
  return (
    <main className="flex gap-20 items-center justify-center min-h-screen w-full">
      <div className="min-h-screen relative overflow-hidden font-sans flex flex-col items-center justify-center pt-32 pb-12 bg-gradient-to-b from-[#E0F2FF] via-[#C7E4FF] to-blue-main w-full">
        {/* ==================== BACKGROUND ELEMENTS ==================== */}

        {/* Animated Floating Clouds (Same as Landing) */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-48 opacity-90 object-contain z-0"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={cloudImg}
            alt="Cloud"
            className="w-full h-full object-contain"
            quality={30}
          />
        </motion.div>
        <motion.div
          className="absolute top-[15%] right-[5%] w-64 opacity-90 object-contain z-0"
          animate={{ y: [0, -30, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Image
            src={cloudImg}
            alt="Cloud"
            className="w-full h-full object-contain"
            quality={30}
          />
        </motion.div>

        {/* Center Cloud Only */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-48 relative z-10 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={cloudImg}
              alt="Cloud"
              className="w-full h-full object-contain"
              quality={30}
            />
          </motion.div>
        </div>

        {/* ==================== MAIN CONTENT (Card) ==================== */}
        <div className="w-full max-w-md relative z-10 flex flex-col items-center sm:p-10 p-7  bg-white border-[3px] border-black rounded-3xl shadow-thick-8 mx-7 space-y-10">
          {/* Playful Logo */}
          <div>
            <Link href="/home" className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-pink-main to-[#FF8CF1] rounded-2xl border-[3px] border-black flex items-center justify-center shadow-thick-4 relative z-10"
                animate={{ rotate: [0, -5, 5, 0], y: [0, -4, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Rocket
                  size={24}
                  className="text-white transform -rotate-45"
                  fill="white"
                  strokeWidth={2.5}
                />
              </motion.div>

              {/* Decorative Sparkles */}
              <motion.div
                className="absolute -top-3 -right-3 text-yellow-main z-0"
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Sparkles size={20} fill="currentColor" />
              </motion.div>

              <span className="font-black sm:text-4xl text-3xl text-[#0C1335] tracking-tight relative">
                Sawiha
                {/* <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-mint-green-main -z-10 rounded-full"></span> */}
              </span>
            </Link>
          </div>
          {slot}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
