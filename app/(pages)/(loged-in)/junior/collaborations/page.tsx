"use client";
import React, { Suspense } from "react";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  Jumbotron,
  ProjectCard,
  SearchInput,
  Tabs,
  ModalLink,
} from "@components";
import { PATH_ICON } from "../../../../configs/constants";

import { JUNIOR_COLLABORATIONS } from "@data/juniorCollaborations";
import { OnboardingTourTrigger } from "../dashboard/_components";
type ButtonIntent = "main" | "main2" | undefined;

const JuniorCollaborations = () => {
  return (
    <>
      {/* Tour Trigger */}
      <Suspense fallback={null}>
        <OnboardingTourTrigger />
      </Suspense>

      {/* Breadcrumb */}
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/junior/dashboard" },
          { title: "Collaborations", href: "/junior/collaborations" },
        ]}
      />

      {/* Header */}
      <Jumbotron
        title="Team Collaborations"
        description="Foster teamwork, manage projects, and track collective progress."
        imageClassName="bg-[linear-gradient(135deg,rgba(198,210,255,0.8)0%,rgba(238,242,255,0.8)100%)]"
        imageSrc="/images/handOnHand.svg"
      />

      {/* Tabs & Content */}
      <Suspense
        fallback={<div className="p-10 text-center">Loading Projects...</div>}
      >
        <Tabs
          tabs={[
            {
              name: `All Projects (${JUNIOR_COLLABORATIONS.length})`,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {JUNIOR_COLLABORATIONS.map((collab, idx) => {
                    const isJoinAction = collab.status === "open";
                    const buttonText = isJoinAction
                      ? "Join Collaboration"
                      : "View Details";
                    const buttonIntent: ButtonIntent = isJoinAction
                      ? "main2"
                      : "main";

                    const CardContent = (
                      <ProjectCard
                        title={collab.title}
                        description={collab.description}
                        progress={collab.progress}
                        membersCurrent={
                          collab.rolesCount.total - collab.rolesCount.open
                        }
                        membersTotal={collab.rolesCount.total}
                        dateEnd={collab.dueDate
                          .split(" ")
                          .slice(0, 2)
                          .join(" ")}
                        iconSrc={
                          PATH_ICON[
                            collab.id.toString() as keyof typeof PATH_ICON
                          ] || PATH_ICON["1"]
                        }
                        type="collaboration"
                        rewards={
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 flex-wrap">
                            Each member will get{" "}
                            <span className="font-bold">
                              {collab.reward.amount} {collab.reward.currency}
                            </span>{" "}
                            after completion
                          </div>
                        }
                        buttonText={buttonText}
                        buttonIntent={buttonIntent}
                        buttonIcon={<ArrowRight size={20} />}
                      />
                    );

                    if (isJoinAction) {
                      return (
                        <ModalLink
                          key={idx}
                          name="JoinCollaboration"
                          query={{ id: collab.id }}
                          className="block h-full transition-transform hover:scale-[1.01]"
                        >
                          {CardContent}
                        </ModalLink>
                      );
                    }

                    return (
                      <Link
                        key={idx}
                        href={`/junior/collaborations/${collab.id}`}
                        className="block h-full transition-transform hover:scale-[1.01]"
                      >
                        {CardContent}
                      </Link>
                    );
                  })}
                </div>
              ),
            },
            {
              name: `Active Projects (${JUNIOR_COLLABORATIONS.filter((c) => c.status === "joined").length})`,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {JUNIOR_COLLABORATIONS.filter(
                    (c) => c.status === "joined"
                  ).map((collab, idx) => (
                    <Link
                      key={idx}
                      href={`/junior/collaborations/${collab.id}`}
                      className="block h-full transition-transform hover:scale-[1.01]"
                    >
                      <ProjectCard
                        title={collab.title}
                        description={collab.description}
                        progress={collab.progress}
                        membersCurrent={
                          collab.rolesCount.total - collab.rolesCount.open
                        }
                        membersTotal={collab.rolesCount.total}
                        dateEnd={collab.dueDate
                          .split(" ")
                          .slice(0, 2)
                          .join(" ")}
                        iconSrc={
                          PATH_ICON[
                            collab.id.toString() as keyof typeof PATH_ICON
                          ] || PATH_ICON["1"]
                        }
                        type="collaboration"
                        rewards={
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 flex-wrap">
                            Each member will get{" "}
                            <span className="font-bold">
                              {collab.reward.amount} {collab.reward.currency}
                            </span>{" "}
                            after completion
                          </div>
                        }
                        buttonText="View Details"
                        buttonIntent="main"
                        buttonIcon={<ArrowRight size={20} />}
                      />
                    </Link>
                  ))}
                </div>
              ),
            },
            {
              name: `Completed Projects (${JUNIOR_COLLABORATIONS.filter((c) => c.status === "completed").length})`,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {JUNIOR_COLLABORATIONS.filter(
                    (c) => c.status === "completed"
                  ).map((collab, idx) => (
                    <Link
                      key={idx}
                      href={`/junior/collaborations/${collab.id}`}
                      className="block h-full transition-transform hover:scale-[1.01]"
                    >
                      <ProjectCard
                        title={collab.title}
                        description={collab.description}
                        progress={100}
                        membersCurrent={collab.rolesCount.total}
                        membersTotal={collab.rolesCount.total}
                        dateEnd={collab.dueDate
                          .split(" ")
                          .slice(0, 2)
                          .join(" ")}
                        iconSrc={
                          PATH_ICON[
                            collab.id.toString() as keyof typeof PATH_ICON
                          ] || PATH_ICON["1"]
                        }
                        type="collaboration"
                        rewards={
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 flex-wrap">
                            Full Reward Distributed:{" "}
                            <span className="font-bold">
                              {collab.reward.amount} {collab.reward.currency}
                            </span>
                          </div>
                        }
                        buttonText="View History"
                        buttonIntent="main"
                        buttonIcon={<ArrowRight size={20} />}
                      />
                    </Link>
                  ))}
                </div>
              ),
            },
          ]}
        >
          <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full">
            <Suspense fallback={<div className="w-10 h-10" />}>
              <SearchInput
                placeholder="search collaboration..."
                className="min-w-[200px]"
              />
            </Suspense>
          </div>
        </Tabs>
      </Suspense>
    </>
  );
};

export default JuniorCollaborations;
