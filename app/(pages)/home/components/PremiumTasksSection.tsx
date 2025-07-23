import rightBlueArrow from "@public/images/right-blue-arrow.png";
import { Sparkles, Star } from "lucide-react";
import Image from "next/image";

export const PremiumTasksSection = () => {
  return (
    <section className="px-4 py-16 sm:py-20 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-start">
          {/* Left Column - Dashboard Visual */}
          <div className="relative order-2 lg:-order-1">
            {/* Main Dashboard Container */}
            <div className="bg-white rounded-3xl p-6 drop-shadow-2xl max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 relative">
              <h3 className="text-lg font-semibold text-gray-800 pb-3">
                Daily Snapshot
              </h3>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                {/* Left Side - Stats */}
                <div className="space-y-4 flex-1">
                  {/* Total Hours Card */}
                  <div className="bg-gray-100 rounded-2xl p-4 w-full max-w-[10rem]">
                    <p className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">
                      3.2
                    </p>
                    <p className="text-sm">Total Hours</p>
                  </div>

                  {/* Juniors Card */}
                  <div className="bg-gray-100 rounded-2xl p-4 w-full max-w-[10rem]">
                    <p className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">
                      400
                    </p>
                    <p className="text-sm">Juniors</p>
                  </div>
                </div>

                {/* Right Side - Donut Chart */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 42 42"
                  >
                    <circle
                      cx="21"
                      cy="21"
                      r="15.5"
                      fill="none"
                      stroke="#fef3e2"
                      strokeWidth="6"
                    />
                    <circle
                      cx="21"
                      cy="21"
                      r="15.5"
                      fill="none"
                      stroke="#fed7aa"
                      strokeWidth="6"
                      strokeDasharray="30 67"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="21"
                      cy="21"
                      r="15.5"
                      fill="none"
                      stroke="#fb923c"
                      strokeWidth="6"
                      strokeDasharray="25 72"
                      strokeDashoffset="-30"
                    />
                    <circle
                      cx="21"
                      cy="21"
                      r="15.5"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="6"
                      strokeDasharray="20 77"
                      strokeDashoffset="-55"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Premium Tasks Badge */}
            <div className="absolute -bottom-24 sm:-bottom-28 left-1/2 sm:left-1/4 transform -translate-x-1/2 sm:translate-x-0 lg:-left-8 bg-white rounded-xl w-fit px-6 sm:px-12 py-3 sm:py-4 drop-shadow-xl border border-gray-100 flex items-center gap-2 text-center sm:text-left">
              <div className="rounded flex items-center justify-center">
                <Star className="text-yellow-600" />
              </div>
              <span className="text-base sm:text-lg font-medium text-yellow-600">
                Premium Tasks
              </span>
            </div>

            {/* Decorative Elements */}
            <div className="hidden sm:block absolute -bottom-8 left-6 lg:-left-12 text-gray-200">
              <Sparkles size={40} />
            </div>
            <div className="hidden sm:block absolute -bottom-10 right-20 text-gray-200">
              <Sparkles size={40} />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 text-center lg:text-left px-2">
            <div>
              <p className="text-lg font-bold text-unitedBlue mb-2 sm:mb-4">
                Premium Tasks
              </p>
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-muted-text mb-4 sm:mb-6">
                Unlock More by Completing Premium Tasks
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-lg sm:text-xl text-muted-text">
                Ready to go further?
              </h4>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md sm:max-w-lg mx-auto lg:mx-0">
                Complete at least 3 premium projects to level up your learning
                and unlock team collaboration.
              </p>
            </div>

            <button className="font-bold text-base sm:text-lg text-unitedBlue flex gap-1.5 sm:gap-2 items-center hover:gap-3 transition-all duration-300 group mx-auto lg:mx-0">
              <span>Explore Premium Tasks</span>
              <Image
                src={rightBlueArrow}
                alt="Arrow"
                unoptimized
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
