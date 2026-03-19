"use client";

import React, { useState } from "react";
import { Modal, MainCard, Skeleton, Input, Button } from "@components";
import { User, Calendar, ExternalLink, FileText, Download } from "lucide-react";
import {
  useGetChallengeParticipantById,
  useEvaluateChallengeParticipant,
} from "../../tanstack/challenges";
import { toast } from "sonner";
import {
  CHALLENGE_PARTICIPANT_STATUS,
  CHALLENGE_PARTICIPANT_STATUS_CONFIG,
} from "../../../../../configs/constants";

interface ParticipantDetailModalProps {
  participantId: number;
  onClose: () => void;
}

export function ParticipantDetailModal({
  participantId,
  onClose,
}: ParticipantDetailModalProps) {
  const { data: participant, isLoading } =
    useGetChallengeParticipantById(participantId);
  const { mutate: evaluate, isPending: isEvaluating } =
    useEvaluateChallengeParticipant();
  const [evaluationScore, setEvaluationScore] = useState<string>("");

  const handleEvaluate = () => {
    const score = Number(evaluationScore);
    if (!score || score < 0 || score > 100) {
      toast.error("Please enter a valid score between 0 and 100");
      return;
    }
    evaluate(
      { id: participantId, evaluation: score },
      {
        onSuccess: () => {
          toast.success("Evaluation submitted successfully");
          onClose();
        },
        onError: (error) => {
          let message = "Failed to submit evaluation";
          try {
            const parsed = JSON.parse(error.message);
            if (parsed.errorMessage) message = parsed.errorMessage;
          } catch {
            // use default message
          }
          toast.error(message);
        },
      }
    );
  };

  const statusInfo =
    CHALLENGE_PARTICIPANT_STATUS_CONFIG[(participant?.status as number) || 1] ||
    CHALLENGE_PARTICIPANT_STATUS_CONFIG[1];

  return (
    <Modal
      title="Participant Details"
      onClose={onClose}
      panelClassName="rounded-3xl max-w-2xl w-full"
    >
      {isLoading ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
          <Skeleton className="h-32 rounded-xl" />
        </div>
      ) : participant ? (
        <div className="space-y-6">
          {/* Participant Info */}
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 border border-gray-200">
              {participant.juniorName ? (
                participant.juniorName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
              ) : (
                <User className="size-6" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {participant.juniorName || "Unknown Student"}
              </h3>
              <p className="text-sm text-gray-500">
                {participant.careerNameEn || participant.careerNameAr || "—"}
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar className="size-3.5" />
                Registered
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {participant.registerationDate
                  ? new Date(participant.registerationDate).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )
                  : "—"}
              </div>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="text-xs text-gray-500 font-medium">Status</div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}
              >
                {statusInfo.label}
              </span>
            </MainCard>

            <MainCard classname="p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar className="size-3.5" />
                Submitted
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {participant.submissionDate
                  ? new Date(participant.submissionDate).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )
                  : "—"}
              </div>
            </MainCard>
          </div>

          {/* Project Submission */}
          {(participant.projectLink || participant.submittedFile) && (
            <MainCard classname="p-4 space-y-3">
              <h4 className="font-semibold text-gray-900">Submitted Work</h4>
              {participant.projectLink && (
                <a
                  href={
                    participant.projectLink.startsWith("http")
                      ? participant.projectLink
                      : `https://${participant.projectLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-main hover:underline"
                >
                  <ExternalLink className="size-4" />
                  View Project Submission
                </a>
              )}
              {participant.submittedFile && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                  <FileText className="size-4 text-gray-500 shrink-0" />
                  <p className="text-sm text-gray-600 flex-1 truncate">
                    {participant.submittedFile.split(/[/\\]/).pop()}
                  </p>
                  <a
                    href={
                      participant.submittedFile.startsWith("http")
                        ? participant.submittedFile
                        : `https://${participant.submittedFile}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-main text-xs font-bold hover:underline shrink-0"
                  >
                    <Download size={12} />
                    Download
                  </a>
                </div>
              )}
            </MainCard>
          )}

          {/* Additional Notes */}
          {participant.additionalNotes && (
            <MainCard classname="p-4 space-y-2">
              <h4 className="font-semibold text-gray-900">Additional Notes</h4>
              <p className="text-sm text-gray-600">
                {participant.additionalNotes}
              </p>
            </MainCard>
          )}

          {/* Evaluation */}
          {participant.status === CHALLENGE_PARTICIPANT_STATUS.UNDER_REVIEW && (
            <MainCard classname="p-4 space-y-4">
              <h4 className="font-semibold text-gray-900">Evaluation</h4>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Input
                    label="Score (0-100)"
                    type="number"
                    placeholder="Enter evaluation score"
                    value={evaluationScore}
                    onChange={(e) => setEvaluationScore(e.target.value)}
                  />
                </div>
                <Button
                  intent="main2"
                  size="mainDefault"
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                >
                  {isEvaluating ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </MainCard>
          )}

          {participant.status === CHALLENGE_PARTICIPANT_STATUS.COMPLETED &&
            !!participant.evaluation && (
              <MainCard classname="p-4 space-y-4">
                <h4 className="font-semibold text-gray-900">Evaluation</h4>
                <div className="text-sm text-gray-600">
                  Score:{" "}
                  <span className="font-bold text-gray-900">
                    {participant.evaluation}%
                  </span>
                </div>
              </MainCard>
            )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Participant not found.
        </div>
      )}
    </Modal>
  );
}
