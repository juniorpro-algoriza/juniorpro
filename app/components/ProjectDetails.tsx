"use client";

import {
  CalendarIcon,
  ClockIcon,
  CheckMarkIcon,
  CalendarCodeIcon,
} from "@icons";
import Image from "next/image";
import { Button } from "./Button";
import { ProjectDetailsResponse } from "../(pages)/(logged-out)/home/server/getProjectDetails";
import { joinProject } from "@server";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  data: ProjectDetailsResponse;
}

export const ProjectDetails = ({ data }: Props) => {
  const { projectDetails, tools, skills, tasks } = data;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isJoining, setIsJoining] = useState(false);

  const handleStartChallenge = async () => {
    const userType = Cookies.get("user_type");

    // If not logged in → redirect to login with redirect & join params
    if (!userType) {
      toast.info("Please log in or register to continue");
      router.push(
        `/auth/login?redirect=/projectDetails/${projectDetails.id}&join=${projectDetails.id}`
      );
      return;
    }

    await joinNow();
  };

  const joinNow = async () => {
    try {
      setIsJoining(true);
      const result = await joinProject(Number(projectDetails.id));

      if (result.success) {
        toast.success("Successfully joined the project!");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to join project"
      );
    } finally {
      setIsJoining(false);
    }
  };

  // auto-join when coming back from login (if ?join param exists)
  useEffect(() => {
    const joinId = searchParams.get("join");
    const userType = Cookies.get("user_type");
    if (joinId && userType) {
      joinNow();
      router.replace(`/projectDetails/${joinId}`); // Clean URL (remove ?join)
    }
  }, []);

  return (
    <div className="px-20 py-8">
      <h1 className="font-medium text-3xl mb-8">
        {projectDetails.nameEn || "Untitled Project"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Left Section */}
        <div className="col-span-3 space-y-6">
          <Image
            className="w-full rounded-xl"
            src={
              projectDetails.image?.startsWith("http")
                ? projectDetails.image
                : projectDetails.image
                  ? `/${projectDetails.image.replace(/^\/+/, "")}`
                  : "/images/featured-Project-image.svg"
            }
            width={500}
            height={500}
            alt="project image"
          />

          <div className="flex gap-1 items-center flex-wrap">
            <p className="text-[#5879DC] bg-[#ECF4FF] py-1 px-4 rounded-4xl font-medium text-sm">
              {projectDetails.categoryNameEn}
            </p>
            <p className="text-[#DF972A] bg-[#FCF4E8] py-1 px-4 rounded-4xl font-medium text-sm">
              {projectDetails.status === 1 ? "In Progress" : "Waiting"}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F2F4F5]">
            <h2 className="font-medium text-2xl mb-2">Summary</h2>
            <p className="text-[#717377] text-xl">
              {projectDetails.description || "No Description Provided"}
            </p>
          </div>

          <div>
            <h2 className="font-medium text-2xl m-4">Learning Steps</h2>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl flex p-4 gap-6 items-center border border-[#F0F0F0] drop-shadow-md"
                >
                  <p className="w-12 h-12 rounded-full bg-[#E3F7EC] flex items-center justify-center font-medium text-xl text-[#737F8E]">
                    {index + 1}
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-xl text-[#626C83]">
                      {task.nameEn || "Untitled Task"}
                    </p>
                    <div className="flex gap-2 items-center text-[#626C83]">
                      <p className="flex gap-2 items-center">
                        <CalendarIcon /> Due: {task.deadline || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-2 bg-white border text-[#40444C] border-[#F0F0F0] rounded-xl p-4 space-y-3 h-fit drop-shadow-md">
          <div className="flex gap-1 items-center">
            <p className="text-[#7E8CA0] bg-[#EEF0F3] py-1 px-4 rounded-4xl font-medium">
              {projectDetails.projectType === 1 ? "Team" : "Solo"}
            </p>
            <p className="text-[#41C980] bg-[#ECFAF2] py-1 px-4 rounded-4xl font-medium">
              Free
            </p>
          </div>

          <div className="pb-6 border-b border-[#E2E6EE]">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-3">
                <ClockIcon /> Duration
              </p>
              <p className="pl-0.5 font-medium text-xl">
                {projectDetails.durationNameEn}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="flex items-center gap-3">
                <CalendarCodeIcon height="20" width="20" /> Tools Needed
              </p>
              {tools.length > 0 ? (
                tools.map((tool) => (
                  <p key={tool.id} className="pl-0.5 font-medium text-xl">
                    {tool.nameEn}
                  </p>
                ))
              ) : (
                <p className="pl-0.5 font-medium text-gray-500">
                  No tools listed
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-3">
              <CalendarIcon height="16" width="16" /> Skills You'll Practice
            </p>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <p
                  key={skill.id}
                  className="flex items-center gap-3 text-[#626C83]"
                >
                  <CheckMarkIcon /> {skill.nameEn}
                </p>
              ))
            ) : (
              <p className="text-[#626C83]">No skills listed</p>
            )}
          </div>

          <Button
            className="w-full h-12"
            intent="primary"
            onClick={handleStartChallenge}
            disabled={isJoining}
          >
            {isJoining ? "Joining..." : "Start Challenge"}
          </Button>
        </div>
      </div>
    </div>
  );
};
