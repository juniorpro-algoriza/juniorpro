import { Footer, Nav } from "@components";
import React from "react";
import { PricingPlans } from "./components/PricingPlans";
import { getPointsPlans, getProjects } from "@server";
// import { ProjectsCarousel } from "../home/components/ProjectsSection/ProjectCarousel";
import { Projects } from "./components/Projects";

const PricingPage = async () => {
  const plans = await getPointsPlans();
  const { data } = await getProjects({
    limit: 10,
    pageNum: 1,
    projectType: "all",
  });
  return (
    <>
      <Nav />
      <div className="xl:px-[91px]">
        <section
          style={{ boxShadow: "0px 4px 15px 0px #00000014" }}
          className="p-6 rounded-2xl space-y-6 mb-16 mt-12"
        >
          <PricingPlans plans={plans} />
          <Projects projects={data} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
