import HeroSection from "@/components/hero-section"
import AboutUs from "@/components/about-us"
import Services from "@/components/services"
import Process from "@/components/process"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import ContactCta from "@/components/contact-cta"
import Partners from "@/components/partners"
import GroupCompanies from "@/components/group-companies"
import Projects from "@/components/projects"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutUs />
      <Services />
      <GroupCompanies />
      <Projects />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <Partners />
      <ContactCta />
    </div>
  )
}
