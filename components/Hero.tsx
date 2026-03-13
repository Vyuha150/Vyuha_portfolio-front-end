"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ArrowRight,
  Users,
  Lightbulb,
  Target,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Import GridOverlay directly
import { GridOverlay } from "./shared/GridOverlay";

// Image stack data
const stackImages = [
  "/portfolio/achievement2.jpg",
  "/clubs/club1.jpg",
  "/portfolio/achievement1.jpg",
  "/portfolio/achievement3.jpg",
  "/clubs/club2.jpg",
];

const stackProductNames = [
  "Innovation Hub",
  "Tech Events",
  "Mentorship",
  "Workshops",
  "Networking",
];

const stackProductRoutes = [
  "/events",
  "/events",
  "/mentorship",
  "/events",
  "/contact",
];

// Decorative connection lines component with multiple colors - longer and more elegant
function ConnectionLines({ animate }: { animate: boolean }) {
  return (
    <div className="w-full h-full z-[2] pointer-events-none">
      {/* Multi-colored connection lines flowing from single point to icons */}
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Purple line - connects from top convergence point through image to icon */}
        <motion.path
          d="M 50 15 L 70 45 Q 50 50 30 55 Q 20 60 15 70 L 15 95"
          stroke="url(#purpleGradient)"
          strokeWidth="0.4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? { pathLength: 1, opacity: 0.9 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 3, delay: 0.5 }}
        />

        {/* Orange line - connects from top convergence point through image to icon */}
        <motion.path
          d="M 52 15 L 72 47 Q 55 52 45 57 Q 40 62 35 70 L 35 95"
          stroke="url(#orangeGradient)"
          strokeWidth="0.4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? { pathLength: 1, opacity: 0.9 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 3, delay: 0.8 }}
        />

        {/* Teal line - connects from top convergence point through image to icon */}
        <motion.path
          d="M 54 15 L 74 49 Q 70 54 68 59 Q 66 64 65 70 L 65 95"
          stroke="url(#tealGradient)"
          strokeWidth="0.4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? { pathLength: 1, opacity: 0.9 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 3, delay: 1.1 }}
        />

        {/* Pink line - connects from top convergence point through image to icon */}
        <motion.path
          d="M 56 15 L 76 51 Q 80 56 82 61 Q 84 66 85 70 L 85 95"
          stroke="url(#pinkGradient)"
          strokeWidth="0.4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? { pathLength: 1, opacity: 0.9 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 3, delay: 1.4 }}
        />

        {/* Multi-colored gradient definitions */}
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.8)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
            <stop offset="100%" stopColor="rgba(196, 181, 253, 0.4)" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.8)" />
            <stop offset="50%" stopColor="rgba(251, 146, 60, 0.6)" />
            <stop offset="100%" stopColor="rgba(253, 186, 116, 0.4)" />
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.8)" />
            <stop offset="50%" stopColor="rgba(45, 212, 191, 0.6)" />
            <stop offset="100%" stopColor="rgba(153, 246, 228, 0.4)" />
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.8)" />
            <stop offset="50%" stopColor="rgba(244, 114, 182, 0.6)" />
            <stop offset="100%" stopColor="rgba(251, 207, 232, 0.4)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Multi-colored floating icons hanging at the end of connecting lines like ornaments
const FloatingIcons = () => (
  <div className="relative w-full h-16">
    {/* Icon 1 - Users (purple theme) - positioned at 15% */}
    <motion.div
      className="absolute left-[15%] w-14 h-14 bg-purple-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-purple-400/20 shadow-lg shadow-purple-500/10 transform -translate-x-1/2"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, 8, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: 3.5, ease: "easeOut" },
        scale: { duration: 0.6, delay: 3.5, ease: "easeOut" },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 4 },
      }}
    >
      <Users className="w-7 h-7 text-purple-400" />
    </motion.div>

    {/* Icon 2 - Lightbulb (orange theme) - positioned at 35% */}
    <motion.div
      className="absolute left-[35%] w-14 h-14 bg-orange-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-orange-400/20 shadow-lg shadow-orange-500/10 transform -translate-x-1/2"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, 10, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: 3.8, ease: "easeOut" },
        scale: { duration: 0.6, delay: 3.8, ease: "easeOut" },
        y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 4.3 },
      }}
    >
      <Lightbulb className="w-7 h-7 text-orange-400" />
    </motion.div>

    {/* Icon 3 - Target (teal theme) - positioned at 65% */}
    <motion.div
      className="absolute left-[65%] w-14 h-14 bg-teal-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-teal-400/20 shadow-lg shadow-teal-500/10 transform -translate-x-1/2"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, 6, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: 4.1, ease: "easeOut" },
        scale: { duration: 0.6, delay: 4.1, ease: "easeOut" },
        y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 4.6 },
      }}
    >
      <Target className="w-7 h-7 text-teal-400" />
    </motion.div>

    {/* Icon 4 - Message (pink theme) - positioned at 85% */}
    <motion.div
      className="absolute left-[85%] w-14 h-14 bg-pink-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-pink-400/20 shadow-lg shadow-pink-500/10 transform -translate-x-1/2"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, 12, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay: 4.4, ease: "easeOut" },
        scale: { duration: 0.6, delay: 4.4, ease: "easeOut" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 4.9 },
      }}
    >
      <MessageCircle className="w-7 h-7 text-pink-400" />
    </motion.div>
  </div>
);

// Clean floating icons positioned perfectly at bottom
// const FloatingIcons = () => (
//   <div className="absolute inset-0 z-[3] pointer-events-none">
//     {/* Icon 1 - Users (perfectly aligned) */}
//     <motion.div
//       className="absolute left-[15%] bottom-[5%] w-12 h-12 bg-orange-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-orange-400/20 shadow-lg shadow-orange-500/10"
//       initial={{ opacity: 0, scale: 0, y: 20 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 3.5, ease: "easeOut" }}
//     >
//       <Users className="w-6 h-6 text-orange-400" />
//     </motion.div>

//     {/* Icon 2 - Lightbulb (perfectly aligned) */}
//     <motion.div
//       className="absolute left-[35%] bottom-[5%] w-12 h-12 bg-orange-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-orange-400/20 shadow-lg shadow-orange-500/10"
//       initial={{ opacity: 0, scale: 0, y: 20 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 3.8, ease: "easeOut" }}
//     >
//       <Lightbulb className="w-6 h-6 text-orange-400" />
//     </motion.div>

//     {/* Icon 3 - Target (perfectly aligned) */}
//     <motion.div
//       className="absolute right-[35%] bottom-[5%] w-12 h-12 bg-orange-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-orange-400/20 shadow-lg shadow-orange-500/10"
//       initial={{ opacity: 0, scale: 0, y: 20 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 4.1, ease: "easeOut" }}
//     >
//       <Target className="w-6 h-6 text-orange-400" />
//     </motion.div>

//     {/* Icon 4 - Message (perfectly aligned) */}
//     <motion.div
//       className="absolute right-[15%] bottom-[5%] w-12 h-12 bg-orange-500/15 backdrop-blur-md rounded-xl flex items-center justify-center border border-orange-400/20 shadow-lg shadow-orange-500/10"
//       initial={{ opacity: 0, scale: 0, y: 20 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 4.4, ease: "easeOut" }}
//     >
//       <MessageCircle className="w-6 h-6 text-orange-400" />
//     </motion.div>
//   </div>
// );

// Original VYUHA background with orange theme
const StableBackground = () => (
  <div className="absolute inset-0 z-[1] overflow-hidden">
    <style jsx>{`
      .glow-1,
      .glow-2,
      .glow-3 {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.4;
      }
      .glow-1 {
        top: 33%;
        left: 50%;
        width: 600px;
        height: 600px;
        background: rgba(249, 115, 22, 0.15);
        transform: translateX(-50%);
        animation: subtlePulse 10s infinite ease-in-out;
      }
      .glow-2 {
        bottom: 25%;
        right: 25%;
        width: 300px;
        height: 300px;
        background: rgba(249, 115, 22, 0.1);
        animation: subtlePulse 8s 1s infinite ease-in-out;
      }
      .glow-3 {
        top: 60%;
        left: 20%;
        width: 400px;
        height: 400px;
        background: rgba(251, 146, 60, 0.08);
        animation: subtlePulse 12s 2s infinite ease-in-out;
      }
      @keyframes subtlePulse {
        0%,
        100% {
          opacity: 0.4;
        }
        50% {
          opacity: 0.5;
        }
      }
    `}</style>
    <div className="glow-1"></div>
    <div className="glow-2"></div>
    <div className="glow-3"></div>
  </div>
);

// Optimized scroll effect hook
const useOptimizedScrollEffect = () => {
  const [scrollValues, setScrollValues] = useState({
    opacity: 1,
    y: 0,
    scale: 1,
  });

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Calculate new values only if we've scrolled a significant amount
          if (Math.abs(currentScrollY - lastScrollY) > 5) {
            const newOpacity = Math.max(0, 1 - currentScrollY / 500);
            const newY = currentScrollY * 0.2;
            const newScale = Math.max(0.8, 1 - currentScrollY / 2000);

            setScrollValues({
              opacity: newOpacity,
              y: newY,
              scale: newScale,
            });

            lastScrollY = currentScrollY;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollValues;
};

export default function Hero() {
  const { opacity, y, scale } = useOptimizedScrollEffect();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [linesAnimated, setLinesAnimated] = useState(false);
  const router = useRouter();

  // Image stack state
  const [center, setCenter] = useState(2);

  // Infinite loop effect (auto-play)
  useEffect(() => {
    const interval = setInterval(() => {
      setCenter((prev) => (prev + 1) % stackImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Get indices for left2, left, center, right, right2
  const getIndices = () => {
    const left2 = (center - 2 + stackImages.length) % stackImages.length;
    const left = (center - 1 + stackImages.length) % stackImages.length;
    const right = (center + 1) % stackImages.length;
    const right2 = (center + 2) % stackImages.length;
    return [left2, left, center, right, right2];
  };
  const [left2Idx, leftIdx, centerIdx, rightIdx, right2Idx] = getIndices();

  // Manual navigation
  const goLeft = () => {
    setCenter((prev) => (prev - 1 + stackImages.length) % stackImages.length);
  };
  const goRight = () => {
    setCenter((prev) => (prev + 1) % stackImages.length);
  };

  // Start connection lines animation on first scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!linesAnimated && window.scrollY > 0) {
        setLinesAnimated(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoize button interaction handlers
  const handleDiscoverHover = useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget.querySelector(".arrow-icon") as HTMLElement;
    if (target) target.style.transform = "translateX(4px)";
  }, []);

  const handleDiscoverLeave = useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget.querySelector(".arrow-icon") as HTMLElement;
    if (target) target.style.transform = "translateX(0)";
  }, []);

  // Mark animation as complete after initial render
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col text-white overflow-x-hidden z-[10] mt-5">
      {/* Original VYUHA background */}
      {/* <StableBackground /> */}

      {/* Grid overlay */}
      <GridOverlay />

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center">
        {/* Main container with two-column layout */}
        <div className="z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center w-full">
            {/* Left Content */}
            <motion.div
              className="space-y-8 order-1 lg:order-none"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                opacity: hasAnimated ? opacity : 1,
                transform: hasAnimated
                  ? `translateY(${y}px) scale(${scale})`
                  : "translateY(0) scale(1)",
                willChange: "transform, opacity",
              }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-sm font-medium text-orange-200 px-4 py-2 rounded-full border border-white/10">
                  <Star size={14} className="text-orange-400" />
                  <span>Inspiring Next-Gen Innovators</span>
                </div>
              </motion.div>

              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-outfit">
                  <span className="block bg-gradient-to-r from-white via-orange-300 to-orange-500 bg-clip-text text-transparent">
                    VYUHA
                  </span>
                  <span className="block text-white">INNOVATION</span>
                  <span className="block text-white">FOUNDATION</span>
                </h1>

                {/* Animated underline */}
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-xl text-gray-300 max-w-lg leading-relaxed font-outfit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                Catalyzing the future of innovation, technology & ideas for the
                next generation through meaningful connections.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                <Link href="/origin">
                  <motion.button
                    className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium font-outfit transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0"
                    onMouseEnter={handleDiscoverHover}
                    onMouseLeave={handleDiscoverLeave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Discover VYUHA
                      <ArrowRight
                        size={16}
                        className="arrow-icon transition-transform duration-300"
                      />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="bg-white/5 backdrop-blur-sm border-2 border-orange-500/50 text-white px-8 py-3 rounded-full font-medium font-outfit transition-all duration-300 hover:border-orange-500/80 hover:-translate-y-1 active:translate-y-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Involved
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image Stack Section */}
            <motion.div
              className="relative block order-2 lg:order-none w-full"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              {/* Image Stack Component */}
              <div className="flex items-center justify-center h-64 sm:h-72 md:h-80 lg:h-96 gap-0 relative">
                {/* Left Button */}
                <button
                  className="absolute left-0 z-20 bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/30"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                  onClick={goLeft}
                  aria-label="Previous"
                >
                  <span className="text-2xl text-white">&#8592;</span>
                </button>

                {/* Image Stack */}
                {[left2Idx, leftIdx, centerIdx, rightIdx, right2Idx].map(
                  (idx, pos) => (
                    <motion.div
                      key={`${idx}-${pos}`}
                      className="relative cursor-pointer"
                      style={{
                        zIndex: pos === 2 ? 10 : pos,
                        marginLeft: pos === 0 ? 0 : -24,
                      }}
                      onClick={() => router.push(stackProductRoutes[idx])}
                      animate={{
                        scale:
                          pos === 2 ? 1.5 : pos === 0 || pos === 4 ? 0.75 : 1,
                        x:
                          pos === 0
                            ? -60
                            : pos === 1
                            ? -30
                            : pos === 3
                            ? 30
                            : pos === 4
                            ? 60
                            : 0,
                        boxShadow:
                          pos === 2
                            ? "0 12px 48px 0 rgba(249, 115, 22, 0.4)"
                            : "0 2px 8px 0 rgba(0,0,0,0.10)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="relative w-24 h-36 sm:w-28 sm:h-40 md:w-32 md:h-48 lg:w-36 lg:h-56">
                        <Image
                          src={stackImages[idx]}
                          alt={stackProductNames[idx]}
                          fill
                          className={`object-cover rounded-xl border-2 border-white/20 shadow-lg select-none transition-transform duration-300 ${
                            pos === 0 || pos === 4
                              ? "blur-sm brightness-50"
                              : ""
                          } ${pos === 2 ? "hover:scale-110" : ""}`}
                          draggable={false}
                          priority={pos === 2}
                        />
                      </div>
                      {/* Product Name Overlay */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 flex items-end justify-center p-2 rounded-b-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: pos === 2 ? 1 : 0,
                          y: pos === 2 ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ pointerEvents: "none" }}
                      >
                        <motion.span
                          className="text-white font-bold text-[10px] text-center px-2 py-1 bg-orange-500/80 backdrop-blur-sm rounded-lg border border-white/50 shadow-lg"
                          initial={{ scale: 0.8 }}
                          animate={{
                            scale: pos === 2 ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {stackProductNames[idx]}
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  )
                )}

                {/* Right Button */}
                <button
                  className="absolute right-0 z-20 bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/30"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                  onClick={goRight}
                  aria-label="Next"
                >
                  <span className="text-2xl text-white">&#8594;</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Connection Lines and Icons Section - Takes up space in layout */}
      {/* <div className="hidden lg:block relative w-full py-8">
        <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8">
          Connection lines container
          <div className="relative h-32 w-full">
            <ConnectionLines animate={linesAnimated} />
          </div>

          Floating icons positioned at bottom of connection lines
          <div className="relative -mt-8">
            <FloatingIcons />
          </div>
        </div>
      </div> */}
    </section>
  );
}
