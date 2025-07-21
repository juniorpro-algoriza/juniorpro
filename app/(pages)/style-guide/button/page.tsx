"use client";

import { Button } from "@components";
import { Star } from "lucide-react";
import { useState } from "react";
import { containerStyle } from "../styles";

type ButtonSize = "small" | "medium" | "large";

const ButtonStylePage = () => {
  const [selectedSize, setSelectedSize] = useState<ButtonSize>("medium");

  const sizeOptions: { value: ButtonSize; label: string }[] = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  return (
    <div className="space-y-8 px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Button Variants & Sizes</h1>
      <p className="text-gray-600">
        Use the dropdown below to change the size of the buttons. The examples
        below showcase the different button variants.
      </p>

      <section className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Button Size
        </label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value as ButtonSize)}
          className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {sizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Examples</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 shadow-sm">
          <div className={`${containerStyle} gap-4 flex-wrap`}>
            <Button intent="primary" size={selectedSize}>
              Primary
            </Button>
            <Button intent="secondary" size={selectedSize}>
              Secondary
            </Button>
            <Button intent="tertiary" size={selectedSize}>
              Tertiary
            </Button>
            <Button intent="destructive" size={selectedSize}>
              Destructive
            </Button>
            <Button intent="primary" size={selectedSize} icon={<Star />}>
              Icon Left
            </Button>

            <Button
              size={selectedSize}
              intent="primary"
              icon={<Star />}
              iconPosition="left"
            >
              Icon right
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonStylePage;
