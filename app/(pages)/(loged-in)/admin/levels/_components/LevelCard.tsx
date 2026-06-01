"use client";

import React from "react";
import { MainCard, ModalLink } from "@components";
import Image from "next/image";
import { Edit2, Zap, EllipsisVertical, Users } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { components } from "../../../../../../api-schema";

type Level =
  components["schemas"]["Sawiha.Services.DTO.LevelFeatureModel.GetAll.GetAdminLevelModel"];

export const LevelCard = ({ level }: { level: Level }) => {
  return (
    <MainCard classname="relative flex flex-col items-center p-6 rounded-[32px] bg-white border border-gray-100">
      <Menu>
        <MenuButton className="absolute top-4 right-4 z-10 p-2 cursor-pointer focus-visible:outline-0 rounded-full hover:bg-gray-100 transition-colors">
          <EllipsisVertical className="text-gray-500 size-5" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="w-48 bg-white border border-gray-200 rounded-2xl focus-visible:outline-0 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] flex flex-col py-2 px-1 z-50 mt-1"
        >
          <MenuItem>
            <div className="data-focus:bg-gray-50 rounded-xl">
              <ModalLink
                name="CreateEditLevel"
                query={{ levelId: level.id ?? 0 }}
              >
                <div className="w-full text-left flex items-center gap-3 py-2.5 px-3 cursor-pointer text-gray-600 font-medium text-[15px]">
                  <Edit2 className="size-5 text-gray-500" strokeWidth={2} />
                  Edit
                </div>
              </ModalLink>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>

      <div className="flex flex-col items-center text-center w-full mt-2">
        <div className="relative mb-6">
          <div className="relative p-2 bg-white rounded-full">
            {level.imageUrl ? (
              <Image
                src={level.imageUrl}
                alt={`Level ${level.number} Badge`}
                width={120}
                height={120}
                className="w-28 h-28 object-contain"
                unoptimized
              />
            ) : (
              <div className="w-28 h-28 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Zap className="size-10" />
              </div>
            )}
          </div>
        </div>

        <h3 className="text-[22px] font-bold text-gray-800 mb-2">
          Level {level.number}
        </h3>

        <div className="flex items-center gap-1.5 mb-6 text-[15px]">
          <span className="font-bold text-blue-main">
            {level.xpToNextLevel?.toLocaleString()} XP
          </span>
          <span className="text-gray-500 font-medium">requires to earn</span>
        </div>

        <div className="w-full border-t border-gray-100/80 pt-5 mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900 font-semibold text-[15px]">
            <Users className="size-5 text-blue-main" />
            <span>{level.juniors}</span>
          </div>
          <span className="text-gray-500 text-sm font-medium">
            juniors earned
          </span>
        </div>
      </div>
    </MainCard>
  );
};
