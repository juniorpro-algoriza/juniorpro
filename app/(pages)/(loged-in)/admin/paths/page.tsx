import React, { Suspense } from "react";
import { Header, PathCard } from "@components/client";
import { Breadcrumb, Button } from "@components";
import { Plus } from "lucide-react";
import { PathsFilters } from "./components";
import Code3DImage from "@public/images/code-3d.png";
import Link from "next/link";

const PathsPage = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Learning Paths",
            href: "/admin/paths",
          },
        ]}
      />
      <Header
        title="Path Management"
        description="Create, organize, and track structured learning journeys for your juniors."
        end={
          <Link href="/admin/paths/new-path">
            <Button intent="main2" size="mainDefault">
              <Plus className="size-4" />
              New Path
            </Button>
          </Link>
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
    image: Code3DImage.src,
    title: "Python Programming",
    description: "Connect your apps to real-world data and services",
    missions: 2,
    xp: 25,
    points: 12,
  },
  {
    id: 3,
    image: Code3DImage.src,
    title: "API Integration",
    description: "Connect your apps to real-world data and services",
    missions: 2,
    xp: 25,
    points: 12,
  },
];
