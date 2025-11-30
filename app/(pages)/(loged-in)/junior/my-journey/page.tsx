import { Header, Tip } from "@components/client";
import React from "react";
import ShootingStarImage from "@public/images/shooting-star.png";
import { MyCurrentPath, RecommendedForYou } from "./components";
const MyJourneyPage = () => {
  return (
    <>
      <Header
        title={`My Learning Journey`}
        description="Pick a path to start learning new superpowers!"
      />
      <Tip
        title="Your Unique Path to Success!"
        description="Everyone learns at their own pace, and that's perfectly fine! These learning paths are designed just for you. Take your time with each mission, ask questions when you need help, and celebrate every step forward. You're building skills that will open doors to amazing opportunities!"
        image={ShootingStarImage.src}
        className="gap-5 pb-7 my-5"
      />
      <MyCurrentPath
        paths={[
          {
            id: 1,
            image: ShootingStarImage.src,
            title: "Web Development Basics",
            description: "Learn HTML, CSS, and build your first websites",
            progress: 80,
          },
        ]}
      />
      <RecommendedForYou
        paths={[
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
            id:3,
            image: ShootingStarImage.src,
            title: "API Integration",
            description: "Connect your apps to real-world data and services",
            includes: {
              missions: 2,
              collaborations: 3,
            },
          },
        ]}
      />
    </>
  );
};

export default MyJourneyPage;
