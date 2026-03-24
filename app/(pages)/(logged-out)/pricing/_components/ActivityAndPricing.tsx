"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Rocket,
  Building,
  Heart,
  Sparkles,
  Check,
  Banknote,
} from "lucide-react";
import { Button } from "@components";

export function ActivityAndPricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <div
      id="pricing"
      className="min-h-screen relative overflow-hidden font-sans text-black"
    >
      <div className="relative z-10 container mx-auto px-6 py-32 max-w-7xl">
        {/* SECTION 1: Space Header + Pricing Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 transform hover:scale-105 hover:-rotate-2 transition-transform">
            <Banknote className="text-pink-main size-5" strokeWidth={3} />
            <span className="text-sm tracking-wide font-black text-black uppercase">
              Flexible Plans
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 tracking-tight text-black drop-shadow-sm text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
            Simple, Transparent Pricing <br />
            Pricing.
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#1F3D8B] font-medium leading-relaxed max-w-3xl mb-12 mx-auto">
            Help them build real skills, gain confidence, and stay motivated
            through structured missions and hands-on challenges.
          </p>
        </motion.div>

        {/* SECTION 2: Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              className="relative group h-full"
            >
              <div
                className={`bg-white rounded-4xl border-[3px] border-black p-6 shadow-thick-8 transition-all duration-300 relative overflow-hidden flex flex-col h-full
                  ${hoveredPlan === plan.id ? "transform -translate-y-2 shadow-thick-12" : ""}`}
              >
                {/* Header Pattern Background */}
                <div
                  className={`absolute top-0 left-0 right-0 h-32 opacity-30 ${plan.bgPattern}`}
                />

                {/* Icon */}
                <div className="relative z-10 mb-6 flex justify-center">
                  <div
                    className="w-20 h-20 rounded-2xl border-[3px] border-black bg-white flex items-center justify-center shadow-thick-4 group-hover:scale-110 transition-transform group-hover:rotate-3"
                    style={{ backgroundColor: plan.color }}
                  >
                    <plan.icon
                      className="text-black size-9"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                {/* Plan Info */}
                <div className="text-center mb-6 relative z-10">
                  <h3 className="text-2xl font-black text-black mb-2 group-hover:text-blue-saturated transition-colors">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <span className="text-4xl font-black text-black">
                      {plan.price}
                    </span>
                    <span className="text-sm font-bold text-black/60">
                      SAR/mo
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#1F3D8B]/70 leading-relaxed min-h-[3rem]">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Capacity Badge */}
                <div className="flex justify-center mb-8 relative z-10">
                  <div className="px-3 py-1 bg-white border-2 border-black rounded-full shadow-thick-2">
                    <span className="text-xs font-black uppercase tracking-wider text-black">
                      {plan.capacity}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 flex-grow relative z-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-mint-green-main border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check strokeWidth={4} className="text-black size-4" />
                      </div>
                      <span className="text-black font-bold leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="relative z-10 mt-auto">
                  <Button
                    intent="mainBlack"
                    size="mainDefault"
                    className="rounded-xl md:text-lg text-base w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
const pricingPlans = [
  {
    id: 1,
    featured: true,
    name: "Free Access",
    subtitle: "Perfect for new Enablers exploring Sawiha.",
    description:
      "Start your Junior's journey with Missions and a 7-day trial of the Growth Plan.",
    icon: Rocket,
    capacity: "1 Junior",
    price: "0",
    color: "#FFE285", // Yellow accent
    bgPattern:
      "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
    features: [
      "Access to 3 Missions (Freemium)",
      "Automatic 7-day full trial of the Growth Plan",
      "Enabler dashboard access",
      "Progress overview for 1 Junior",
    ],
    cta: "Start for Free",
  },
  {
    id: 2,
    name: "Starter Plan",
    subtitle: "For parents who want guided, fun learning.",
    icon: Heart,
    capacity: "1 Junior",
    price: "300",
    color: "#A7FADC", // Mint accent
    bgPattern:
      "bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6),linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6)] [background-position:0_0,10px_10px] [background-size:20px_20px]",
    features: [
      "Full Missions access",
      "Basic Collaborations",
      "1 Enabler Dashboard",
      "Basic Progress Reports",
      "Standard PM Support",
    ],
    cta: "Choose Starter",
  },
  {
    id: 3,
    name: "Growth Plan",
    subtitle: "For families or small education sponsors.",
    icon: Sparkles,
    capacity: "Up to 3 Juniors",
    price: "600",
    color: "#9C7FFF", // Purple accent
    bgPattern:
      "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent",
    features: [
      "Everything in Starter",
      "Advanced Collaborations",
      "Early Access to Challenges",
      "Multi-Junior Dashboard",
      "Priority PM Feedback",
      "Monthly Progress Summary",
    ],
    cta: "Choose Growth",
  },
  {
    id: 4,
    name: "Impact Plan",
    subtitle: "For schools, youth centers, and organizations.",
    icon: Building,
    capacity: "Up to 10 Juniors",
    price: "1400",
    color: "#FF5E73", // Red accent
    bgPattern:
      "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
    features: [
      "All Growth features",
      "Access to all Challenges",
      "Dedicated PM & reporting tools",
      "Custom progress analytics",
      "Certificates & leaderboard visibility",
      "Option for co-branded team Challenges",
    ],
    cta: "Choose Impact",
  },
];
