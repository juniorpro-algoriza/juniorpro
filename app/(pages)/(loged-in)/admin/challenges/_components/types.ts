export interface Judge {
  id: string;
  email: string;
}

export interface Instruction {
  id: string;
  text: string;
}

export interface EvaluationCriterion {
  id: string;
  name: string;
  weight: number;
}

export interface Prize {
  id: string;
  rank: number;
  money?: number;
  xp?: number;
  gems?: number;
  label?: string;
}

export interface Requirement {
  id: string;
  text: string;
}

export interface Criterion {
  id: string;
  text: string;
}

export interface ChallengeFormData {
  id?: number;
  // Step 1: Overview
  projectTitle: string;
  description: string;
  challengeType: string;
  difficultyLevel: string;
  category: string;
  skills: string[];

  startDateTime: Date | null;
  endDateTime: Date | null;
  registrationDeadline?: Date | null;

  icon: string;
  kpPoints: number;
  gems: number;

  isPremium: boolean;
  pointsCost?: number;
  isSubscriptionOnly?: boolean;

  judges: Judge[];

  // Step 2: How to Complete
  instructions: Instruction[];

  // Step 3: Requirements
  evaluationCriteria: EvaluationCriterion[];
  requirements: Requirement[];
  successCriteria: Criterion[];

  // Step 4: Prizes
  prizes: Prize[];
  participationGems: number;
}
