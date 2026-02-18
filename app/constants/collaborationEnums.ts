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

// CollaborationRoleTaskStatus: NotStarted = 1, InProgress = 2, Submited = 3
export const TASK_STATUS = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  SUBMITTED: 3,
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.NOT_STARTED]: "Not Started",
  [TASK_STATUS.IN_PROGRESS]: "In Progress",
  [TASK_STATUS.SUBMITTED]: "Submitted",
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
    label: TASK_STATUS_LABELS[TASK_STATUS.SUBMITTED],
    value: TASK_STATUS.SUBMITTED.toString(),
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
