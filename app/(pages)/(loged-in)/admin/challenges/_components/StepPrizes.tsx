"use client";

import { Input } from "@components";
import { ChallengeFormData, ChallengePrize } from "./types";
import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { cx } from "@lib";

const MEDALS = [
  "/images/1st-medal.png",
  "/images/2nd-medal.png",
  "/images/3rd-medal.png",
];

const TOP_PRIZE_CARD_STYLES = [
  "border-[#F3D872] bg-[#FFFDF1]",
  "border-[#E6EBF2] bg-[#FCFDFF]",
  "border-[#F2C796] bg-[#FFF9F3]",
];

const prizeInputClasses =
  "h-12 rounded-2xl border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)] focus:ring-2";

const prizeInputContainerClasses = "space-y-1.5";

const prizeInputLabelClasses =
  "uppercase text-[11px] font-bold tracking-wide text-gray-500";

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
    const newPrize: ChallengePrize = {
      id: Date.now().toString(),
      rank,
      titleEn: "",
      xp: 0,
      points: 0,
    };
    setFormData((prev) => ({
      ...prev,
      prizes: [...(prev.prizes || []), newPrize],
    }));
  };

  const handleRemovePrize = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      prizes: prev.prizes.filter((p) => p.id !== id),
    }));
  };

  const handlePrizeChange = <K extends keyof ChallengePrize>(
    id: string,
    field: K,
    value: ChallengePrize[K]
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
                className={cx(
                  "p-4 border rounded-xl flex flex-col gap-4 transition-colors",
                  TOP_PRIZE_CARD_STYLES[index] ||
                    "border-gray-200 bg-gray-50/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cx(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-dark-blue-main overflow-hidden relative",
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
                  <div className="space-y-0.5">
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
                    <p className="text-xs text-gray-500">
                      Configure rewards for this position
                    </p>
                  </div>
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={() => handleRemovePrize(prize.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    label={
                      <span className={prizeInputLabelClasses}>Cash Prize</span>
                    }
                    placeholder="$ 1000"
                    type="number"
                    value={prize.points || ""}
                    className={prizeInputClasses}
                    containerClassName={prizeInputContainerClasses}
                    onChange={(e) =>
                      handlePrizeChange(
                        prize.id,
                        "points",
                        Number(e.target.value)
                      )
                    }
                    error={fieldErrors[`prizes.${index}.points`]}
                  />
                  <Input
                    label={<span className={prizeInputLabelClasses}>Gems</span>}
                    placeholder="500"
                    type="number"
                    value={prize.xp || ""}
                    className={prizeInputClasses}
                    containerClassName={prizeInputContainerClasses}
                    onChange={(e) =>
                      handlePrizeChange(prize.id, "xp", Number(e.target.value))
                    }
                    error={fieldErrors[`prizes.${index}.xp`]}
                  />
                  <Input
                    label={
                      <span className={prizeInputLabelClasses}>XP Points</span>
                    }
                    placeholder="300"
                    type="number"
                    value={prize.xp || ""}
                    className={prizeInputClasses}
                    containerClassName={prizeInputContainerClasses}
                    onChange={(e) =>
                      handlePrizeChange(prize.id, "xp", Number(e.target.value))
                    }
                    error={fieldErrors[`prizes.${index}.xp`]}
                  />
                  <Input
                    label={
                      <span className={prizeInputLabelClasses}>
                        Badge Title
                      </span>
                    }
                    placeholder="Gold Champion"
                    value={prize.titleEn}
                    className={prizeInputClasses}
                    containerClassName={prizeInputContainerClasses}
                    onChange={(e) =>
                      handlePrizeChange(prize.id, "titleEn", e.target.value)
                    }
                    error={fieldErrors[`prizes.${index}.titleEn`]}
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
    </div>
  );
};
