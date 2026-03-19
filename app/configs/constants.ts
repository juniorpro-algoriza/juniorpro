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
export const ACCESS_COST_OPTIONS = [
  { label: "Free", value: "1" },
  { label: "Points", value: "2" },
  { label: "Subscription", value: "3" },
];

// ChallengeParticipantStatus: Joined = 1, UnderReview = 2, Completed = 3
export const CHALLENGE_PARTICIPANT_STATUS = {
  JOINED: 1,
  UNDER_REVIEW: 2,
  COMPLETED: 3,
} as const;

export const CHALLENGE_PARTICIPANT_STATUS_CONFIG: Record<
  number,
  { label: string; className: string }
> = {
  [CHALLENGE_PARTICIPANT_STATUS.JOINED]: {
    label: "Joined",
    className: "bg-gray-100 text-gray-600",
  },
  [CHALLENGE_PARTICIPANT_STATUS.UNDER_REVIEW]: {
    label: "Under Review",
    className: "bg-amber-50 text-amber-600",
  },
  [CHALLENGE_PARTICIPANT_STATUS.COMPLETED]: {
    label: "Completed",
    className: "bg-green-50 text-green-600",
  },
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

/**
 * Collaboration Enums - Matches backend C# enums
 */

// CollaborationStatus: Draft = 1, Ready = 2, Inprogress = 3, Completed = 4
export const COLLABORATION_STATUS = {
  DRAFT: 1,
  READY: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
} as const;

export const COLLABORATION_STATUS_LABELS = {
  [COLLABORATION_STATUS.DRAFT]: "Draft",
  [COLLABORATION_STATUS.READY]: "Ready to Start",
  [COLLABORATION_STATUS.IN_PROGRESS]: "In Progress",
  [COLLABORATION_STATUS.COMPLETED]: "Completed",
} as const;

// CollaborationRoleJuniorStatus: Pending = 1, Accepted = 2, Rejected = 3
export const JUNIOR_STATUS = {
  PENDING: 1,
  ACCEPTED: 2,
  REJECTED: 3,
} as const;

export const JUNIOR_STATUS_LABELS = {
  [JUNIOR_STATUS.PENDING]: "Pending",
  [JUNIOR_STATUS.ACCEPTED]: "Accepted",
  [JUNIOR_STATUS.REJECTED]: "Rejected",
} as const;

// TaskPrority: Low = 1, Medium = 2, High = 3
export const TASK_PRIORITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
} as const;

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: "Low",
  [TASK_PRIORITY.MEDIUM]: "Medium",
  [TASK_PRIORITY.HIGH]: "High",
} as const;

// CollaborationRoleTaskStatus: NotStarted = 1, InProgress = 2, UnderReview = 3, Rejected = 4, Completed = 5
export const TASK_STATUS = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  UNDER_REVIEW: 3,
  REJECTED: 4,
  COMPLETED: 5,
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.NOT_STARTED]: "Not Started",
  [TASK_STATUS.IN_PROGRESS]: "In Progress",
  [TASK_STATUS.UNDER_REVIEW]: "Under Review",
  [TASK_STATUS.REJECTED]: "Rejected",
  [TASK_STATUS.COMPLETED]: "Completed",
} as const;

// Helper functions for getting options
export const getTaskPriorityOptions = () => [
  {
    label: TASK_PRIORITY_LABELS[TASK_PRIORITY.LOW],
    value: TASK_PRIORITY.LOW.toString(),
  },
  {
    label: TASK_PRIORITY_LABELS[TASK_PRIORITY.MEDIUM],
    value: TASK_PRIORITY.MEDIUM.toString(),
  },
  {
    label: TASK_PRIORITY_LABELS[TASK_PRIORITY.HIGH],
    value: TASK_PRIORITY.HIGH.toString(),
  },
];

export const getTaskStatusOptions = () => [
  { label: "All Status", value: "all" },
  {
    label: TASK_STATUS_LABELS[TASK_STATUS.NOT_STARTED],
    value: TASK_STATUS.NOT_STARTED.toString(),
  },
  {
    label: TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS],
    value: TASK_STATUS.IN_PROGRESS.toString(),
  },
  {
    label: TASK_STATUS_LABELS[TASK_STATUS.UNDER_REVIEW],
    value: TASK_STATUS.UNDER_REVIEW.toString(),
  },
  {
    label: TASK_STATUS_LABELS[TASK_STATUS.REJECTED],
    value: TASK_STATUS.REJECTED.toString(),
  },
  {
    label: TASK_STATUS_LABELS[TASK_STATUS.COMPLETED],
    value: TASK_STATUS.COMPLETED.toString(),
  },
];

export const getCollaborationStatusOptions = () => [
  { label: "All", value: "all" },
  {
    label: COLLABORATION_STATUS_LABELS[COLLABORATION_STATUS.DRAFT],
    value: "draft",
  },
  {
    label: COLLABORATION_STATUS_LABELS[COLLABORATION_STATUS.READY],
    value: "ready",
  },
  {
    label: COLLABORATION_STATUS_LABELS[COLLABORATION_STATUS.IN_PROGRESS],
    value: "inprogress",
  },
  {
    label: COLLABORATION_STATUS_LABELS[COLLABORATION_STATUS.COMPLETED],
    value: "completed",
  },
];
