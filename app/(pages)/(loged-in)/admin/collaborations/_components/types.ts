export interface Role {
  id: string;
  category: string;
  roleDescription: string;
  responsibilities: string;
  toolsRequired: string[];
  assignMentor: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  text: string;
}

export interface Goal {
  id: string;
  text: string;
}

export interface Requirement {
  id: string;
  text: string;
}

export interface CollaborationFormData {
  // Step 1: Overview
  projectTitle: string;
  description: string;
  projectIcon: string;

  startDateTime: Date | null;
  endDateTime: Date | null;

  xpReward: number;
  gemsPoints: number;
  money: number;

  // Step 2: Project Details
  whatWereBuilding: string;
  goals: Goal[];

  // Step 3: Roles & Team
  roles: Role[];

  // Step 4: Requirements
  requirements: Requirement[];
}
