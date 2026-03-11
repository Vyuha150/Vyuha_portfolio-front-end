"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Flame,
  Sparkles,
  Brain,
  Star,
  ArrowRight,
  Eye,
  Heart,
  Infinity,
  Lightbulb,
  Compass,
  Target,
  Zap,
  Moon,
  Sun,
  TreePine,
  Waves,
  Crown,
  Shield,
  Wand2,
  BookOpen,
  Circle,
  Triangle,
  Hexagon,
  Flower2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const spiritualPillars = [
  {
    id: "ancient-wisdom",
    title: "Ancient Wisdom",
    icon: <BookOpen className="w-8 h-8" />,
    description: "From the Vedas, Agamas, Upanishads, and ancient temple sciences. Understanding cosmic order (ṛta), dharma, karma, and moksha.",
    practices: ["Vedic Studies", "Sacred Geometry", "Temple Sciences", "Cosmic Order"],
  },
  {
    id: "practical-practices",
    title: "Practical Practices",
    icon: <Flower2 className="w-8 h-8" />,
    description: "Breathwork (pranayama), meditation (dhyana), mantra chanting, mudras, sacred rituals — tools to activate inner consciousness.",
    practices: ["Pranayama", "Meditation", "Mantra Chanting", "Sacred Mudras"],
  },
  {
    id: "supernatural-awareness",
    title: "Supernatural Awareness",
    icon: <Eye className="w-8 h-8" />,
    description: "Astral travel, third-eye activation, lucid dreaming, kriya energy movement, protection from negative energies.",
    practices: ["Astral Travel", "Third-Eye Activation", "Lucid Dreaming", "Energy Protection"],
  },
  {
    id: "inner-alchemy",
    title: "Inner Alchemy",
    icon: <Flame className="w-8 h-8" />,
    description: "Subtle body transformation: nadis, chakras, kundalini work. Shifting from dense to divine.",
    practices: ["Chakra Activation", "Kundalini Work", "Nadi Purification", "Subtle Body"],
  },
];

const dailyRituals = [
  {
    title: "Wake-up Mantra",
    description: "Begin each day connecting to your higher self through sacred sound",
    icon: <Sun className="w-6 h-6" />,
    time: "Dawn",
  },
  {
    title: "Salt Water Aura Cleansing",
    description: "Purify your energetic field with sacred salt and intention",
    icon: <Waves className="w-6 h-6" />,
    time: "Morning",
  },
  {
    title: "Fire Rituals (Agnihotra)",
    description: "Ancient fire ceremonies to purify consciousness and environment",
    icon: <Flame className="w-6 h-6" />,
    time: "Sunset",
  },
  {
    title: "Moon & Planetary Alignments",
    description: "Harmonize with celestial energies and cosmic rhythms",
    icon: <Moon className="w-6 h-6" />,
    time: "Evening",
  },
  {
    title: "Creating an Energetic Altar",
    description: "Sacred space creation for meditation and spiritual practice",
    icon: <Triangle className="w-6 h-6" />,
    time: "Anytime",
  },
];

const supernaturalPractices = [
  {
    title: "How to Sense Auras",
    description: "Develop your psychic sight to perceive energy fields",
    icon: <Circle className="w-6 h-6" />,
    level: "Beginner",
  },
  {
    title: "Pineal Gland Activation",
    description: "Awaken your third eye through specific techniques and meditation",
    icon: <Eye className="w-6 h-6" />,
    level: "Intermediate",
  },
  {
    title: "Dream Journaling & Astral Projection",
    description: "Master conscious dreaming and out-of-body experiences",
    icon: <Star className="w-6 h-6" />,
    level: "Advanced",
  },
  {
    title: "Calling on Guardian Energies",
    description: "Connect with protective spiritual forces and guides",
    icon: <Shield className="w-6 h-6" />,
    level: "Intermediate",
  },
];

const ancientTexts = [
  {
    title: "Upanishads",
    subtitle: "Who am I?",
    wisdom: "Tat tvam asi - Thou art That. You are the eternal consciousness experiencing itself.",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    title: "Shiva Agamas",
    subtitle: "Supernatural Siddhis",
    wisdom: "Through devotion and practice, the impossible becomes natural.",
    icon: <Crown className="w-6 h-6" />,
  },
  {
    title: "Bhagavad Gita",
    subtitle: "Karma & Dhyana Yoga",
    wisdom: "You have the right to perform action, but not to the fruits of action.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "Yoga Vasistha",
    subtitle: "Non-dualism & Dream Reality",
    wisdom: "This world is a long dream. When you awaken, you realize you are the dreamer.",
    icon: <Infinity className="w-6 h-6" />,
  },
];

const spiritualArchetypes = [
  {
    id: "mystic",
    title: "The Mystic",
    description: "You seek direct experience of the divine through meditation and inner contemplation",
    icon: <Eye className="w-6 h-6" />,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "seeker",
    title: "The Seeker",
    description: "You hunger for knowledge and understanding of spiritual truths",
    icon: <Compass className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "warrior",
    title: "The Warrior",
    description: "You transform challenges into spiritual strength and protect sacred wisdom",
    icon: <Shield className="w-6 h-6" />,
    color: "from-red-500 to-orange-600",
  },
  {
    id: "healer",
    title: "The Healer",
    description: "You channel divine energy to heal yourself and others",
    icon: <Heart className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
  },
];

export default function SpiritualBlueprint() {
  const [selectedPillar, setSelectedPillar] = useState(spiritualPillars[0].id);
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 overflow-hidden">
        {/* Orange Theme Background */}
        {/* <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.3)_0%,transparent_50%)] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,165,0,0.2)_0%,transparent_50%)] z-10" />
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,165,0,0.1)_0deg,transparent_60deg,rgba(249,115,22,0.1)_120deg,transparent_180deg)] z-10" />
        </div> */}

        {/* Floating Sacred Geometry */}
        <div className="absolute inset-0 z-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 border border-orange-400/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: 999999,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Sacred Symbol */}
            <motion.div
              className="w-24 h-24 mx-auto mb-8 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: 999999, ease: "linear" }}
            >
              <div className="absolute inset-0 border-2 border-orange-400 rounded-full opacity-60" />
              <div className="absolute inset-2 border border-orange-500 rounded-full opacity-40" />
              <div className="absolute inset-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
              <Flower2 className="absolute inset-0 w-full h-full text-white p-6" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text">
              The Spiritual Blueprint
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-gray-300">
              Ancient Wisdom, Supernatural Truths & Everyday Ascension
            </h2>
            
            <motion.div
              className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-orange-300 to-orange-500 text-transparent bg-clip-text"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: 999999 }}
            >
              Awaken. Align. Ascend.
            </motion.div>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
              Ancient truths meet modern seekers. Your journey into the mystical realms of consciousness, 
              energy work, and spiritual transformation begins here.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold px-8 py-4 text-lg shadow-2xl"
                onClick={() => {
                  const element = document.getElementById('introduction');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Begin Your Spiritual Journey
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="py-16 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              What Is Spirituality in Vyuha's Vision?
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                At Vyuha, we see spirituality not as an escape from life, but a return to your true self — 
                rooted in ancient lineages, supernatural wisdom, and daily energetic practices.
              </p>
              <motion.p
                className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: 999999 }}
              >
                This is not religion. This is remembrance.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars of Spirituality */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Pillars of Spirituality on Vyuha
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spiritualPillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <Card className="p-8 h-full bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700 hover:border-orange-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-orange-400 group-hover:text-orange-500 transition-colors duration-300">
                        {pillar.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                    
                    <div className="space-y-2">
                      {pillar.practices.map((practice, idx) => (
                        <div key={idx} className="text-xs text-orange-300 bg-orange-500/10 px-3 py-1 rounded-full inline-block mx-1">
                          {practice}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Spiritual Rituals */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-orange-900/20 to-orange-800/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Daily Spiritual Rituals
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your daily routine into a sacred practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dailyRituals.map((ritual, index) => (
              <motion.div
                key={ritual.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="p-6 h-full bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-500/30 hover:border-orange-400 transition-all duration-300 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                        <div className="text-orange-400">
                          {ritual.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                          {ritual.title}
                        </h3>
                        <div className="text-sm text-orange-300 bg-orange-500/20 px-2 py-1 rounded-full inline-block">
                          {ritual.time}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {ritual.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supernatural Practices */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Supernatural Practices You Can Begin
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Awaken your psychic abilities and supernatural awareness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supernaturalPractices.map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="p-8 h-full bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-500/30 hover:border-orange-400 transition-all duration-300 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
                        <div className="text-orange-400">
                          {practice.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                            {practice.title}
                          </h3>
                          <div className={`text-xs px-3 py-1 rounded-full ${
                            practice.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            practice.level === 'Intermediate' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {practice.level}
                          </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                          {practice.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ancient Texts Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-amber-900/20 to-orange-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Ancient Texts Translated
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Bite-sized wisdom from the eternal scriptures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ancientTexts.map((text, index) => (
              <motion.div
                key={text.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="p-8 h-full bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-500/30 hover:border-orange-400 transition-all duration-300 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                        <div className="text-orange-400">
                          {text.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                          {text.title}
                        </h3>
                        <p className="text-orange-300 text-sm">
                          {text.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <blockquote className="text-gray-300 italic text-lg leading-relaxed border-l-4 border-orange-400 pl-4">
                      "{text.wisdom}"
                    </blockquote>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Archetype Quiz Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
              Choose Your Spiritual Path
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Discover your spiritual archetype and receive personalized guidance
            </p>
            {!showQuiz && (
              <Button
                size="lg"
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg"
              >
                Take the Spiritual Archetype Quiz
                <Sparkles className="ml-2 w-6 h-6" />
              </Button>
            )}
          </motion.div>

          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {spiritualArchetypes.map((archetype, index) => (
                <motion.div
                  key={archetype.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedArchetype(archetype.id)}
                  className={`cursor-pointer group ${selectedArchetype === archetype.id ? 'ring-2 ring-orange-400' : ''}`}
                >
                  <Card className={`p-6 h-full bg-gradient-to-br ${archetype.color} bg-opacity-20 border-gray-600 hover:border-orange-400 transition-all duration-300 shadow-lg`}>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <div className="text-white group-hover:scale-110 transition-transform duration-300">
                          {archetype.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white">
                        {archetype.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {archetype.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedArchetype && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 text-center"
            >
              <Card className="p-8 bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-500/50 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">
                  Your Spiritual Path: {spiritualArchetypes.find(a => a.id === selectedArchetype)?.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  Personalized practices and guidance will be curated for your spiritual archetype.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  onClick={() => router.push('/auth/sign-up')}
                >
                  Begin Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
        {/* Orange Theme Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.2)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,165,0,0.15)_0%,transparent_50%)]" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <motion.div
                className="w-32 h-32 mx-auto mb-8 relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: 999999, ease: "linear" }}
              >
                <div className="absolute inset-0 border-2 border-orange-400 rounded-full opacity-60" />
                <div className="absolute inset-2 border border-orange-500 rounded-full opacity-40" />
                <div className="absolute inset-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
                <Infinity className="absolute inset-0 w-full h-full text-white p-8" />
              </motion.div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-white mb-2">You're not just a body.</span>
              <span className="block text-gray-400 mb-2">Not even just a soul.</span>
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text">
                You are a vortex of possibility,
              </span>
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                shaped by ancient memory.
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Begin your spiritual journey with Vyuha — walk the path of energy, mysticism, and light.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white font-bold px-12 py-6 text-xl shadow-2xl"
                onClick={() => router.push('/auth/sign-up')}
              >
                Join the Circle
                <Infinity className="ml-3 w-7 h-7" />
              </Button>
            </motion.div>

            <motion.p
              className="mt-8 text-gray-500 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: 999999 }}
            >
              The mystical portal awaits your awakening
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
