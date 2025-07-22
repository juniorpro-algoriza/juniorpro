
import {
  CTASection,
  FeaturedProjectsSection,
  HeroSection,
  HowItWorkSection,
  PremiumTasksSection,
  TestimonialsSection,
  TrustedOrganizationsSection,
} from './sections';

const HomePage = () => {
  return (
    <main>
      {/* Background */}
      <div className='bg-linear-to-b fixed from-light-blue to-white inset-0 -z-10'></div>

      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: How It Works */}
      <HowItWorkSection />

      {/* Section 3: Premium Tasks */}
      <PremiumTasksSection />

      {/* Section 4: Featured Projects */}
      <FeaturedProjectsSection />

      {/* Section 5: Feedback Testimonials */}
      <TestimonialsSection />

      {/* Section 6: Trusted Organizations */}
      <TrustedOrganizationsSection />

      {/* Section 7: CTA Section */}
      <CTASection />
    </main>
  );
};

export default HomePage;
