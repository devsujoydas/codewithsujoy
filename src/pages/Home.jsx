import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/layout/Navbar";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import EducationSection from "../components/sections/EducationSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import SkillsSection from "../components/sections/SkillsSection";
import BlogSection from "../components/sections/BlogSection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/layout/CustomCursor";
import BackToTop from "../components/layout/BackToTop";
import HeroSection from "../components/sections/HeroSection";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main role="main" aria-label="Main content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <SkillsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Home;
