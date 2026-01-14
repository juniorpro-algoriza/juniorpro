import Ui3D from "@public/images/ui-3d.png";
import API3D from "@public/images/api-3d.png";
import Bug3D from "@public/images/bug-3d.png";
import Code3D from "@public/images/code-3d.png";
import Brain3D from "@public/images/brain-3d.png";
import Server3D from "@public/images/server-3d.png";
import Security3D from "@public/images/security-3d.png";
import Wireframe3D from "@public/images/wireframe-3d.png";
import Deployment3D from "@public/images/deployment-3d.png";
import VersionControl3D from "@public/images/version-control-3d.png";
import { Code, FileText, Video } from "lucide-react";

export const PATH_ICON = {
  "1": Ui3D.src,
  "2": API3D.src,
  "3": Bug3D.src,
  "4": Code3D.src,
  "5": Brain3D.src,
  "6": Server3D.src,
  "7": Security3D.src,
  "8": Wireframe3D.src,
  "9": Deployment3D.src,
  "10": VersionControl3D.src,
};

export const TAG_COLORS = {
  Mission: "bg-dark-blue-main/5 text-dark-blue-main border-dark-blue-main/20",
  Challenge: "bg-[#CC39BC]/5 text-[#CC39BC] border-[#CC39BC]/20",
  Collaboration: "bg-[#D08700]/5 text-[#D08700] border-[#D08700]/20",
};
export const FEATURE_TYPE = {
  1: "Count",
  2: "Boolean",
};
export const REASOUCES_TYPE = {
  1: { title: "Document", icon: FileText },
  2: { title: "Video", icon: Video },
  3: { title: "Article", icon: FileText },
  4: { title: "Exercise", icon: Code },
};
export const MISSION_STATUS = {
  1: "Pending",
  2: "InProgress",
  3: "Completed",
};
export const PATH_STATUS = {
  Draft: 1,
  Completed: 2,
};
export const USER_TYPE = {
  Admin: 1,
  Junior: 2,
  Enabler: 3,
  ProjectManager: 4,
};
