export interface GuideStep {
  id: string;
  description: string;
}

export interface Goal {
  id: string;
  description: string;
}

export interface ChallengeRequirement {
  id: string;
  description: string;
}

export interface ChallengeEvaluation {
  id: string;
  titleEn: string;
  titleAr?: string;
  description?: string;
  percentage: number;
}

export interface ChallengePrize {
  id: string;
  rank: number;
  titleEn: string;
  titleAr?: string;
  xp: number;
  points: number;
}

export interface ChallengeFormData {
  id?: number;

  // Step 1: Overview
  nameEn: string;
  nameAr: string;
  description: string;
  levelId: number | null;
  categoryId: number | null;
  juniorsCapacity: number;
  startDate: Date | null;
  endDate: Date | null;
  registerationDeadline: Date | null;
  icon: number | null;
  accessCostType: number; // 1=Free, 2=Points, 3=Subscription

  // Step 2: Project Details
  guideSteps: GuideStep[];
  goals: Goal[];

  // Step 3: Requirements
  requirements: ChallengeRequirement[];
  evaluations: ChallengeEvaluation[];

  // Step 4: Prizes
  prizes: ChallengePrize[];
}
