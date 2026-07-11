"use client";

import { MainCard, Skeleton, Button } from "@components";
import { Crown, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { useCurrentSubscription } from "../../tanstack";
import Link from "next/link";
import { components } from "../../../../../../api-schema";

type SubscriptionModel =
  components["schemas"]["Sawiha.Services.DTO.PackageModels.EnablerPackageModels.EnablerPackageSubscriptionModel"];

export const CurrentSubscriptionWidget = () => {
  const { data: subscriptionResponse, isLoading } = useCurrentSubscription();

  if (isLoading) {
    return (
      <MainCard classname="h-full">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-5 w-48 rounded" />
        </div>
        <Skeleton className="h-24 w-full rounded-xl mb-4" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </MainCard>
    );
  }

  // Handle both possible wrapper structures based on previous files
  const subscription = ((
    subscriptionResponse as unknown as { data: SubscriptionModel }
  )?.data || subscriptionResponse) as SubscriptionModel;

  return (
    <MainCard classname="h-fit flex flex-col justify-between overflow-hidden relative group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <Crown className="size-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 sm:size-12 rounded-xl border-b-4 border-violet-500 bg-violet-400 flex items-center justify-center shadow-violet-100 shrink-0">
              <Crown className="size-5 sm:size-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Current Plan</h3>
              <p className="text-xs text-gray-500 font-medium">
                Your active subscription
              </p>
            </div>
          </div>
          {subscription?.status === 1 && (
            <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-full border border-emerald-100">
              <ShieldCheck className="size-4" />
            </div>
          )}
        </div>

        {subscription ? (
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-5 border border-violet-100">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-black text-xl text-violet-900 uppercase tracking-tight">
                {subscription.nameEn || "Plan"}
              </h4>
              <span className="bg-white text-violet-600 text-xs font-bold px-2 py-1 rounded shadow-sm border border-violet-50">
                Active
              </span>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-violet-700/70">
                  Allowed Juniors
                </span>
                <span className="font-bold text-violet-900 bg-white px-2 py-0.5 rounded shadow-sm">
                  {subscription.juniorCapacity || 0} Slots
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-violet-700/70">Price</span>
                <span className="font-bold text-violet-900 flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-sm">
                  <Zap className="size-3 text-amber-500 hidden" />
                  SAR {subscription.price || 0}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 border-dashed">
            <Crown className="size-8 text-gray-300 mx-auto mb-2" />
            <p className="font-bold text-gray-700">No Active Plan</p>
            <p className="text-xs text-gray-500 mt-1">
              Subscribe to a package to get started.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 relative z-10">
        <Link href="/contributor/packages" className="block w-full">
          <Button intent="main2" size="mainDefault" className="w-full ">
            {subscription ? "Upgrade Plan" : "View Packages"}
            <ArrowRight className="size-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Button>
        </Link>
      </div>
    </MainCard>
  );
};
