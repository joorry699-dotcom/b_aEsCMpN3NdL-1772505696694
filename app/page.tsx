import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import { SolutionsSection } from "@/components/solutions-section"
import ChannelsSection from "@/components/channels-section"
import BenefitsSection from "@/components/benefits-section"
import StrategiesSection from "@/components/strategies-section"
import ContactSection from "@/components/contact-section"
import ClientsSection from "@/components/clients-section"
import TestimonialsSection from "@/components/testimonials-section"
import { BlogList } from "@/components/blog-list"
import { FAQSection } from "@/components/faq-section"
import { CareersSection } from "@/components/careers-section"
import VideoSection from "@/components/video-section"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"

export default function Home() {
  return (
    <main className="bg-[#0b182f]">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <SolutionsSection />
      <ChannelsSection />
      <BenefitsSection />
      <StrategiesSection />
      <ContactSection />
      <ClientsSection />
      <TestimonialsSection />
      <BlogList />
      <FAQSection />
      <CareersSection />
      <Footer />
      <FloatingActions />
    </main>
  )
}
