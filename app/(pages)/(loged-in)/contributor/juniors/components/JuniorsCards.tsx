import React from "react";
import { components } from "../../../../../../api-schema";
import { getJuniorsData } from "../../server";
import { Button, MainCard, ModalLink } from "@components";
import { UserCard } from "@components/client";
import { UserPlus } from "lucide-react";
type JuniorOfEnablerModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorModels.JuniorOfEnablerModel"];
export const JuniorsCards = async () => {
  const juniorsData = (await getJuniorsData()).data;

  return (
    <div className="xl:w-4/5">
      <div className="grid xl:grid-cols-3 xl:gap-5 gap-2 ">
        {juniorsData?.map((junior: JuniorOfEnablerModel, index: number) => (
          <MainCard key={index} classname="space-y-5 hover:scale-102 transition-all">
            <UserCard
              firstName={junior.name?.split(" ")[0] || "John"}
              lastName={junior.name?.split(" ").slice(1).join(" ") || "Doe"}
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
            <Button intent="main2" size="mainDefault" className="w-full">
              View Progress
            </Button>
          </MainCard>
        ))}
        <ModalLink name="AddJuniors">
          <MainCard classname="space-y-4 border-dashed shadow-0 border-gray-300 h-[400px] min-h-full flex items-center justify-center flex-col cursor-pointer hover:scale-102 transition-all">
            <div className="p-6 text-gray-400 rounded-full bg-gray-50 w-fit">
              <UserPlus />
            </div>
            <p className="text-xl font-semibold">Empty Seat</p>
            <p className="text-gray-600 text-center">Assign to a junior</p>
          </MainCard>
        </ModalLink>
      </div>
      {/* {juniorsData?.length === 0 && <EmptyData title="No Juniors Found" />} */}
    </div>
  );
};
