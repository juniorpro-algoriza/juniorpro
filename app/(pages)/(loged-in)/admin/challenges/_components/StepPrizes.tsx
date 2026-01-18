"use client";

import { Input } from "@components";
import { ChallengeFormData, Prize } from "./types";
import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { cx } from "@lib";

const MEDALS = [
  "/images/1st-medal.png",
  "/images/2nd-medal.png",
  "/images/3rd-medal.png",
];

interface StepPrizesProps {
  formData: ChallengeFormData;
  setFormData: Dispatch<SetStateAction<ChallengeFormData>>;
  fieldErrors?: Record<string, string>;
}

export const StepPrizes = ({
  formData,
  setFormData,
  fieldErrors = {},
}: StepPrizesProps) => {
  const handleAddPrize = () => {
    const rank = (formData.prizes?.length || 0) + 1;
    const newPrize: Prize = {
      id: Date.now().toString(),
      rank: rank,
      money: undefined,
      xp: undefined,
      gems: undefined,
      label: "",
    };
    setFormData((prev) => ({
      ...prev,
      prizes: [...(prev.prizes || []), newPrize],
    }));
  };

  const handleRemovePrize = (id: string) => {
    setFormData((prev) => {
      const newPrizes = prev.prizes.filter((p) => p.id !== id);
      // Re-calculate ranks?
      // For now, let's just let them be, or mapping index + 1 as rank visually.
      return { ...prev, prizes: newPrizes };
    });
  };

  const handlePrizeChange = <K extends keyof Prize>(
    id: string,
    field: K,
    value: Prize[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  return (
    <div className="space-y-8 py-2">
      {/* Prize Distribution */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Prize Distribution</h3>
          <p className="text-sm text-gray-600">
            Customize rewards for top performers
          </p>
        </div>

        <div className="space-y-4">
          {formData.prizes &&
            formData.prizes.map((prize, index) => (
              <div
                key={prize.id}
                className="p-4 border border-gray-200 rounded-xl bg-gray-50/30 flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cx(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg  text-dark-blue-main overflow-hidden relative",
                      index < 3 ? "" : "border border-gray-200 shadow-sm"
                    )}
                  >
                    {index < 3 ? (
                      <Image
                        src={MEDALS[index]}
                        alt={`${index + 1} place medal`}
                        fill
                        className="object-contain p-1"
                      />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="font-semibold text-gray-700">
                    {index === 0
                      ? "1st"
                      : index === 1
                        ? "2nd"
                        : index === 2
                          ? "3rd"
                          : `${index + 1}th`}{" "}
                    Place
                  </div>
                  <div className="flex-1" />
                  <button
                    onClick={() => handleRemovePrize(prize.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Money (1000)"
                    label={index === 0 ? "Money Reward" : undefined}
                    type="number"
                    value={prize.money ?? ""}
                    onChange={(e) =>
                      handlePrizeChange(
                        prize.id,
                        "money",
                        Number(e.target.value)
                      )
                    }
                    error={fieldErrors[`prizes.${index}.money`]}
                  />
                  <Input
                    placeholder="XP (500)"
                    label={index === 0 ? "Experience Points" : undefined}
                    type="number"
                    value={prize.xp ?? ""}
                    onChange={(e) =>
                      handlePrizeChange(prize.id, "xp", Number(e.target.value))
                    }
                    error={fieldErrors[`prizes.${index}.xp`]}
                  />
                  <Input
                    placeholder="Gems (300)"
                    label={index === 0 ? "Gems" : undefined}
                    type="number"
                    value={prize.gems ?? ""}
                    onChange={(e) =>
                      handlePrizeChange(
                        prize.id,
                        "gems",
                        Number(e.target.value)
                      )
                    }
                    error={fieldErrors[`prizes.${index}.gems`]}
                  />
                  <Input
                    placeholder="Label (e.g. Gold Champion)"
                    label={index === 0 ? "Label/Title" : undefined}
                    value={prize.label ?? ""}
                    onChange={(e) =>
                      handlePrizeChange(prize.id, "label", e.target.value)
                    }
                    error={fieldErrors[`prizes.${index}.label`]}
                  />
                </div>
              </div>
            ))}

          <button
            type="button"
            onClick={handleAddPrize}
            className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-dark-blue-main hover:border-dark-blue-main hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Prize Place
          </button>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Participation Reward */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Participation Reward</h3>
          <p className="text-sm text-gray-600">
            Reward for all valid submissions
          </p>
        </div>

        <div className="w-full md:w-1/3">
          <Input
            label="Gems"
            type="number"
            placeholder="50"
            value={formData.participationGems ?? 0}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                participationGems: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};
