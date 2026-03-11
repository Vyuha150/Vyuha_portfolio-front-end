"use client";

import React from "react";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Achievements from "../components/Achievements";
import Services from "@/components/Services";
import AnimatedTestimonials from "@/components/ui/AnimatedTestimonals";
import testimonialData from "@/data";
import Cta from "@/components/CTA";
import SocialMedia from "@/components/SocialMedia";
import JourneySection from "@/components/JourneySection";
import KnowMoreSection from "@/components/KnowMoreSection";
import OrangeParticles from "@/components/OrangeParticles";

const Page = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      {/* Orange Particles Background */}
      <OrangeParticles />

      <Hero />
      <JourneySection />
      <Vision />
      <Achievements />
      <Services />
      <AnimatedTestimonials testimonials={testimonialData} autoplay={true} />
      <KnowMoreSection />
      <Cta />
      <SocialMedia />
    </div>
  );
};

export default Page;
