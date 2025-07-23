import { Button, Input } from "@components";
import Image from "next/image";
import { floatingIcons, heroText } from "../config";

export const HeroSection = () => {
  return (
    <section className="px-4 py-16 overflow-hidden">
      {/* Floating Technology Icons */}
      <div className="hidden lg:block">
        {floatingIcons.map((icon, index) => (
          <div
            key={index}
            className={`absolute ${icon.position} p-1.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              unoptimized
              className="w-8 h-8 rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Hero Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[140%] font-semibold text-semi-blue pt-[89px] max-w-4xl mx-auto">
          Connecting Juniorpros with exciting digital products.
        </h1>

        {/* Hero Subtext */}
        <p className="font-medium text-shadowBlue text-xl md:text-2xl pt-5 max-w-4xl mx-auto">
          Expert-designed projects that make learning engaging, safe, and
          effective.
        </p>

        {/* Search Section */}
        <div className="pt-[72px] flex justify-center">
          <div className="relative w-full max-w-xl">
            <Input
              placeholder="Search for projects, skills, or technologies..."
              className="drop-shadow-blue-alpha drop-shadow-md rounded-4xl w-full placeholder-storm-500 py-5 pr-32"
            />
            <Button
              variant="primary"
              className="absolute right-2 top-2 rounded-4xl bg-unitedBlue py-3.5 px-6 hover:bg-opacity-90 transition-all duration-300"
            >
              Find Now
            </Button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="pt-[69px] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 max-w-4xl mx-auto">
          {heroText.map(({ number, text }) => (
            <div
              key={number}
              className="flex flex-col gap-1.5 justify-center items-center hover:transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-3xl md:text-5xl font-bold text-muted-text">
                {number}
              </p>
              <p className="text-sm md:text-lg font-semibold text-center">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
