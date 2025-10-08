export const dynamic = "force-dynamic";

import React from "react";
import { PricingPlans } from "./components/PricingPlans";
// import { getPointsPlans, getProjects } from "@server";
import { getPointsPlans } from "@server";
// import { ProjectsCarousel } from "../home/components/ProjectsSection/ProjectCarousel";
import { Projects } from "./components/Projects";
import { Points } from "./components/Points";
import { getLandingProjects } from "../home/server";

const PricingPage = async () => {
  const plans = await getPointsPlans();
  const { data } = await getLandingProjects({
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <div className="xl:px-[91px]">
      <section
        style={{ boxShadow: "0px 4px 15px 0px #00000014" }}
        className="p-6 rounded-2xl mt-4"
      >
        <Points />
      </section>
      <section
        style={{ boxShadow: "0px 4px 15px 0px #00000014" }}
        className="p-6 rounded-2xl space-y-6 mb-16 mt-6"
      >
        <PricingPlans plans={plans} />
        <Projects projects={data} />
      </section>
    </div>
  );
};

export default PricingPage;
