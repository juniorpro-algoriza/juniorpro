import { Header, Tip } from "@components/client";
import React from "react";
import StarGroup from "@public/images/3d-star-group.png";
import Code3d from "@public/images/code-3d.png";
import { MyCurrentPath, RecommendedForYou } from "./components";
import { Breadcrumb } from "@components";
const MyJourneyPage = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/junior/dashboard",
          },
          {
            title: "Learning Paths",
            href: "/junior/paths",
          },
        ]}
      />
      <Header
        title={`My Learning Journey`}
        description="Pick a path to start learning new superpowers!"
      />
      <div className="xl:w-4/5">
        <Tip
          title="Your Unique Path to Success!"
          description="Everyone learns at their own pace, and that's perfectly fine! These learning paths are designed just for you. Take your time with each mission, ask questions when you need help, and celebrate every step forward. You're building skills that will open doors to amazing opportunities!"
          image={StarGroup.src}
          className="gap-5 my-5"
          imageClassname="w-16"
        />
      </div>
      <MyCurrentPath
        paths={[
          {
            id: 1,
            image: Code3d.src,
            title: "Web Development Basics",
            description: "Learn HTML, CSS, and build your first websites",
            progress: 80,
            missions: 2,
            xp: 25,
            points: 12,
          },
        ]}
      />
      <RecommendedForYou
        paths={[
          {
            id: 2,
            image: Code3d.src,
            title: "Python Programming",
            description: "Connect your apps to real-world data and services",
            missions: 2,
            xp: 25,
            points: 12,
          },
          {
            id: 3,
            image: Code3d.src,
            title: "API Integration",
            description: "Connect your apps to real-world data and services",
            missions: 2,
            xp: 25,
            points: 12,
          },
        ]}
      />
    </>
  );
};

export default MyJourneyPage;
