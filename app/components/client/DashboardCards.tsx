import Image from "next/image";

import { MainCard } from "@components";

export const DashboardCards = ({
  cardsData,
}: {
  cardsData: {
    label: string;
    value: string;
    subtext: string;
    subtextColor: string;
    icon: string;
    id?: string;
  }[];
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6 gap-4">
        {cardsData.map((card, index) => (
          <div id={card?.id || undefined} key={index}>
            <MainCard classname="relative">
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <Image
                    src={card.icon}
                    alt={card.label}
                    width={48}
                    height={48}
                    className="h-12 w-auto"
                  />
                  <p className="font-bold text-2xl">{card.value}</p>
                </div>
                <p className="text-gray-600">{card.label}</p>
                <p className={`text-13 ${card.subtextColor}`}>{card.subtext}</p>
              </div>
              <Image
                src={card.icon}
                alt={card.label}
                width={100}
                height={100}
                className="size-28 absolute top-1/2 -translate-y-1/2 right-0 opacity-5"
              />
            </MainCard>
          </div>
        ))}
      </div>
    </div>
  );
};
