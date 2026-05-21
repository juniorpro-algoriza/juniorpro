"use client";

import React, { useState } from "react";
import { Button, FileUpload, InfoSection, Input, MainCard } from "@components";
import {
  Send,
  CheckCircle2,
  BookOpenCheck,
  FileText,
  Download,
  Link as LinkIcon,
  Clock,
  Trophy,
} from "lucide-react";
import { useSubmitChallenge } from "../../tanstack/challenges";
import { toast } from "sonner";
import { z } from "zod";
import { components } from "../../../../../../api-schema";
import { CHALLENGE_PARTICIPANT_STATUS } from "../../../../../configs/constants";

type ChallengeEvaluationModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.ChallengeEvaluationModel"];

type ParticipantDetailModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.GetAllParticpants.GetAllChallengeParticipantModel"];

interface SubmissionTabProps {
  challengeId: number;
  evaluations: ChallengeEvaluationModel[];
  participantDetail?: ParticipantDetailModel;
}

export function SubmissionTab({
  challengeId,
  evaluations,
  participantDetail,
}: SubmissionTabProps) {
  const isUnderReview =
    participantDetail?.status === CHALLENGE_PARTICIPANT_STATUS.UNDER_REVIEW;
  const isCompleted =
    participantDetail?.status === CHALLENGE_PARTICIPANT_STATUS.COMPLETED;
  const alreadySubmitted = isUnderReview || isCompleted;

  const [projectLink, setProjectLink] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitChallenge();

  const handleSubmit = async () => {
    if (!file && !projectLink.trim()) {
      toast.error("Please provide a project link or upload an attachment.");
      return;
    }

    if (projectLink.trim()) {
      const result = z.string().url().safeParse(projectLink.trim());
      if (!result.success) {
        toast.error("Please enter a valid URL for the project link.");
        return;
      }
    }

    try {
      await submitMutation.mutateAsync({
        challengeId,
        projectLink: projectLink || undefined,
        additionalNotes: additionalNotes || undefined,
        file: file || undefined,
      });
      toast.success("Your submission has been sent successfully!");
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit challenge. Please try again.");
    }
  };

  if (submitted || alreadySubmitted) {
    const displayLink = participantDetail?.projectLink || projectLink || null;
    const displayNotes =
      participantDetail?.additionalNotes || additionalNotes || null;
    const displayFile = participantDetail?.submittedFile || null;
    const displayDate = participantDetail?.submissionDate;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
        <MainCard classname="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`p-4 rounded-2xl ${isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
            >
              <CheckCircle2 className="size-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {isCompleted
                  ? "Submission Completed"
                  : "Submission Under Review"}
              </h3>
              <p className="text-gray-500 text-sm mt-2 font-medium max-w-md mx-auto">
                {isCompleted
                  ? "Your submission has been reviewed and evaluated."
                  : "Your submission has been received and is currently being reviewed. You will be notified once the evaluation is complete."}
              </p>
              {displayDate && (
                <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                  <Clock size={12} />
                  Submitted on{" "}
                  {new Date(displayDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </MainCard>

        {(displayLink || displayNotes || displayFile) && (
          <MainCard classname="p-6 space-y-4">
            <h4 className="text-sm font-bold text-gray-900">Submitted Work</h4>

            {displayLink && (
              <div className="flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <LinkIcon className="size-4 text-blue-main shrink-0" />
                <a
                  href={
                    displayLink.startsWith("http")
                      ? displayLink
                      : `https://${displayLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-main font-medium hover:underline break-all"
                >
                  {displayLink}
                </a>
              </div>
            )}

            {displayFile && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                <FileText className="size-4 text-gray-500 shrink-0" />
                <p className="text-sm text-gray-600 flex-1 truncate">
                  {displayFile.split(/[/\\]/).pop()}
                </p>
                <a
                  href={
                    displayFile.startsWith("http")
                      ? displayFile
                      : `https://${displayFile}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-main text-xs font-bold hover:underline shrink-0"
                >
                  <Download size={12} />
                  Download
                </a>
              </div>
            )}

            {displayNotes && (
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                  Additional Notes
                </p>
                <p className="text-sm text-gray-600">{displayNotes}</p>
              </div>
            )}
          </MainCard>
        )}

        {isCompleted && !!participantDetail?.evaluation && (
          <MainCard classname="p-6 text-center space-y-3">
            <div className="flex items-center justify-center">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl">
                <Trophy className="size-6" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                Your Score
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {participantDetail.evaluation}
                <span className="text-lg text-gray-400">%</span>
              </p>
            </div>
          </MainCard>
        )}

        {evaluations.length > 0 && (
          <InfoSection
            title="Evaluation Criteria"
            description="How your submission will be evaluated"
            icon={<BookOpenCheck className="size-6" />}
            watermark={<BookOpenCheck className="size-48" />}
            type="bullet"
            items={evaluations.map(
              (evalItem) =>
                `${evalItem.titleEn || "Criteria"} - ${evalItem.percentage || 0}%`
            )}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <MainCard classname="p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Submit Your Work
          </h3>
          <p className="text-gray-500 text-sm font-medium">
            Share your project link, upload your files, and add any notes for
            the reviewers.
          </p>
        </div>

        <Input
          label="PROJECT LINK"
          type="url"
          placeholder="https://github.com/your-project"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-midnight">
            ADDITIONAL NOTES
          </label>
          <textarea
            placeholder="Add any notes about your submission..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-violet-normal transition-all"
          />
        </div>

        <FileUpload
          label="ATTACHMENT"
          onFileSelect={setFile}
          accept=".zip,.rar,.pdf,.doc,.docx,.txt"
          maxSizeMB={25}
        />

        <div className="flex justify-end pt-2">
          <Button
            intent="main2"
            size="mainDefault"
            icon={<Send size={18} />}
            className="px-8 rounded-2xl shadow-lg shadow-blue-main/20 font-bold"
            onClick={handleSubmit}
            isLoading={submitMutation.isPending}
          >
            Submit Challenge
          </Button>
        </div>
      </MainCard>
    </div>
  );
}
