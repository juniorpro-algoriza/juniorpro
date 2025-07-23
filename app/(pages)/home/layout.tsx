import type { ReactNode } from "react";
import {
  CTASection,
  HeroSection,
  HowItWorkSection,
  PremiumTasksSection,
  ProjectsTabs,
  TestimonialsSection,
  TrustedOrganizationsSection,
} from "./components";

interface HomePageLayoutProps {
  children: ReactNode;
  projects: ReactNode;
}

const HomePageLayout = ({
  // children,
  projects,
}: Readonly<HomePageLayoutProps>) => {
  return (
    <>
      {/* Background */}
      <div className="bg-linear-to-b fixed from-light-blue to-white inset-0 -z-10"></div>

      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: How It Works */}
      <HowItWorkSection />

      {/* Section 3: Premium Tasks */}
      <PremiumTasksSection />

      {/* Section 4: Featured Projects */}

      <ProjectsTabs />
      {projects}

      {/* Section 5: Feedback Testimonials */}
      <TestimonialsSection />

      {/* Section 6: Trusted Organizations */}
      <TrustedOrganizationsSection />

      {/* Section 7: CTA Section */}
      <CTASection />
    </>
  );
};

export default HomePageLayout;
