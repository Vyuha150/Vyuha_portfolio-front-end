"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Megaphone, Lightbulb, Laptop } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  subServices: string[];
  link?: string;
}

// Optimized background with reduced complexity
const BackgroundEffects = React.memo(() => (
  <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
    <style jsx>{`
      .glow-1,
      .glow-2 {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        will-change: transform, opacity;
      }
      .glow-1 {
        top: 33%;
        left: 50%;
        width: 500px;
        height: 500px;
        background: rgba(249, 115, 22, 0.1);
        transform: translateX(-50%);
        animation: pulse1 12s infinite ease-in-out;
      }
      .glow-2 {
        bottom: 25%;
        right: 25%;
        width: 300px;
        height: 300px;
        background: rgba(249, 115, 22, 0.1);
        animation: pulse2 12s 2s infinite ease-in-out;
      }
      @keyframes pulse1 {
        0%,
        100% {
          opacity: 0.25;
          transform: translateX(-50%) scale(0.85);
        }
        50% {
          opacity: 0.4;
          transform: translateX(-50%) scale(1);
        }
      }
      @keyframes pulse2 {
        0%,
        100% {
          opacity: 0.15;
          transform: scale(1);
        }
        50% {
          opacity: 0.3;
          transform: scale(0.9);
        }
      }
    `}</style>
    <div className="glow-1"></div>
    <div className="glow-2"></div>
  </div>
));
BackgroundEffects.displayName = "BackgroundEffects";

// Modern ServiceCard with focused external beam glow and scale effects
const ServiceCard = React.memo(
  ({ service, index }: { service: Service; index: number }) => (
    <motion.div
      className="bg-transparent backdrop-blur-sm border border-orange-500/30 shadow-2xl relative overflow-hidden hover:shadow-orange-500/25 hover:shadow-2xl hover:scale-105 transition-all animate-pulse-glow rounded-xl p-6 h-full
                 hover:border-orange-500/40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon and title section */}
        <div className="mb-6">
          {/* Icon container */}
          <div
            className="w-16 h-16 mb-4 rounded-2xl bg-transparent
                          border border-orange-500/30 flex items-center justify-center
                          group-hover:border-orange-400/50 transition-all duration-500
                          group-hover:scale-110"
          >
            <div className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
              {service.icon}
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-2xl font-bold text-white font-outfit leading-tight
                         group-hover:text-orange-50 transition-colors duration-300"
          >
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-gray-300 font-outfit leading-relaxed mb-6 flex-grow
                      group-hover:text-gray-200 transition-colors duration-300"
        >
          {service.description}
        </p>

        {/* Sub-services */}
        <div className="mb-6">
          <h4
            className="text-sm font-semibold text-orange-400 mb-3 font-outfit tracking-wide uppercase
                         group-hover:text-orange-300 transition-colors duration-300"
          >
            What We Offer
          </h4>
          <div className="space-y-3">
            {service.subServices.map((subService, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 group/item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
              >
                <div
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 
                                group-hover/item:scale-125 transition-all duration-300"
                ></div>
                <span
                  className="text-gray-300 font-outfit text-sm group-hover/item:text-white 
                                transition-colors duration-300"
                >
                  {subService}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action buttons with scale effects */}
        <div className="mt-auto pt-4 border-t border-orange-500/10 group-hover:border-orange-500/30 transition-colors duration-300">
          {index === 0 ? (
            // First service gets two buttons
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/podcast-partner"
                className="flex items-center justify-center gap-2 px-4 py-3 
                           bg-transparent border border-orange-500/30 rounded-xl text-orange-400 font-medium text-sm
                           hover:border-orange-500/50 hover:text-orange-300 
                           transition-all duration-300 hover:scale-105"
              >
                <span>Podcasts</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 px-4 py-3 
                           bg-transparent border border-orange-500/30 rounded-xl text-orange-400 font-medium text-sm
                           hover:border-orange-500/50 hover:text-orange-300 
                           transition-all duration-300 hover:scale-105"
              >
                <span>Projects</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ) : (
            // Other services get single button
            <Link
              href="/projects"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 
                         bg-transparent border border-orange-500/30 rounded-xl text-orange-400 font-medium
                         hover:border-orange-500/50 hover:text-orange-300 
                         transition-all duration-300 hover:scale-105"
            >
              <span>View Projects</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
);
ServiceCard.displayName = "ServiceCard";

// Optimized CTA Button component
const CTAButton = React.memo(
  ({
    text,
    onClick,
    icon = true,
    className = "",
  }: {
    text: string;
    onClick?: () => void;
    icon?: boolean;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium font-outfit transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {text}
        {icon && (
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        )}
      </span>
    </button>
  )
);
CTAButton.displayName = "CTAButton";

const Services = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // More optimized transforms with proper clamping
  const y = useTransform(scrollYProgress, [0, 0.3], [20, 0], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1], {
    clamp: true,
  });

  // Memoize services data
  const services = useMemo<Service[]>(
    () => [
      {
        title: "Branding and Consulting",
        description:
          "Comprehensive solutions to build and grow your brand with strategic approach.",
        icon: <Lightbulb className="w-8 h-8 text-orange-400" />,
        subServices: [
          "Business Strategy",
          "Branding",
          "Consulting",
          "Digital Marketing",
        ],
      },
      {
        title: "IT Services",
        description:
          "Complete technology solutions for modern business requirements.",
        icon: <Laptop className="w-8 h-8 text-orange-400" />,
        subServices: ["Web Services", "App Development"],
      },
      {
        title: "Marketing",
        description:
          "Strategic marketing solutions to reach and engage your target audience effectively.",
        icon: <Megaphone className="w-8 h-8 text-orange-400" />,
        subServices: ["Events", "Conferences"],
      },
    ],
    []
  );

  // Memoized event handlers
  const handleGetStarted = useCallback(() => {
    router.push("/membership");
  }, [router]);

  const [consultOpen, setConsultOpen] = React.useState(false);

  const handleConsultation = useCallback(() => {
    setConsultOpen(true);
  }, []);

  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden min-h-screen"
    >
      <BackgroundEffects />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-[2] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y, opacity }}
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="bg-white/10 backdrop-blur-sm text-xs font-medium text-orange-200 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <Star size={12} className="text-orange-400" />
              <span>Our Expertise</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            Services <span className="text-white/90">We Provide</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-lg font-outfit">
            From strategy development to implementation and support, our
            services help your business thrive.
          </p>
        </div>

        {/* Services grid with optimized rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA section with optimized animation */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 p-8 md:p-10 rounded-2xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-outfit">
                Ready to transform your ideas into reality?
              </h3>
              <p className="mt-2 text-gray-300 font-outfit">
                Partner with Vyuha to bring your vision to life with our
                expertise.
              </p>
            </div>

            <CTAButton
              text="Get Started"
              onClick={handleGetStarted}
              className="flex-shrink-0 w-full md:w-auto"
            />
          </div>
        </motion.div>

        {/* Bottom CTA button */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* <CTAButton
            text="View Projects"
            onClick={() => router.push("/projects")}
          /> */}
          <CTAButton
            text="Schedule a Consultation"
            onClick={handleConsultation}
          />
          <ConsultationForm open={consultOpen} onOpenChange={setConsultOpen} />
        </div>
      </motion.div>

      {/* Consultation Form Dialog */}
      <ConsultationForm open={openDialog} onOpenChange={setOpenDialog} />
    </section>
  );
};

function ConsultationForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { register, handleSubmit, reset, formState } = useForm();
  const onSubmit = (data: any) => {
    // TODO: Send data to your API
    alert("Consultation request submitted!");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-black/50 text-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Schedule a Consultation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("name", { required: true })}
            placeholder="Your Name"
            required
          />
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Your Email"
            required
          />
          <Input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            required
          />
          <Input
            {...register("preferredTime", { required: true })}
            type="datetime-local"
            placeholder="Preferred Time Slot"
            required
          />
          <Textarea
            {...register("message")}
            placeholder="Describe your requirements (optional)"
          />
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-orange-500 text-white"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Services;
