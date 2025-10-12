import {
  CalendarCodeIcon,
  ClockIcon,
  CalendarIcon,
  CheckMarkIcon,
} from "@icons";
import Image from "next/image";
import { Button } from "./Button";

export const ProjectDetails = () => {
  return (
    <div className="px-20 py-8">
      <h1 className="font-medium text-3xl mb-8">HTML & CSS Basics</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* project image */}
        <div className="col-span-3 space-y-6">
          <Image
            className="w-full rounded-xl"
            src="/images/projectDetailsImage.svg"
            width={500}
            height={500}
            alt="project image"
          />
          <div className="flex gap-1 items-center">
            <p className="text-[#5879DC] bg-[#ECF4FF] py-1 px-4 rounded-4xl font-medium text-sm">
              Web Development
            </p>
            <p className="text-[#DF972A] bg-[#FCF4E8] py-1 px-4 rounded-4xl font-medium text-sm">
              In Progress
            </p>
            <p className="text-[#EB5757] bg-[#FCE6E6] py-1 px-4 rounded-4xl font-medium text-sm">
              Waiting
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#F2F4F5]">
            <h2 className="font-medium text-2xl mb-2">Summary</h2>
            <p className="text-[#717377] text-xl">
              This introductory project guides you through creating your first
              webpage using HTML and CSS. You'll learn about HTML tags, page
              structure, and basic styling with CSS. Perfect for absolute
              beginners!
            </p>
          </div>
          <div>
            <h2 className="font-medium text-2xl mb-2">Project Tasks</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl flex p-4 gap-6 items-center border border-[#F0F0F0] drop-shadow-md">
                <p className="w-12 h-12 rounded-full bg-[#E3F7EC] flex items-center justify-center font-medium text-xl text-[#737F8E]">
                  1
                </p>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-xl text-[#626C83]">
                    Purchased Standard Points Bundle
                  </p>
                  <div className="flex gap-2 items-center text-[#626C83]">
                    <p className="flex gap-2 items-center">
                      <CalendarIcon /> Due: 2025-06-15
                    </p>
                    <p className="flex gap-2 items-center">
                      <ClockIcon /> 00:30 Min
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl flex p-4 gap-6 items-center border border-[#F0F0F0] drop-shadow-md">
                <p className="w-12 h-12 rounded-full bg-[#E3F7EC] flex items-center justify-center font-medium text-xl text-[#737F8E]">
                  2
                </p>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-xl text-[#626C83]">
                    Purchased Standard Points Bundle
                  </p>
                  <div className="flex gap-2 items-center text-[#626C83]">
                    <p className="flex gap-2 items-center">
                      <CalendarIcon /> Due: 2025-06-15
                    </p>
                    <p className="flex gap-2 items-center">
                      <ClockIcon /> 00:30 Min
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl flex p-4 gap-6 items-center border border-[#F0F0F0] drop-shadow-md">
                <p className="w-12 h-12 rounded-full bg-[#E3F7EC] flex items-center justify-center font-medium text-xl text-[#737F8E]">
                  3
                </p>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-xl text-[#626C83]">
                    Purchased Standard Points Bundle
                  </p>
                  <div className="flex gap-2 items-center text-[#626C83]">
                    <p className="flex gap-2 items-center">
                      <CalendarIcon /> Due: 2025-06-15
                    </p>
                    <p className="flex gap-2 items-center">
                      <ClockIcon /> 00:30 Min
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* project details */}
        <div className="col-span-2 bg-white border text-[#40444C] border-[#F0F0F0] rounded-xl p-4 space-y-3 h-fit drop-shadow-md">
          <div className="flex gap-1 items-center">
            <p className="text-[#7E8CA0] bg-[#EEF0F3] py-1 px-4 rounded-4xl font-medium">
              Solo
            </p>
            <p className="text-[#41C980] bg-[#ECFAF2] py-1 px-4 rounded-4xl font-medium">
              Free
            </p>
          </div>
          <div className="pb-6 border-b border-[#E2E6EE]">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-3">
                <ClockIcon />
                Estimated Time
              </p>
              <p className="pl-0.5 font-medium text-xl">2-3 hours</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-3">
                <CalendarCodeIcon />
                Tools Needed
              </p>
              <p className="pl-0.5 font-medium text-xl">Any web browser</p>
              <p className="pl-0.5 font-medium text-xl">
                Text editor (recommendations provided)
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-3">
              <CalendarIcon />
              Skills You'll Practice
            </p>
            <p className="flex items-center gap-3 text-[#626C83]">
              <CheckMarkIcon /> No expiration date
            </p>
            <p className="flex items-center gap-3 text-[#626C83]">
              <CheckMarkIcon />
              Allocate to any junior
            </p>
          </div>
          <Button className="w-full h-12" intent="primary">
            Start Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};
