"use client";
import React from "react";
import Link from "next/link";

import { ArrowRight, Plus } from "lucide-react";
import {
  Breadcrumb,
  Button,
  Jumbotron,
  ProjectCard,
  SearchInput,
  Tabs,
} from "@components";
import { PATH_ICON } from "../../../../configs/constants";

/**
 * Mock Data for the collaborations
 * Creating 2 cards as seen in the screenshot
 */
const COLLABORATIONS = [
  {
    id: 1,
    title: "Web Development Basics",
    description: "Learn HTML, CSS, and build your first websites",
    progress: 60,
    price: 100,
    currency: "SAR",
    membersCurrent: 2,
    membersTotal: 4,
    dateStart: "Oct 15",
    dateEnd: "Nov 25",
  },
  {
    id: 2,
    title: "Web Development Basics",
    description: "Learn HTML, CSS, and build your first websites",
    progress: 60,
    price: 100,
    currency: "SAR",
    membersCurrent: 2,
    membersTotal: 4,
    dateStart: "Oct 15",
    dateEnd: "Nov 25",
  },
];

const Collaborations = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Collaborations", href: "/admin/collaborations" },
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
      <Tabs
        tabs={[
          {
            name: `All Projects (${COLLABORATIONS.length})`,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COLLABORATIONS.map((collab, idx) => (
                  <Link
                    key={idx}
                    href={`/admin/collaborations/${collab.id}`}
                    className="block h-full transition-transform hover:scale-[1.01]"
                  >
                    <ProjectCard
                      title={collab.title}
                      description={collab.description}
                      progress={collab.progress}
                      membersCurrent={collab.membersCurrent}
                      membersTotal={collab.membersTotal}
                      dateEnd={collab.dateEnd}
                      iconSrc={
                        PATH_ICON[
                          collab.id.toString() as keyof typeof PATH_ICON
                        ] || PATH_ICON["1"]
                      }
                      type="collaboration"
                      rewards={
                        <>
                          Each member will get{" "}
                          <span className="font-bold">
                            {collab.price} {collab.currency}
                          </span>{" "}
                          after completion
                        </>
                      }
                      buttonText="Edit Path"
                      buttonIntent="main"
                      buttonIcon={<ArrowRight size={20} />}
                    />
                  </Link>
                ))}
              </div>
            ),
          },
          {
            name: `Active Projects (0)`,
            content: (
              <div className="text-gray-500 py-10 text-center font-medium">
                No active projects found.
              </div>
            ),
          },
          {
            name: "Completed Projects",
            content: (
              <div className="text-gray-500 py-10 text-center font-medium">
                No completed projects found.
              </div>
            ),
          },
        ]}
      >
        <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full">
          <SearchInput
            placeholder="search collaboration..."
            className="min-w-[200px]"
          />
          <Link href="/admin/collaborations/create" className=" ">
            <Button
              intent="main2"
              size="mainDefault"
              icon={<Plus size={18} />}
              className="mb-2 w-full"
            >
              New Collaboration
            </Button>
          </Link>
        </div>
      </Tabs>
    </>
  );
};

export default Collaborations;
