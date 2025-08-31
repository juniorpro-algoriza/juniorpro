import { DocumentValidationIcon } from "@icons";
import { UserIcon, WalletIcon, CalendarIcon } from "@icons";

export const config = {
  "Active Juniors": {
    icon: (
      <UserIcon width="25" height="25" fill="var(--color-success-normal)" />
    ),
    variant: "green",
  },
  Wallet: {
    icon: <WalletIcon width="25" height="25" fill="#D44E4E" />,
    variant: "red",
  },
  "Today's Sessions": {
    icon: (
      <CalendarIcon width="25" height="25" fill="var(--color-violet-normal)" />
    ),
    variant: "blue",
  },
  "Waiting List": {
    icon: (
      <DocumentValidationIcon
        width="25"
        height="25"
        fill="var(--color-storm-600)"
      />
    ),
    variant: "gray",
  },
} as const;
