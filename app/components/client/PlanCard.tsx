import { CircleCheck, EllipsisVertical, Infinity, Users } from "lucide-react";
import React, { useCallback } from "react";
import { Button } from "../Button";
import { components } from "../../../api-schema";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDeletePackage } from "../../(pages)/(loged-in)/admin/tanstack";
import {
  useSubscribe,
  useUpgradePlan,
} from "../../(pages)/(loged-in)/contributor/tanstack";
import { toast } from "sonner";
import { ModalLink } from "@components";

type Package =
  | components["schemas"]["Sawiha.Services.DTO.PackageModels.GetPackageListModel"]
  | components["schemas"]["Sawiha.Services.DTO.PackageModels.EnablerPackageModels.EnablerPackageModel"];

type CurrentSubscription =
  components["schemas"]["Sawiha.Services.DTO.PackageModels.EnablerPackageModels.EnablerPackageSubscriptionModel"];

export const PlanCard = ({
  module,
  packageData,
  currentSubscription,
  isLoadingSubscription,
}: {
  module: "admin" | "contributor";
  packageData: Package;
  currentSubscription?: CurrentSubscription | null;
  isLoadingSubscription?: boolean;
}) => {
  const deleteMutation = useDeletePackage();
  const subscribeMutation = useSubscribe();
  const upgradeMutation = useUpgradePlan();

  const isDeleting = deleteMutation.isPending;
  const isSubscribing = subscribeMutation.isPending;
  const isUpgrading = upgradeMutation.isPending;

  const handleDelete = useCallback(async () => {
    if (!packageData.id) return;

    try {
      await deleteMutation.mutateAsync({ id: packageData.id });
      toast.success("Plan deleted successfully");
    } catch (error: unknown) {
      console.error("Failed to delete plan:", error);

      try {
        // Parse the serialized error
        const errorData = JSON.parse((error as Error).message);

        if (errorData.errorMessage === "PackagesHasSubscriptions") {
          toast.error(
            "Cannot delete plan: subscribers are currently enrolled in this plan"
          );
        } else {
          toast.error(errorData.errorMessage || "Failed to delete plan");
        }
      } catch {
        // If parsing fails, show generic error
        toast.error("Failed to delete plan");
      }
    }
  }, [packageData.id, deleteMutation]);

  const handleSubscribe = useCallback(async () => {
    if (!packageData.id) return;

    try {
      const response = await subscribeMutation.mutateAsync(packageData.id);
      if (typeof response === "string" && response.startsWith("http")) {
        window.location.href = response;
      } else {
        toast.success("Subscribed successfully!");
      }
    } catch (error) {
      console.error("Failed to subscribe:", error);
      toast.error("Failed to subscribe");
    }
  }, [packageData.id, subscribeMutation]);

  const handleUpgrade = useCallback(async () => {
    if (!packageData.id) return;

    try {
      const response = await upgradeMutation.mutateAsync(packageData.id);
      if (typeof response === "string" && response.startsWith("http")) {
        window.location.href = response;
      } else {
        toast.success("Plan upgraded successfully!");
      }
    } catch (error) {
      console.error("Failed to upgrade:", error);
      toast.error("Failed to upgrade plan");
    }
  }, [packageData.id, upgradeMutation]);

  return (
    <div className="border-2 border-dotted border-gray-200 p-5 rounded-2xl space-y-3">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          {module == "admin" ? (
            <>
              <p
                className={`text-xs px-2 py-1 rounded-full border font-bold ${
                  "isActivated" in packageData && packageData.isActivated
                    ? "border-green-300 bg-green-100 text-green-600"
                    : "border-gray-300 bg-gray-100 text-gray-600"
                }`}
              >
                {"isActivated" in packageData && packageData.isActivated
                  ? "Active"
                  : "In Active"}
              </p>
              <p className="text-xs text-gray-600">
                {packageData.durationType === 3
                  ? "Monthly"
                  : packageData.durationType === 4
                    ? "Annual"
                    : packageData.durationType === 1
                      ? "Daily"
                      : packageData.durationType === 2
                        ? "Weekly"
                        : "Custom"}
              </p>
            </>
          ) : null}
        </div>
        {module === "admin" && (
          <Menu>
            <MenuButton className="cursor-pointer focus-visible:outline-0">
              <EllipsisVertical className="text-gray-600 size-4" />
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="w-40 bg-white border border-gray-200 rounded-2xl focus-visible:outline-0"
            >
              <MenuItem>
                <div className="data-focus:bg-blue-100">
                  <ModalLink
                    name="CreateEditPlan"
                    query={
                      packageData.id != null
                        ? { planId: packageData.id }
                        : undefined
                    }
                  >
                    <div className="w-full text-left block py-2 px-4 cursor-pointer text-sm">
                      Edit
                    </div>
                  </ModalLink>
                </div>
              </MenuItem>
              <MenuItem disabled={isDeleting}>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full text-sm text-left block text-red-600 data-focus:bg-red-100 py-2 px-4 disabled:opacity-60 cursor-pointer"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        )}
      </div>
      <h3 className="text-lg font-bold">
        {packageData.nameEn || packageData.nameAr || "Unnamed Plan"}
      </h3>
      <p className="text-gray-600 text-sm">
        {packageData.description || "No description available"}
      </p>
      {module === "contributor" && (
        <>
          {isLoadingSubscription ? (
            <Button
              intent="main"
              size="mainDefault"
              disabled
              className="w-full"
            >
              Loading...
            </Button>
          ) : "isCurrentSubscription" in packageData &&
            packageData.isCurrentSubscription ? (
            <Button
              intent="main"
              size="mainDefault"
              disabled
              className="w-full"
            >
              Current Plan
            </Button>
          ) : currentSubscription ? (
            <Button
              intent="main2"
              size="mainDefault"
              className="w-full"
              onClick={handleUpgrade}
              disabled={isUpgrading}
            >
              {isUpgrading ? "Upgrading..." : "Upgrade Plan"}
            </Button>
          ) : (
            <Button
              intent="main2"
              size="mainDefault"
              className="w-full"
              onClick={handleSubscribe}
              disabled={isSubscribing}
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          )}
        </>
      )}
      <hr className="border-gray-200" />
      <p className="text-2xl font-black">
        {packageData.price || 0}{" "}
        <span className="text-gray-600 text-base font-semibold">SAR</span>
      </p>
      <p className="text-gray-600 text-sm">
        per{" "}
        {packageData.durationType === 3
          ? "month"
          : packageData.durationType === 4
            ? "year"
            : packageData.durationType === 1
              ? "day"
              : packageData.durationType === 2
                ? "week"
                : "period"}
      </p>
      <div className="flex items-center gap-2 px-6 py-3 border border-dark-blue-main/20 rounded-3xl text-dark-blue-main bg-blue-main/10 font-medium max-lg:text-sm">
        <Users className="size-5" />
        <span className="font-bold">
          {packageData.juniorCapacity || 0}
        </span>{" "}
        Juniors
      </div>
      <div className="space-y-3">
        <p className="font-bold text-sm">Key Features</p>
        <div className="space-y-1">
          {packageData.features && packageData.features.length > 0 ? (
            packageData?.features?.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CircleCheck className="size-5 text-blue-600 fill-blue-600/10" />
                  <span className="text-midnight font-medium text-sm">
                    {feature.nameEn}
                  </span>
                </div>
                <div className="bg-blue-50 px-2 py-1 rounded text-blue-600">
                  {feature.key == 1 ? (
                    <>
                      {feature.limitCount === null ? (
                        <Infinity className="size-4" />
                      ) : (
                        <span className="text-xs font-bold">
                          {feature.limitCount}
                        </span>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 italic">No features selected</p>
          )}
          {packageData.features && packageData.features.length > 4 && (
            <p className="text-sm text-gray-400 italic">
              +{packageData.features.length - 4} more features
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
// const features = [
//   "Free Missions Access",
//   "Unlimited Mission Attempts",
//   "Advanced Progress Tracking",
//   "Personalized Learning Paths",
//   "Analytics Dashboard for Juniors",
//   "Weekly Performance Reports",
//   "Access to Premium Challenges",
//   "Custom Assignments Creation",
//   "Team Management Tools",
//   "Mentor Collaboration Support",
//   "Priority Email Support",
//   "Certificates of Completion",
//   "Activity Heatmap Overview",
//   "Role-Based Permissions",
//   "Integrations with Google Classroom & Microsoft Teams",
// ];
