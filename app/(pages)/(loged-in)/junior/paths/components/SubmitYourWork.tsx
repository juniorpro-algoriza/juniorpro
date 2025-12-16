"use client";
import { Animate, Button, Input, MainCard, Textarea } from "@components";
import { Tip } from "@components/client";
import React, { useState } from "react";
import LambImage from "@public/images/lamb.png";
import { ExternalLink, Link2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import RocketImage from "@public/images/rocket-icon.png";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { postJuniorsLearningPathSubmitMission } from "../../server";

const submissionSchema = z.object({
  id: z.number(),
  submissionLink: z.string().url("Please enter a valid URL"),
  submissionNotes: z.string().optional(),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

export const SubmitYourWork = ({
  referenceAnswer,
  submissionLink,
  missionId,
  points,
  xp,
  nameEn,
}: {
  referenceAnswer?: string | null;
  submissionLink?: string | null;
  missionId?: number;
  points?: number;
  xp?: number;
  nameEn?: string | null;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSolution, setShowSolution] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SubmissionFormData>({
    id: missionId || 0,
    submissionLink: "",
    submissionNotes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      submissionSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const pathKey = err.path[0];
          if (typeof pathKey === 'string') {
            newErrors[pathKey] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await postJuniorsLearningPathSubmitMission({
        id: formData.id,
        submissionLink: formData.submissionLink,
        submissionNotes: formData.submissionNotes,
      });
      
      // Create new params based on current ones
      const newParams = new URLSearchParams(searchParams.toString());
      
      // Set the modal name
      newParams.set("modal", "MissionCompleted");
      newParams.set("mission", nameEn || "Mission");
      newParams.set("points", points?.toString() || "0");
      newParams.set("xp", xp?.toString() || "0");
      
      const finalUrl = `?${newParams.toString()}`;
      
      router.push(finalUrl);
      
    } catch (error) {
      toast.error("Failed to submit mission. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof SubmissionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return !submissionLink ? (
    <MainCard>
      <form onSubmit={handleSubmit}>
        <h2 className="font-semibold md:text-lg text-base">Submit Your Work</h2>
        <p className="text-gray-600 mt-2 md:text-base text-sm">
          Share a link to your code repository (GitHub, CodePen, etc.) , you can
          update your submission until the challenge deadline
        </p>
        <div className="mt-5 space-y-3">
          <Input
            name="submission_link"
            label={
              <div className="flex items-center gap-2 ">
                <Link2 className="text-blue-main size-5" />
                Submission Link
              </div>
            }
            type="url"
            placeholder="https://github.com/username/project"
            value={formData.submissionLink}
            onChange={(e) => handleInputChange("submissionLink", e.target.value)}
            error={errors.submissionLink}
          />
          <Textarea
            label="Additional Notes (Optional)"
            name="notes"
            placeholder="Describe your solution, challenges you faced, or anything else you'd like to share..."
            value={formData.submissionNotes}
            onChange={(e) => handleInputChange("submissionNotes", e.target.value)}
            // className="w-full border-[#DFE1E8]"
          />
        </div>
        <Tip
          title="Tip: "
          description="Include information about challenges you overcame, unique features you implemented, and the impact of your solution."
          image={LambImage.src}
          isOneLiner
          className="mt-0 mb-5"
        />
        <Button
          type="submit"
          intent="main2"
          size="mainLg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Mission"}
        </Button>
      </form>
    </MainCard>
  ) : (
    <div className="space-y-3">
      <MainCard classname=" space-y-5">
        <div className="flex md:flex-row flex-col md:items-center">
          <Image
            src={RocketImage}
            alt="Rocket Icon"
            className="w-[100px] relative z-10"
            width={100}
            height={100}
          />
          <div className="space-y-1">
            <h2 className="md:text-2xl text-lg font-semibold">
              Mission Submitted!
            </h2>
            <p className="md:text-base text-sm text-gray-600 font-medium">
              Great work! Your code has been received. Compare your solution
              below to learn from our reference implementation.
            </p>
          </div>
        </div>
        <MainCard classname=" space-y-2 ">
          <p className="text-sm text-gray-600 font-bold">Your Submission</p>
          <Link href={submissionLink || "#"}>
            <MainCard classname=" flex  gap-3 md:flex-row flex-col md:items-center shadow-none">
              <div className="p-3 rounded-2xl bg-dark-blue-main/10 text-dark-blue-main w-fit h-fit">
                <ExternalLink className="size-5" />
              </div>
              <div>
                <p className="font-medium break-all">
                  {submissionLink || "#"}
                </p>
                <p className="text-13 text-gray-600">Click to view</p>
              </div>
            </MainCard>
          </Link>
        </MainCard>
        <Button
          type="button"
          intent="main"
          size="mainDefault"
          onClick={() => setShowSolution((prev) => !prev)}
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </Button>
      </MainCard>
      <Animate>
        {showSolution && (
          <MainCard classname=" space-y-2 ">
            <p className="text-sm text-green-600 font-semibold">
              Reference Solution
            </p>
            <pre className="text-sm p-5 rounded-2xl  bg-gray-50 border border-gray-200 overflow-x-auto">
              {referenceAnswer || ""}
            </pre>
          </MainCard>
        )}
      </Animate>
    </div>
  );
};
