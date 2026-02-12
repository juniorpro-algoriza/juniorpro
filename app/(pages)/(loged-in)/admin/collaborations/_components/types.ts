export interface Responsibility {
  id: string;
  text: string;
}

export interface Role {
  id: string;
  category: string;
  roleDescription: string;
  teamCapacity: number;
  responsibilities: Responsibility[];
  toolsRequired: string[];
  assignMentor: string;
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

  registrationDeadline: Date | null;

  xpReward: number;
  gemsPoints: number;
  money: number;

  goals: Goal[];

  // Step 3: Roles & Team
  roles: Role[];

  // Step 4: Requirements
  requirements: Requirement[];
}
