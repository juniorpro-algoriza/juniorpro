import avatarBoy1 from "@public/landing-pages/avatar-team-1.png";
import avatarGirl from "@public/landing-pages/sarah-avatar.png";
import avatarBoy2 from "@public/landing-pages/avatar-team-2.png";

export type CollaborationProjectIconKey =
  | "ShoppingCart"
  | "Gamepad2"
  | "Recycle";

export type CollaborationTeam = {
  id: string;
  name: string;
  projectType: string;
  description: string;
  roles: string[];
  members: number;
  maxMembers: number;
  leadAvatarSrc: string;
  projectIconKey: CollaborationProjectIconKey;
  funding: string;
  color: string;
  tags: string[];
};

export const TEAMS: CollaborationTeam[] = [
  {
    id: "team-nebula",
    name: "Team Nebula",
    projectType: "E-commerce",
    description: "Building a marketplace for trading digital space artifacts.",
    roles: ["Frontend Dev", "UI Designer"],
    members: 3,
    maxMembers: 5,
    leadAvatarSrc: avatarGirl.src,
    projectIconKey: "ShoppingCart",
    funding: "500 SAR",
    color: "#9C7FFF",
    tags: ["Marketplace", "React"],
  },
  {
    id: "pixel-pioneers",
    name: "Pixel Pioneers",
    projectType: "Game Dev",
    description: "Creating a retro-style platformer game for the web.",
    roles: ["Game Dev", "UI UX Designer"],
    members: 2,
    maxMembers: 4,
    leadAvatarSrc: avatarBoy1.src,
    projectIconKey: "Gamepad2",
    funding: "300 SAR",
    color: "#FF5E73",
    tags: ["Gaming", "Phaser"],
  },
  {
    id: "eco-guardians",
    name: "Eco Guardians",
    projectType: "Mobile App",
    description: "An app to track and gamify daily recycling habits.",
    roles: ["Mobile Dev", "QA Tester"],
    members: 4,
    maxMembers: 6,
    leadAvatarSrc: avatarBoy2.src,
    projectIconKey: "Recycle",
    funding: "750 SAR",
    color: "#A7FADC",
    tags: ["Sustainability", "React Native"],
  },
];
