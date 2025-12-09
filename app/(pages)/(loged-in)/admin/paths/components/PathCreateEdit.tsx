import {
  Button,
  Input,
  MainCard,
  ModalLink,
  PATH_ICON,
  Textarea,
} from "@components";
import Image from "next/image";
import React, { Suspense } from "react";
import { ArrowRight, PanelsTopLeft, Plus } from "lucide-react";

export const PathCreateEdit = () => {
  return (
    <div className="xl:max-w-4/5 space-y-5">
      <form className="flex max-md:flex-col w-full gap-5" id="pathForm">
        <MainCard classname=" flex-1 ">
          <Input
            label="Path Name"
            name="pathName"
            placeholder="e.g., Full Stack Wizardry"
          />
          <Textarea
            label="Description"
            name="description"
            placeholder="e.g., Learn the fundamentals of web development and build your first full-stack application."
          />
        </MainCard>
        <MainCard classname=" space-y-4 xl:min-w-[350px] min-w-[250px]">
          <p className="text-sm text-midnight">
            Path Icon
            <span className="px-2 py-1 rounded-lg text-13 bg-gray-50 ms-3">
              Select One
            </span>
          </p>
          <div className="grid xl:grid-cols-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-7 grid-cols-5 sm:gap-4 gap-2">
            {Object.entries(PATH_ICON).map(([key, value]) => (
              <label key={key} className="cursor-pointer">
                <input
                  type="radio"
                  name="pathIcon"
                  value={key}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center border rounded-3xl aspect-square p-2 transition-all border-gray-100 hover:border-gray-300 peer-checked:border-blue-main peer-checked:bg-blue-main/10">
                  <Image src={value} alt={key} width={40} height={40} />
                </div>
              </label>
            ))}
          </div>
        </MainCard>
      </form>
      <MainCard classname=" space-y-5">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <p className="text-sm text-midnight">
            Learning Journey
            <span className="px-2 py-1 rounded-lg text-13 bg-blue-main/15 text-blue-main ms-3">
              0 Missions
            </span>
          </p>
          <Suspense fallback={null}>
            <ModalLink name="CreateEditMission">
              <Button intent="main" size="mainDefault">
                <Plus className="size-4" />
                Add Mission
              </Button>
            </ModalLink>
          </Suspense>
        </div>
        <MainCard classname=" bg-[#F9FAFB80] place-items-center space-y-2">
          <div className="flex items-center justify-center border border-gray-200 text-gray-600 p-3 rounded-full w-fit">
            <PanelsTopLeft />
          </div>
          <p className="font-bold text-lg text-gray-600">Your path is empty</p>
          <p className="text-sm text-gray-600">
            Add your first mission to get started
          </p>
        </MainCard>
      </MainCard>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Button intent="main" size="mainDefault">
          Cancel
        </Button>
        <Button intent="main2" size="mainDefault" type="submit" form="pathForm">
          Create Path
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
