"use client";
import {
  Animate,
  Button,
  CodeEditor,
  Input,
  MainCard,
  Textarea,
} from "@components";
import type { CodeLanguage, SyntaxIssue } from "@components";
import { Tip } from "@components/client";
import React, { useCallback, useState } from "react";
import LambImage from "@public/images/lamb.png";
import { CheckCircle2, ExternalLink, Link2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import RocketImage from "@public/images/rocket-icon.png";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { useSubmitMission } from "../../tanstack/paths/useJuniorsPaths";

const submissionSchema = z.object({
  id: z.number(),
  submissionLink: z.string().url("Please enter a valid URL"),
  submissionNotes: z.string().optional(),
  solutionCode: z.string().optional(),
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
  const submitMutation = useSubmitMission();
  const isSubmitting = submitMutation.isPending;
  const [showSolution, setShowSolution] = useState(true);
  const [formData, setFormData] = useState<SubmissionFormData>({
    id: missionId || 0,
    submissionLink: "",
    submissionNotes: "",
    solutionCode: "",
  });
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>("javascript");
  const [syntaxIssues, setSyntaxIssues] = useState<SyntaxIssue[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const result = submissionSchema.safeParse(formData);
    if (!result.success) {
      result.error.issues.forEach((err) => {
        const pathKey = err.path[0];
        if (typeof pathKey === "string") {
          newErrors[pathKey] = err.message;
        }
      });
    }

    if (syntaxIssues.length > 0) {
      newErrors.solutionCode = `Fix the ${syntaxIssues.length} syntax ${
        syntaxIssues.length === 1 ? "error" : "errors"
      } in your code before submitting`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleIssuesChange = useCallback((issues: SyntaxIssue[]) => {
    setSyntaxIssues(issues);
    if (issues.length === 0) {
      setErrors((prev) => ({ ...prev, solutionCode: "" }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      if (syntaxIssues.length > 0) {
        toast.error("Your code still has syntax errors. Fix them to submit.");
      }
      return;
    }

    const code = formData.solutionCode?.trim();
    const notes = formData.submissionNotes?.trim() || "";
    const combinedNotes = code
      ? notes
        ? `${notes}\n\n\`\`\`${codeLanguage}\n${code}\n\`\`\``
        : `\`\`\`${codeLanguage}\n${code}\n\`\`\``
      : notes || undefined;

    try {
      await submitMutation.mutateAsync({
        id: formData.id,
        submissionLink: formData.submissionLink,
        submissionNotes: combinedNotes,
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
    }
  };

  const handleInputChange = (
    field: keyof SubmissionFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return !submissionLink ? (
    <div>
      <MainCard>
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold md:text-lg text-base">
            Submit Your Work
          </h2>
          <p className="text-gray-600 mt-2 md:text-base text-sm">
            Share a link to your code repository (GitHub, CodePen, etc.) , you
            can update your submission until the challenge deadline
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
              onChange={(e) =>
                handleInputChange("submissionLink", e.target.value)
              }
              error={errors.submissionLink}
            />
            <Textarea
              label="Additional Notes (Optional)"
              name="notes"
              placeholder="Describe your solution, challenges you faced, or anything else you'd like to share..."
              value={formData.submissionNotes}
              onChange={(e) =>
                handleInputChange("submissionNotes", e.target.value)
              }
              // className="w-full border-[#DFE1E8]"
            />
            <CodeEditor
              label="Your Code"
              optionalHint="Optional"
              value={formData.solutionCode ?? ""}
              onChange={(code) => handleInputChange("solutionCode", code)}
              language={codeLanguage}
              onLanguageChange={setCodeLanguage}
              onIssuesChange={handleIssuesChange}
              placeholder="Paste or write your solution here..."
              error={errors.solutionCode}
              className="mb-5"
            />
          </div>
          <Tip
            title="Tip: "
            description="Include information about challenges you overcame, unique features you implemented, and the impact of your solution."
            image={LambImage.src}
            isOneLiner
            className="mt-5 mb-5"
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
    </div>
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
                <p className="font-medium break-all">{submissionLink || "#"}</p>
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
          <MainCard classname="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-600 font-semibold flex items-center gap-2">
                <CheckCircle2 className="size-4" /> Reference Solution
              </p>
            </div>
            <CodeEditor
              value={referenceAnswer || ""}
              language={codeLanguage}
              readOnly
              enableClear={false}
              showStatusBar
              minHeight="200px"
            />
          </MainCard>
        )}
      </Animate>
    </div>
  );
};
