import React, { Suspense } from "react";
import { Header, PathCard } from "@components/client";
import { Button } from "@components";
import { Plus } from "lucide-react";
import { PathsFilters } from "./components";
import ShootingStarImage from "@public/images/shooting-star.png";

const PathsPage = () => {
  return (
    <>
      <Header
        title="Path Management"
        description="Create, organize, and track structured learning journeys for your juniors."
        end={
          <Button intent="main2" size="mainDefault">
            <Plus className="size-4" />
            New Path
          </Button>
        }
      />
      <div className="xl:max-w-4/5 space-y-5 md:mt-10">
        <Suspense
          fallback={
            <div className="h-12 animate-pulse bg-gray-100 rounded-2xl" />
          }
        >
          <PathsFilters />
        </Suspense>
        <div className="grid md:grid-cols-2 gap-5">
          {paths.map((path) => (
            <PathCard key={path.id} path={path} userType="admin" />
          ))}
        </div>
      </div>
    </>
  );
};

export default PathsPage;

const paths = [
  {
    id: 2,
    image: ShootingStarImage.src,
    title: "Python Programming",
    description: "Connect your apps to real-world data and services",
    includes: {
      missions: 2,
      collaborations: 3,
    },
  },
  {
    id: 3,
    image: ShootingStarImage.src,
    title: "API Integration",
    description: "Connect your apps to real-world data and services",
    includes: {
      missions: 2,
      collaborations: 3,
    },
  },
];
