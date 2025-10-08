import {
  CTASection,
  HeroSection,
  HowItWorkSection,
  PremiumTasksSection,
  TestimonialsSection,
  TrustedOrganizationsSection,
} from "./components";
import { ProjectsSection } from "./components/ProjectsSection";

export default async function HomePage() {
  return (
    <>
      {/* Background */}
      <div className="bg-linear-to-b h-[720px] absolute from-light-blue to-white inset-0 -z-10"></div>
      {/* Section 1: Hero Section */}
      <HeroSection />
      {/* Section 2: How It Works */}
      <section id="how-it-works">
        <HowItWorkSection />
      </section>
      {/* Section 3: Premium Tasks */}
      <PremiumTasksSection />
      {/* Section 4: Featured Projects */}
      <section id="projects">
        <ProjectsSection />
      </section>
      {/* Section 5: Feedback Testimonials */}
      <TestimonialsSection />
      {/* Section 6: Trusted Organizations */}
      <section id="trusted-orgs">
        <TrustedOrganizationsSection />
      </section>
      {/* Section 7: CTA Section */}
      <CTASection />
    </>
  );
}
