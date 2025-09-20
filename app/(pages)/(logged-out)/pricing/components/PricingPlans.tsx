import { PurchaseCard } from "@components";
import { Plan } from "@types";
interface pricingProps {
  plans: Plan[];
}

export const PricingPlans = ({ plans }: pricingProps) => {
  return (
    <>
      <h1 className="text-2xl font-medium text-yankees-blue mb-4">
        Pricing Packages
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PurchaseCard key={plan.id} plan={plan} />
        ))}
      </div>
    </>
  );
};
