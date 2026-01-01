"use client";
import React from "react";
import { components } from "../../../../../../api-schema";
import { Button, MainCard, ModalLink, Skeleton } from "@components";
import { UserCard } from "@components/client";
import { UserPlus } from "lucide-react";
import { useJuniorsData } from "../../tanstack";

type JuniorOfEnablerModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorModels.JuniorOfEnablerModel"];

export const JuniorsCards = () => {
  const { data: juniorResponse, isLoading } = useJuniorsData();
  const juniorsData = juniorResponse?.data;
  console.log(juniorsData);

  if (isLoading) {
    return (
      <div className="xl:w-4/5">
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 xl:gap-5 gap-2 ">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="xl:w-4/5">
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 xl:gap-5 gap-2 ">
        {juniorsData?.map((junior: JuniorOfEnablerModel, index: number) => (
          <MainCard
            key={index}
            classname="space-y-5 hover:scale-102 transition-all"
          >
            <UserCard
              firstName={junior.name || "John"}
              level={1}
              xp={junior.points || 1250}
              userType={2}
              gender="male"
              userDetails={{
                levelProgress: 50,
                points: junior.points || 1250,
                badges: 0,
                dayStreak: 0,
              }}
            />
            {/* <Button intent="main2" size="mainDefault" className="w-full">
              View Progress
            </Button> */}
          </MainCard>
        ))}
        <ModalLink name="AddJuniors">
          <MainCard classname="space-y-5 border-dashed border-2 shadow-0 bg-[#F5F6F8] border-gray-200 h-[400px] min-h-full flex items-center justify-center flex-col cursor-pointer hover:scale-102 transition-all">
            <div className="p-6 text-gray-400 rounded-full bg-white w-fit">
              <UserPlus strokeWidth={1.5} size={32} />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xl font-bold">Empty Seat</p>
              <p className="text-gray-500 text-center">Assign to a junior</p>
            </div>
            <div className="bg-success-100 text-success-700 px-6 py-1.5 rounded-full text-sm font-bold">
              Available
            </div>
            <div className="pt-4 w-full flex items-center justify-center">
              <Button intent="main" size="mainDefault" className="w-4/5">
                Add Junior
              </Button>
            </div>
          </MainCard>
        </ModalLink>
      </div>
      {/* {juniorsData?.length === 0 && <EmptyData title="No Juniors Found" />} */}
    </div>
  );
};
