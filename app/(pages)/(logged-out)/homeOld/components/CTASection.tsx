"use client";
import { Button } from "@components";
import AboutUsImage from "@public/images/aboutus 1.svg";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export const CTASection = () => {
  const [loading, setLoading] = useState(false);
  const userType = Number(Cookies.get("user_type") || 0);
  const routes = {
    0: "auth/login",
    1: "admin/projects",
    2: "junior/projects",
    3: "contributor/projects",
    4: "project/manger/projects",
  };

  const handleBrowseProjects = () => {
    console.log(userType);
    setLoading(true);
    const target = routes[userType as keyof typeof routes] || "/auth/login";
    redirect(target);
  };
  return (
    <section className="px-4 pt-16 bg-orange-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="font-medium text-[32px] leading-tight">
                Ready to Start Your Tech Journey?
              </h2>
              <p className="text-xl md:text-2xl text-shadowBlue leading-relaxed">
                Join thousands of juniors who are building their future in
                technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link href="auth/sign-up">
                <Button variant="primary" size="large">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="tertiary"
                type="button"
                iconPosition="right"
                size="large"
                onClick={handleBrowseProjects}
                disabled={loading}
                icon={<ChevronRight />}
                className="bg-transparent text-violet-normal border-none hover:bg-transparent"
              >
                Browse Project
              </Button>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex justify-center">
            <Image src={AboutUsImage} alt="About US" />
          </div>
        </div>
      </div>
    </section>
  );
};
