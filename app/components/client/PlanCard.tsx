import { CircleCheck, EllipsisVertical, Infinity, Users } from "lucide-react";
import React from "react";

export const PlanCard = () => {
  return (
    <div className="border-2 border-dotted border-gray-200 p-5 rounded-2xl space-y-3">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <p className="text-xs px-2 py-1 rounded-full border border-green-300 bg-green-100 text-green-600 font-bold">
            Active
          </p>
          <p className="text-xs text-gray-600">Monthly</p>
        </div>
        <EllipsisVertical className="text-gray-600 size-4" />
      </div>
      <h3 className="text-lg font-bold">Impact Plan</h3>
      <p className="text-gray-600 text-sm">
        Organizations, schools, or youth centers
      </p>
      <hr className="border-gray-200" />
      <p className="text-2xl font-black">
        1400 <span className="text-gray-600 text-base font-semibold">SAR</span>
      </p>
      <p className="text-gray-600 text-sm">per month</p>
      <div className="flex items-center gap-2 px-6 py-3 border border-dark-blue-main/20 rounded-3xl text-dark-blue-main bg-blue-main/10 font-medium">
        <Users className="size-5" />
        <span className="font-bold">10</span> Juniors
      </div>
      <div className="space-y-3">
        <p className="font-bold text-sm">Key Features</p>
        <ul className="space-y-2">
          {features.slice(0, 5).map((feature) => (
            <li key={feature} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CircleCheck className="size-5 text-dark-blue-main" />
                {feature}
              </div>
              <div className="p-1 border rounded-lg border-dark-blue-main/20 bg-blue-main/10">
                <Infinity
                  className="size-5 text-dark-blue-main"
                  strokeWidth={3}
                />
              </div>
            </li>
          ))}
          <li className="ms-7 text-sm font-medium text-gray-400">+ {features.slice(5).length} more features</li>
        </ul>
      </div>
    </div>
  );
};
const features = [
  "Free Missions Access",
  "Unlimited Mission Attempts",
  "Advanced Progress Tracking",
  "Personalized Learning Paths",
  "Analytics Dashboard for Juniors",
  "Weekly Performance Reports",
  "Access to Premium Challenges",
  "Custom Assignments Creation",
  "Team Management Tools",
  "Mentor Collaboration Support",
  "Priority Email Support",
  "Certificates of Completion",
  "Activity Heatmap Overview",
  "Role-Based Permissions",
  "Integrations with Google Classroom & Microsoft Teams",
];
