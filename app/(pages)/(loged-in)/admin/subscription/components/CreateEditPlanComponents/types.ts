import { components } from "../../../../../../../api-schema";

export type Feature =
  components["schemas"]["JuniorPro.Services.DTO.FeatureModels.FeatureModel"];

export interface PlanFeature {
  featureId: number;
  limitCount: number | null;
}

export interface PlanFormData {
  // Step 1: Info
  planName: string;
  description: string;
  isActive: boolean;
  juniorCapacity: number;

  // Step 2: Pricing
  // monthlyPrice: number;
  // yearlyPrice: number;
  price: number;
  durationType:number;

  // Step 3: Features
  features: PlanFeature[];
}
