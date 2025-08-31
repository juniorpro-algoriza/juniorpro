import {
  UserManagerIcon,
  UserIcon,
  UsersIcon,
  FolderDetailsIcon,
} from "@icons";

export const cardConfig = {
  Juniors: {
    icon: (
      <UserIcon width="25" height="25" fill="var( --color-violet-normal)" />
    ),
    variant: "base",
  },
  Contributors: {
    icon: (
      <UsersIcon width="25" height="25" fill="var( --color-violet-normal)" />
    ),
    variant: "base",
  },
  "Project Managers": {
    icon: (
      <UserManagerIcon
        width="25"
        height="25"
        fill="var( --color-violet-normal)"
      />
    ),
    variant: "base",
  },
  "Active Projects": {
    icon: (
      <FolderDetailsIcon
        width="25"
        height="25"
        fill="var( --color-violet-normal)"
      />
    ),
    variant: "base",
  },
} as const;
