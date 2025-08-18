import { StatCardVariant } from "../(pages)/(loged-in)/types/StatCardType";

export const statCardStyles: Record<
  StatCardVariant,
  {
    border: string;
    bg: string;
    valueColor: string;
    labelColor: string;
    labelSize: string;
    valueSize: string;
    valueWeight: string;
    labelWeight: string;
    iconBg: string;
    iconColor: string;
    iconBgSize: string;
    iconSize: string;
    iconRadius: string;
  }
> = {
  blue: {
    border: "border border-[#E2E6EE]",
    bg: "bg-[#EEF2FF]",
    valueColor: "text-[#5879DC]",
    labelColor: "text-[#626C83]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[#DBE4FF]",
    iconColor: "text-[#5879DC]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  red: {
    border: "border border-[#E2E6EE]",
    bg: "bg-[#FDEEEE]",
    valueColor: "text-[#EB5757]",
    labelColor: "text-[#626C83]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[#FCE6E6]",
    iconColor: "text-[#D44E4E]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  green: {
    border: "border border-[#E2E6EE]",
    bg: "bg-[#72DC6017]",
    valueColor: "text-[#3BB573]",
    labelColor: "text-[#626C83]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[#E3F7EC]",
    iconColor: "text-[#41C980]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  orange: {
    border: "border border-[#E2E6EE]",
    bg: "bg-[#FCF4E8]",
    valueColor: "text-[#DF972A]",
    labelColor: "text-[#626C83]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-orange-100",
    iconColor: "text-[#DF972A]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  gray: {
    border: "border border-[#E2E6EE]",
    bg: "bg-[#F2F4F5]",
    valueColor: "text-[#3A3A3A]",
    labelColor: "text-[#626C83]",
    labelSize: "text-xl",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[#ECEEF0]",
    iconColor: "text-[#66717E]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
  base: {
    border: "border border-[#E2E6EE]",
    bg: "bg-white",
    valueColor: "text-black",
    labelColor: "text-black",
    labelSize: "text-[16px]",
    valueSize: "text-[32px]",
    valueWeight: "font-medium",
    labelWeight: "font-medium",
    iconBg: "bg-[#58A8DC]/[0.12]",
    iconColor: "text-[#5879DC]",
    iconBgSize: "w-10 h-10",
    iconSize: "w-6 h-6",
    iconRadius: "rounded-[8px]",
  },
};
