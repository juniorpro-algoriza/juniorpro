"use client";
import { Button, Input, MainCard, Textarea } from "@components";
import { Tip } from "@components/client";
import React from "react";
import LambImage from "@public/images/lamb.png";
import { ExternalLink, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RocketImage from "@public/images/rocket-icon.png";

export const SubmitYourWork = ({
  isSubmitted = false,
}: {
  isSubmitted?: boolean;
}) => {
  const router = useRouter();

  return !isSubmitted ? (
    <MainCard>
      <form>
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
          />
          <Textarea
            label="Additional Notes (Optional)"
            name="notes"
            placeholder="Describe your solution, challenges you faced, or anything else you'd like to share..."
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
          type="button"
          intent="main2"
          size="mainLg"
          className="w-full"
          onClick={() => router.push("/modal/MissionCompleted")}
        >
          Submit Mission
        </Button>
      </form>
    </MainCard>
  ) : (
    <MainCard classname=" space-y-5">
      <div className="flex md:flex-row flex-col md:items-center gap-5">
        <div className="p-3 shrink-0 rounded-2xl bg-gray-50 w-fit">
          <Image
            src={RocketImage}
            alt="Rocket Icon"
            className="w-[40px] relative z-10"
            width={40}
            height={40}
          />
        </div>
        <div className="space-y-1">
          <h2 className="md:text-2xl text-lg font-semibold">
            Mission Submitted!
          </h2>
          <p className="md:text-base text-sm text-gray-600 font-medium">
            Great work! Your code has been received. Compare your solution below
            to learn from our reference implementation.
          </p>
        </div>
      </div>
      <MainCard classname=" space-y-2 ">
        <p className="text-13 text-blue-main font-bold">Your Submission</p>
        <MainCard classname=" flex  gap-3 md:flex-row flex-col md:items-center shadow-none">
          <div className="p-3 rounded-2xl bg-dark-blue-main/10 text-dark-blue-main w-fit h-fit">
            <ExternalLink className="size-5" />
          </div>
          <div>
            <p className="font-medium break-all">
              https://react-icons.github.io/react-icons/search/#q=video%20conf
            </p>
            <p className="text-13 text-gray-600">Click to view</p>
          </div>
        </MainCard>
      </MainCard>
    </MainCard>
  );
};
