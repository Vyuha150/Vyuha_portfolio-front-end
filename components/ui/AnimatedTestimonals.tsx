"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [rotateYValues, setRotateYValues] = useState<number[]>([]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [1500, 1800], [20, 0]);
  const opacity = useTransform(scrollY, [1500, 1800], [0, 1]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  // Initialize random rotateY values on client-side mount
  useEffect(() => {
    const initialRotateY = testimonials.map(
      () => Math.floor(Math.random() * 21) - 10
    );
    setRotateYValues(initialRotateY);
  }, [testimonials]);

  // Create particle effect matching other components
  useEffect(() => {
    const createParticles = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full opacity-0";

        const colors = ["bg-white/30", "bg-orange-500/20", "bg-orange-400/15"];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        particle.classList.add(colorClass);

        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        const animDuration = Math.random() * 15 + 5;
        particle.style.animation = `float ${animDuration}s infinite ease-in-out`;

        particle.style.animationDelay = `${Math.random() * 5}s`;

        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;

        container.appendChild(particle);
      }
    };

    createParticles();

    return () => {
      if (containerRef.current) {
        const particles = containerRef.current.querySelectorAll(
          'div[class*="absolute rounded-full"]'
        );
        particles.forEach((particle: Element) => particle.remove());
      }
    };
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden z-[1]"
      >
        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) translateX(10px) rotate(5deg);
            }
            50% {
              transform: translateY(-40px) translateX(-15px) rotate(-5deg);
            }
            75% {
              transform: translateY(-20px) translateX(5px) rotate(3deg);
            }
          }
        `}</style>

        {/* Orange glows matching other components */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] z-[1]"
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-orange-400/10 blur-[100px] z-[1]"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Grid pattern overlay like in other components */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-[2]" />

      <motion.div
        className="max-w-7xl mx-auto px-8 relative z-10"
        style={{ y, opacity }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm text-xs font-medium text-orange-200 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
              <Star size={12} className="text-orange-400" />
              <span>Testimonials</span>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            What Our <span className="text-white/90">Partners Say</span>
          </motion.h2>

          <motion.p
            className="mt-4 max-w-2xl mx-auto text-gray-300 text-lg font-outfit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hear from those who have experienced the impact of our work and
            innovation.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-1 gap-12 md:grid-cols-2 items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{
            boxShadow: "0 0 30px 5px rgba(249, 115, 22, 0.15)",
            borderColor: "rgba(249, 115, 22, 0.3)",
          }}
        >
          <div>
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotateY: rotateYValues[index] || 0, // Use the initialized value
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0,
                      scale: isActive(index) ? 1 : 0.95,
                      rotateY: isActive(index) ? 0 : rotateYValues[index] || 0,
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -20, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotateY: rotateYValues[index] || 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Orange glow overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col justify-between py-4">
            <div className="mb-4">
              <Quote size={32} className="text-orange-400 opacity-50 mb-4" />
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              >
                <motion.p className="text-lg text-gray-300 font-outfit mb-8">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>

                <h3 className="text-2xl font-bold text-white font-outfit">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-orange-300 font-outfit mt-1">
                  {testimonials[active].designation}
                </p>
              </motion.div>
            </div>

            <div className="flex gap-4 pt-8 border-t border-white/10">
              <motion.button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={16} className="text-white" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight size={16} className="text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Call to action button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px 2px rgba(249, 115, 22, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium font-outfit transition-all duration-300 shadow-lg shadow-orange-500/20 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read More Testimonials
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AnimatedTestimonials;
