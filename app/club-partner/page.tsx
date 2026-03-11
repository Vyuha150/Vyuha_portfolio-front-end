"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import axios from "axios";

// Define types for the form data
interface CentralTeamFormData {
  name: string;
  email: string;
  phone: string;
  skills: string;
  document: File | null;
}

interface OpenClubFormData {
  collegeName: string;
  clubName: string;
  phone: string;
  vision: string;
  document: File | null;
}

interface CollaborateFormData {
  clubName: string;
  collegeName: string;
  phone: string;
  collaborationDetails: string;
  document: File | null;
}

interface Club {
  _id: string;
  name: string;
  description: string;
  image?: string;
  createdAt?: string;
}

export default function ClubPartnerForms() {
  const router = useRouter();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loadingClubs, setLoadingClubs] = useState(true);

  // Fetch clubs from the database
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/clubs`
        );
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        // If there's an error, we'll fall back to showing static clubs
      } finally {
        setLoadingClubs(false);
      }
    };

    fetchClubs();
  }, []);

  // Static club data as fallback
  const staticClubs = [
    {
      _id: "static-1",
      name: "Safe Life",
      description:
        "In collaboration with APSACS and UNICEF, Safe Life Club focuses on promoting health and wellness through four key pillars:",
      image: "/clubs/club1.jpg",
      additionalContent: [
        {
          heading: "Non-Communicable Diseases (NCDs)",
          content:
            "Creating awareness and preventive measures for chronic conditions like diabetes, hypertension, and cancer.",
        },
        {
          heading: "Diet and Nutrition",
          content:
            "Educating on the importance of a balanced diet and healthy eating habits.",
        },
        {
          heading: "Yoga and Fitness",
          content:
            "Encouraging physical activity, mental well-being, and fitness practices like yoga.",
        },
        {
          heading: "HIV/AIDS Awareness",
          content:
            "Advocating for awareness, prevention, and support related to HIV/AIDS.",
        },
      ],
    },
    {
      _id: "static-2",
      name: "Electoral Literacy Club",
      description:
        "Under the guidance of AICTE, the Electoral Literacy Club aims to enhance electoral literacy among students and citizens. The club focuses on educating people about the democratic process, improving understanding of electoral rights and responsibilities, and facilitating voter registrations to ensure active participation in elections. Students from Electoral Literacy club also conducted SVEEP activity initiated by Election Commission of India throughout the collage.",
      image: "/clubs/club2.jpg",
    },
    {
      _id: "static-3",
      name: "Innovation and Incubation club",
      description:
        "This club fosters an entrepreneurial mindset by working on innovative ways to engage students and help them develop startup ideas. It builds a bridge between students and professionals by providing mentorship and guidance, turning ideas into viable businesses and helping students connect with the startup ecosystem..",
      image: "/clubs/club3.jpg",
    },
    {
      _id: "static-4",
      name: "Vidhura AI and Entrepreneurship Club",
      description:
        "To improve the culture of innovation and entrepreneurship among students, focusing on AI, Data Science, and technology-related domains. The club aims to act as a bridge between academia, industry, and government organizations to promote real-world project-based learning and develop successful business models.",
      image: "/clubs/club4.jpg",
    },
    {
      _id: "static-5",
      name: "Nature & Animal Wing",
      description:
        "Born from the Vyuha Innovation Foundation’s vision of holistic impact, the Nature & Animal Wing was created to be a one-stop solution for the planet’s challenges. It honors the ancient wisdom of communities that lived in harmony with Earth, while harnessing modern science to solve today’s crises and tomorrow’s threats. This story is about humans becoming guardians of all life, building a legacy of protection, care, and sustainability for generations to come.",
      image: "/clubs/club7.jpg",
    },
    {
      _id: "static-6",
      name: "Spirituality Club",
      description:
        "Vyuha was born with a bold dream: to redefine spirituality as powerful inner mastery, not passive escape. Where the ancient path of yogis, warriors, and sages becomes alive again — reimagined for the modern age. A vision where spirituality is strength, fearlessness, clarity, compassion, and mastery of life. In a world drowning in stress, distraction, and weakness, Vyuha emerges as a sanctuary — a movement to awaken the Buddha and the warrior within every human being.",
      image: "/clubs/club8.jpg",
    },
  ];

  // Use database clubs if available, otherwise use static clubs
  const displayClubs = clubs.length > 0 ? clubs : staticClubs;

  return (
    <main className="min-h-screen text-white">
      <section className="py-12 px-4 md:py-16 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full space-y-3 mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-8">
            Clubs working under Vyuha Community
          </h1>
          <h4 className="text-2xl md:text-3xl text-gray-300">
            In Vyuha we have well Established student administered clubs with
            their own motives, policy and approach leading to holistic
            development of members within.
          </h4>
        </motion.div>

        {/* Render clubs dynamically */}
        {!loadingClubs &&
          displayClubs.map((club, index) => (
            <Achievement
              key={club._id}
              title={club.name}
              description={club.description}
              image={club.image || "/clubs/default-club.jpg"}
              reverse={index % 2 === 1}
              additionalContent={(club as any).additionalContent}
            />
          ))}

        {loadingClubs && (
          <div className="text-center py-12">
            <div className="text-orange-400 text-xl">Loading clubs...</div>
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-16">
          {/* Mission & Values Section */}
          <section className="py-16 px-8  border border-orange-500/20 rounded-xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6">
                Our Mission & Values
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                At Vyuha, our mission is to empower individuals and teams to
                achieve their full potential through collaboration, innovation,
                and community-driven initiatives.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Innovation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/30 p-6 rounded-lg border border-orange-500/20 hover:shadow-md hover:shadow-orange-500 hover:border-orange-500 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  Innovation
                </h3>
                <p className="text-gray-300">
                  We foster creativity and out-of-the-box thinking.
                </p>
              </motion.div>

              {/* Collaboration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/30 p-6 rounded-lg border border-orange-500/20 hover:shadow-md hover:shadow-orange-500 hover:border-orange-500 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  Collaboration
                </h3>
                <p className="text-gray-300">
                  We believe in the power of teamwork and shared goals.
                </p>
              </motion.div>

              {/* Integrity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/30 p-6 rounded-lg border border-orange-500/20 hover:shadow-md hover:shadow-orange-500 hover:border-orange-500 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  Integrity
                </h3>
                <p className="text-gray-300">
                  We uphold honesty and transparency in all our actions.
                </p>
              </motion.div>

              {/* Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0 }}
                className="bg-black/30 p-6 rounded-lg border border-orange-500/20 hover:shadow-md hover:shadow-orange-500 hover:border-orange-500 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  Impact
                </h3>
                <p className="text-gray-300">
                  We strive to make a meaningful difference in the community.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Interactive Club Options Section */}
          <section className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6">
                Get Involved with Vyuha Clubs
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose how you want to engage with our community. Whether you
                want to join an existing club, create a new one, or collaborate
                with us - we have opportunities for everyone.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Join a Club */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/70 p-8 rounded-xl border border-orange-500/20 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
              >
                <div className="text-orange-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2M4 1h2v6h2.5l1.5 5H8L6.5 7H4V1M15.5 22v-6h2.5l.5-2h-5V6c-.8-.5-2-.5-2 0v8H9l.5 2H12v6h3.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Join Vyuha Central Team
                </h3>
                <p className="text-gray-300 mb-6">
                  Become part of our core team and contribute to the growth of
                  Vyuha community with your skills and expertise.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/club-partner/join")}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Join Now
                </motion.button>
              </motion.div>

              {/* Create a Club */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/70 p-8 rounded-xl border border-orange-500/20 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
              >
                <div className="text-orange-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Create a New Club
                </h3>
                <p className="text-gray-300 mb-6">
                  Start a new club in your college under the Vyuha community and
                  lead initiatives that matter to you.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/club-partner/create")}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Create Club
                </motion.button>
              </motion.div>

              {/* Collaborate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/70 p-8 rounded-xl border border-orange-500/20 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
              >
                <div className="text-orange-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Collaborate with Us
                </h3>
                <p className="text-gray-300 mb-6">
                  Partner with existing Vyuha clubs and work together on
                  exciting projects and initiatives.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/club-partner/collaborate")}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Collaborate
                </motion.button>
              </motion.div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
function Achievement({
  title,
  description,
  image,
  reverse,
  additionalContent,
}: {
  title: string;
  description: string;
  image: string;
  reverse: boolean;
  additionalContent?: { heading: string; content: string }[]; // Optional prop for additional content
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1 }}
      className={`relative flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center space-y-6 md:space-y-10 mb-10`}
    >
      {/* Content */}
      <div className={`md:w-1/2 space-y-4 ${reverse ? "md:pl-6" : "md:pr-6"}`}>
        <h2 className="text-4xl font-bold text-orange-400 text-center md:text-start">
          {title}
        </h2>
        <p className="text-gray-300 text-center md:text-start text-lg">
          {description}
        </p>

        {/* Render additional content if provided */}
        {additionalContent && (
          <ul className="text-gray-300 ">
            {additionalContent.map((item, index) => (
              <li key={index}>
                <strong className="text-white">{item.heading}:</strong>{" "}
                {item.content}
              </li>
            ))}
          </ul>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/club-partner/join")}
            className="flex-1 py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded-md transition-colors shadow-sm hover:shadow-orange-500/25"
          >
            Join Club
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/club-partner/collaborate")}
            className="flex-1 py-1.5 px-3 bg-transparent border border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white text-xs font-medium rounded-md transition-all shadow-sm hover:shadow-orange-500/25"
          >
            Collaborate
          </motion.button>
        </div>
      </div>

      {/* Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={image}
          alt={title}
          className={`w-full h-80 rounded-lg shadow-lg ${
            !reverse ? "ml-6" : "mr-6"
          } hover:scale-105 transition-transform duration-300 border border-orange-400 rounded-lg overflow-hidden`}
          style={{ objectFit: "cover" }}
        />
      </div>
    </motion.div>
  );
}
