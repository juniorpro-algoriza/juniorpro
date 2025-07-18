import { Button, Input } from "@components";
import bgGraphic from "@public/images/bg-graphic.png";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import greenCheckMark from "@public/images/green-check-mark.png";
import rightBlueArrow from "@public/images/right-blue-arrow.png"

const heroText = [
  {
    number: "1K+",
    text: "Projects Available",
  }, {
    number: "5K+",
    text: "Active Students",
  },
  {
    number: "200+",
    text: "Expert Mentors",
  },
  {
    number: "4.9/5",
    text: "Student Rating",
  }
]

const heroSteps = ["Complete your first task", "Complete your second task", "Complete your third task", "Complete your fourth task", "Complete your fifth task"];

const HomePage = () => {
  return (
    <main className="px-4">
      <div className="bg-linear-to-b fixed from-light-blue to-white inset-0 -z-10">
      </div>
      <h1 className="text-5xl leading-[120%] font-semibold text-semi-blue text-center pt-[89px] xl:w-[660px] mx-auto">Connecting Juniorpros with exciting digital products.</h1>
      <p className="font-medium text-shadowBlue text-center text-2xl pt-5">Expert-designed projects that make learning engaging, safe, and effective.</p>
      <section className="pt-[72px] flex justify-center">
        <div className="relative">
          <Input placeholder="Search for projects, skills, or technologies..." className="drop-shadow-blue-alpha drop-shadow-md rounded-4xl w-[60vw] xl:w-[42vw] placeholder-storm-500 py-5" />
          <Button variant="primary" className="absolute right-0 top-0 mt-2 mr-2 rounded-4xl xl:w-[118px] bg-unitedBlue py-3.5 px-6">
            Find Now
          </Button>
        </div>
      </section>
      <section className="pt-[69px] flex justify-center gap-20">
        {heroText.map(({ number, text }) => {
          return (
            <div key={number} className="flex flex-col gap-1.5 justify-center items-center">
              <p className="text-5xl font-bold">
                {number}
              </p>
              <p className="text-lg font-semibold">
                {text}
              </p>
            </div>
          )
        })}

      </section>
      <section className="pt-20 flex justify-center flex-col gap-3.5">
        <p className="text-lg text-unitedBlue text-center">How it works</p>
        <p className="font-bold text-5xl text-center text-muted-text">How JuniorPro Works</p>
      </section>
      <section className="pt-36 flex flex-col xl:flex-row justify-center gap-28">
        <div>
          <p className="text-lg font-bold text-unitedBlue ">Free Projects</p>
          <p className="font-bold text-5xl leading-14 xl:w-[521px] text-muted-text">Start building your skills with our collection of free solo projects</p>
          <p className="w-[521px] font-lg text-muted-text pt-4">Build your tech skills by completing at least 5 free solo projects. These beginner-friendly tasks are your first step into the world of technology.</p>
          <p className="font-bold text-lg text-unitedBlue flex gap-1 items-center">
            <span>Start Free Tasks</span>
            <Image src={rightBlueArrow} alt="" unoptimized className="w-3.5 h-3.5" />
          </p>
        </div>
        <div className="relative flex xl:block items-center justify-center">
          <Image src={bgGraphic} alt="" className="w-[455px] h-[467px]" />
          <div className="absolute inset-0 space-y-5 flex xl:block items-center justify-center flex-col">
            {heroSteps.map((step, index) => {
              return (
                <div key={step} className={twMerge("w-full xl:w-fit relative py-6 px-5 rounded-2xl bg-white drop-shadow-2xl flex gap-2.5", index % 2 === 0 ? "xl:mr-auto" : "xl:ml-auto")}>
                  <div className="absolute -right-[10px] -top-[5px] xl:-right-[20px] xl:-top-[10px] flex flex-col justify-center items-center bg-light-red px-2 py-1 rounded-lg text-xs">
                    <span className="text-bright-red">
                      {index + 1}
                    </span>
                    <span className="text-muted-text">
                      task
                    </span>
                  </div>
                  <Image src={greenCheckMark} unoptimized alt="" className="w-6 h-6" />
                  {step}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
