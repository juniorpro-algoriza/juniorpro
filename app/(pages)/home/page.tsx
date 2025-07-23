import {
  CTASection,
  HeroSection,
  HowItWorkSection,
  PremiumTasksSection,
  Projects,
  TestimonialsSection,
  TrustedOrganizationsSection,
} from "./components";

const HomePage = () => {
  return (
    <>
      {/* Background */}
      <div className="bg-linear-to-b h-[720px] absolute from-light-blue to-white inset-0 -z-10"></div>
      {/* Section 1: Hero Section */}
      <HeroSection />
      {/* Section 2: How It Works */}
      <HowItWorkSection />
      {/* Section 3: Premium Tasks */}
      <PremiumTasksSection />
      {/* Section 4: Featured Projects */}
      <Projects />
      {/* Section 5: Feedback Testimonials */}
      <TestimonialsSection />
      {/* Section 6: Trusted Organizations */}
      <TrustedOrganizationsSection />
      {/* Section 7: CTA Section */}
      <CTASection />
    </>
  );
};

export default HomePage;
