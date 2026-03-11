"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HeroSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pb-32"
    >
      {/* Large Background Text - positioned so image cuts through it */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: "-70%" }} // Shift text up so image intersects it
      >
        <h1 className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold text-white/5 select-none tracking-tighter leading-none">
          VYUHA
        </h1>
      </motion.div>

      {/* Founder Image positioned to intersect the text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mb-8"
      >
        <div className="relative">
          <Image
            src="/anna.png"
            alt="J.V. Kalyan"
            width={450}
            height={600}
            // className="object-cover rounded-2xl shadow-2xl"
            priority
          />
          {/* Gradient blur effect AT THE BOTTOM of the image */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-2xl"></div> */}
        </div>
      </motion.div>

      {/* Founder Name and Title beneath the image, pulled up to overlap the blur */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-20 text-center -mt-24"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-4 tracking-tight"
        >
          VYUHA INNOVATION FOUNDATION
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-2xl md:text-3xl text-gray-300 font-medium tracking-wide"
        >
          J.V. KALYAN
        </motion.h3>
      </motion.div>
    </motion.div>
  );
};

const CompanyDescription: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="relative -mt-24"
    >
      {/* Blur background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-orange-500/5 to-black/80 backdrop-blur-lg rounded-3xl"></div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-gray-300 leading-relaxed"
        >
          <p className="mb-6">
            <strong className="text-orange-400">
              Vyuha Innovation Foundation
            </strong>{" "}
            is a pioneering youth-centric organization dedicated to transforming
            education, leadership development, and civic engagement across
            India. We bridge the gap between traditional learning and
            future-ready skills through innovative programs, digital
            transformation initiatives, and grassroots innovation labs.
          </p>

          <p>
            <strong className="text-orange-400">J.V. Kalyan</strong> is a
            forward-thinking youth leader and innovation strategist committed to
            redefining education, leadership, and civic responsibility in India.
            As the Founder and Chairman of Vyuha Innovation Foundation, he
            focuses on empowering students and young professionals through
            conscious leadership, digital transformation, and grassroots
            innovation.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Static particle positions to prevent hydration errors
const particlePositions = [
  { x: 100, y: 150 },
  { x: 300, y: 400 },
  { x: 800, y: 200 },
  { x: 600, y: 600 },
  { x: 1000, y: 350 },
  { x: 200, y: 500 },
  { x: 900, y: 100 },
  { x: 500, y: 300 },
];

const particleIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

export default function AboutPage() {
  const detailsRef = useRef(null);
  const detailsInView = useInView(detailsRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen bg-transparent overflow-hidden relative">
      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-8 text-center relative z-30"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-orange-400 mb-4">
          About VYUHA
        </h1>
        <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
      </motion.div>

      {/* Floating particles animation - fixed positions */}
      <div className="absolute inset-0 pointer-events-none">
        {particleIds.map((id, i) => (
          <motion.div
            key={id}
            initial={{
              opacity: 0,
              scale: 0,
              x: particlePositions[i].x,
              y: particlePositions[i].y,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              x: [
                particlePositions[i].x,
                particlePositions[i].x + (i % 2 === 0 ? 100 : -100),
                particlePositions[i].x,
              ],
              y: [
                particlePositions[i].y,
                particlePositions[i].y + (i % 3 === 0 ? 50 : -50),
                particlePositions[i].y,
              ],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2 bg-orange-400 rounded-full blur-sm"
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Company Description with Blur Effect */}
        <section className="relative flex flex-col md:flex-row items-center justify-between h-auto px-4 space-y-6 md:space-y-0">
          {/* Right Content (Image) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center space-y-6 group md:order-2"
          >
            {/* Founder Image */}
            <img
              src="/logo.png"
              alt="J.V. Kalyan"
              className="w-full max-w-md rounded-lg shadow-lg"
            />

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 w-full bg-orange-500/80 rounded-b-lg py-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-2xl font-bold text-white">
                Vyuha Innovation Foundation
              </p>
            </div>
          </motion.div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-lg space-y-3 md:order-1"
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-orange-400">
                Our Mission & Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-orange-400 font-semibold">
                  Vyuha Innovation Foundation
                </span>{" "}
                is a pioneering youth-centric organization dedicated to
                transforming education, leadership development, and civic
                engagement across India. We bridge the gap between traditional
                learning and future-ready skills through innovative programs,
                digital transformation initiatives, and grassroots innovation
                labs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-orange-400 font-semibold">
                  J.V. Kalyan
                </span>{" "}
                is a forward-thinking youth leader and innovation strategist
                committed to redefining education, leadership, and civic
                responsibility in India. As the Founder and Chairman of Vyuha
                Innovation Foundation, he focuses on empowering students and
                young professionals through conscious leadership, digital
                transformation, and grassroots innovation.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Hero Section */}
        <HeroSection />

        {/* Additional Details Section */}
        <motion.div
          ref={detailsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="px-4 pb-16"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={
                detailsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            >
              Leadership and Vision
            </motion.h2>

            <Card className="bg-transparent backdrop-blur-none border-none shadow-none">
              <CardContent className="p-8 bg-transparent">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 text-lg leading-relaxed text-gray-300 text-center"
                >
                  Kalyan's leadership style is grounded in clarity,
                  collaboration, and consciousness. He envisions a future where
                  young people lead from the front—not just in corporate and
                  academic spaces, but also in governance, innovation, and
                  nation-building. His initiatives focus on experiential
                  learning, community development, and unlocking the creative
                  potential of youth.
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    detailsInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold text-orange-500 mb-8 text-center"
                >
                  Key Highlights
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid md:grid-cols-2 gap-6 mb-12"
                >
                  {[
                    {
                      id: "founder",
                      title: "Founder of Vyuha Innovation Foundation:",
                      desc: "A pioneering platform that blends education, leadership incubation, and innovation labs to build future-ready youth.",
                    },
                    {
                      id: "advocate",
                      title: "Youth-Governance Engagement Advocate:",
                      desc: "Actively working to integrate students and professionals into civic participation and policy awareness.",
                    },
                    {
                      id: "collaborator",
                      title: "Strategic Collaborator:",
                      desc: "Works with social and educational institutions for grassroots interventions, including digital campaigns, relief programs, and educational outreach.",
                    },
                    {
                      id: "speaker",
                      title: "Public Speaker and Thought Leader:",
                      desc: "On topics including digital transformation, ethical leadership, emotional intelligence, and innovation-driven social change.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        detailsInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                      className="bg-gradient-to-br from-orange-500/10 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 transition-all duration-300 hover:border-orange-500/40"
                    >
                      <span className="font-bold text-orange-400 block mb-2">
                        {item.title}
                      </span>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {item.desc}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    detailsInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-3xl font-bold text-orange-500 mb-6 text-center"
                >
                  Mission
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="bg-gradient-to-r from-orange-500/20 to-orange-600/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 transition-all duration-300"
                >
                  <p className="text-lg leading-relaxed text-gray-200 text-center">
                    J.V. Kalyan's mission is to catalyze a national movement of
                    youth-led transformation by designing systems that awaken
                    purpose, foster critical thinking, and empower leadership at
                    every level of society.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
