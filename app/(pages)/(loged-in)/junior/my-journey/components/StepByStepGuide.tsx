"use client";
import { MainCard } from "@components";
import { cx } from "@lib";
import { ChevronDown, CircleCheck } from "lucide-react";
import React from "react";
import LambImage from "@public/images/lamb.png";
import ExperimentImage from "@public/images/experiment.png";
import HandRisingImage from "@public/images/hand-rising.png";
import Image from "next/image";
export const StepByStepGuide = () => {
  const [open, setOpen] = React.useState(0);

  return (
    <div className="space-y-4">
      {guide.map((item) => (
        <MainCard
          key={item.number}
          classname="border border-gray-100 p-0"
          isAnimated
        >
          {/* Header */}
          <div
            className="flex items-center justify-between gap-3 p-5 cursor-pointer"
            onClick={() =>
              setOpen((prev) => (prev === item.number ? 0 : item.number))
            }
          >
            <div className="flex items-center gap-4">
              <div className="size-8  min-w-8 rounded-full bg-[#E0E7FF] border border-[#C6D2FF] flex items-center justify-center text-sm font-bold">
                {item.number}
              </div>
              <div>
                <h3 className="md:text-lg text-base font-bold">{item.title}</h3>
                <p className="md:text-sm text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>

            <ChevronDown
              className={cx(
                "min-w-5 size-5 text-gray-600 transition-all duration-300",
                open === item.number ? "rotate-180" : ""
              )}
            />
          </div>

          {/* Body */}
          {open === item.number && (
            <div className="p-5 border-t border-gray-100 space-y-5">
              <p className="text-sm text-gray-600">{item.details}</p>

              <pre className="text-sm p-5 rounded-2xl border border-gray-100 bg-gray-50 overflow-x-auto">
                {item.code}
              </pre>
            </div>
          )}
        </MainCard>
      ))}

      {/* Success Criteria */}
      <MainCard>
        <h2 className="text-lg font-bold">Success Criteria</h2>
        <div className="grid md:grid-cols-2 gap-3 mt-5">
          {successCriteria.map((item, i) => (
            <div key={i} className="text-gray-600 flex items-center gap-2">
              <CircleCheck fill="#009966" className=" shrink-0 size-6 text-white" />
              {item}
            </div>
          ))}
        </div>
      </MainCard>

      {/* Tips From Your Mentor */}
      <MainCard>
        <h2 className="text-lg font-bold">Tips From Your Mentor</h2>
        {tips.map((item, i) => (
          <div key={i} className="flex items-center gap-5 mt-5">
            <Image src={item.image} alt={item.title} width={24} height={24} />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </MainCard>
    </div>
  );
};
const guide = [
  {
    number: 1,
    title: "Setup & HTML Structure",
    desc: "Create the skeleton of your calculator",
    details:
      "Start by creating your index.html file. You'll need a container for the calculator and buttons for digits 0-9 and operations.",
    code: `<div class="calculator">
  <div class="display">0</div>
  <!-- Add buttons here -->
</div>`,
  },
  {
    number: 2,
    title: "Basic Styling",
    desc: "Add CSS to shape your calculator layout",
    details:
      "Create a style.css file and begin defining the appearance of the calculator. Set up grid layout for buttons and style the display area.",
    code: `.calculator {
  width: 280px;
  padding: 20px;
  border-radius: 12px;
  background: #222;
  display: grid;
  gap: 10px;
}`,
  },
  {
    number: 3,
    title: "JavaScript Logic",
    desc: "Program the calculator functionality",
    details:
      "In your script.js file, add event listeners to the buttons and build functions to perform arithmetic operations and update the display.",
    code: `const display = document.querySelector('.display');
let current = '';

function press(value) {
  current += value;
  display.textContent = current;
}`,
  },
];
const successCriteria = [
  "Code runs without errors",
  "Calculator performs all basic math operations",
  "Clear button resets the state",
  "Clean and readable code",
];
const tips = [
  {
    image: LambImage.src,
    title: "Take Your Time",
    desc: "There's no rush! Pause videos, rewind, and rewatch as many times as you need. Learning is a journey, not a race.",
  },
  {
    image: ExperimentImage.src,
    title: "Experiment and Break Things",
    desc: "The best way to learn is by trying! Don't be afraid to experiment with the code and see what happens.",
  },
  {
    image: HandRisingImage.src,
    title: "Ask for Help Anytime",
    desc: 'Stuck on something? Use the "Get Help" tab to ask a mentor. We\'re here to support you every step of the way!',
  },
];
