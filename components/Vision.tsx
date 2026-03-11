"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Mail,
  Star,
  ArrowRight,
  Globe as GlobeIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Optimized CSS-based background
const StableBackground = () => (
  <div className="absolute inset-0 z-[1]">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] animate-pulse-slow"></div>
  </div>
);

// Load Globe with proper loading state
const World = dynamic(() => import("./ui/Globe").then((mod) => mod.World), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-orange-500 animate-spin"></div>
    </div>
  ),
});

const Vision = () => {
  const { scrollY } = useScroll({
    layoutEffect: false,
  });

  // Add clamp to prevent unnecessary calculations
  const y = useTransform(scrollY, [500, 680], [20, 0], { clamp: true });
  const opacity = useTransform(scrollY, [500, 680], [0, 1], { clamp: true });

  // Memoize globe configuration
  const globeConfig = useMemo(
    () => ({
      globeColor: "#111111",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      ambientLight: "#ffffff",
      directionalLeftLight: "#f97316",
      directionalTopLight: "#ffffff",
      pointLight: "#f97316",
    }),
    []
  );

  // Memoize globe data
  const globeData = useMemo(
    () => [
      {
        order: 1,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 37.7749,
        endLng: -122.4194,
        arcAlt: 0.3,
        color: "#f97316",
      },
      {
        order: 2,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 51.5074,
        endLng: -0.1278,
        arcAlt: 0.4,
        color: "#f97316",
      },
      {
        order: 3,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: -33.8688,
        endLng: 151.2093,
        arcAlt: 0.5,
        color: "#fb923c",
      },
      {
        order: 4,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.3,
        color: "#fdba74",
      },
      {
        order: 5,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: -23.5558,
        endLng: -46.6396,
        arcAlt: 0.4,
        color: "#f97316",
      },
    ],
    []
  );

  // Memoize default props
  const defaultGlobeProps = useMemo(
    () => ({
      pointSize: 1,
      showAtmosphere: true,
      atmosphereColor: "#ffffff",
      atmosphereAltitude: 0.1,
      polygonColor: "#111111",
      arcLength: 0.9,
      arcTime: 1000,
      rings: 3,
      maxRings: 3,
    }),
    []
  );

  return (
    <section className="relative w-full py-24 flex items-center justify-center text-white overflow-hidden">
      {/* CSS-based background */}
      <StableBackground />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-[2]" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-8 z-10">
        <motion.div
          className="max-w-2xl text-center md:text-left"
          style={{ y, opacity, willChange: "transform, opacity" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4">
            <div className="bg-white/10 backdrop-blur-sm text-xs font-medium text-orange-200 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <Star size={12} className="text-orange-400" />
              <span>Our Purpose</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            Our <span className="text-white/90">Vision</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed font-outfit">
            Empowering Students for Self-Awareness, Fearlessness, Joyful
            Learning, and Purposeful Research. Our vision is to create an
            educational environment that empowers students to become self-aware,
            free from fear of questioning, and purpose-driven individuals
            engaged in research fields by making youth enjoy the learning
            process.
          </p>

          <p className="mt-4 font-semibold text-lg text-orange-200 font-outfit">
            - Vyuha Student Community
          </p>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
            <Link
              href={"/join"}
              className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium font-outfit transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-105 hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                Join The Revolution
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/anantha_vyuha?igsh=MWxybWlmcmV2M2po"
                className="text-white hover:text-orange-400 transition-colors hover:scale-110"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/venkat-kalyan-4239ba21a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="text-white hover:text-orange-400 transition-colors hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:founder@ivyuha.com"
                className="text-white hover:text-orange-400 transition-colors hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 md:mt-0 md:ml-12 flex-shrink-0 relative">
          <div className="relative h-[350px] w-[350px] hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur-md animate-pulse-slow"></div>

            {/* Globe component */}
            <div className="relative z-10 h-full w-full">
              <World
                globeConfig={globeConfig}
                data={globeData}
                defaultProps={defaultGlobeProps}
              />
            </div>

            {/* Small badge */}
            <div className="absolute -top-4 -right-4 p-2 rounded-full bg-[#0c0c0ccc] backdrop-blur-sm border border-white/10 shadow-lg">
              <div className="h-[50px] w-[50px] flex items-center justify-center">
                <GlobeIcon size={30} className="text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
