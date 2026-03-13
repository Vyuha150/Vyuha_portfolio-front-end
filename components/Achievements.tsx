'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Achievement {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

// Fallback list of achievements that maps to files in public/achievements/
// This is used when the backend API is not available.
const defaultAchievements: Achievement[] = [
  {
    _id: '1',
    title: 'AP Red Cross Mobile Application Launched',
    description: 'The Indian Red Cross Society launched the AP Red Cross mobile application to facilitate volunteering and blood donation initiatives across Andhra Pradesh. The platform enables individuals to register as volunteers, participate in humanitarian activities, and support emergency response efforts more efficiently.',
    image: '/achievements/signal-2026-03-14-005200.jpeg',
    date: '2026-03-14',
  },
  {
    _id: '2',
    title: 'Students Lead Social Awareness Drive in Villages',
    description: 'Students participated in a community engagement program aimed at spreading awareness on environmental conservation and social responsibility. The initiative involved rallies, discussions, and activities designed to inspire positive change in the community.',
    image: '/achievements/signal-2026-03-14-005200_002.jpeg',
    date: '2026-03-14',
  },
  {
    _id: '3',
    title: 'Community Awareness Campaign Held in Local Villages',
    description: 'An outreach program was conducted to raise awareness among villagers on social and environmental issues. Volunteers interacted with residents and students, encouraging responsible practices and active community participation.',
    image: '/achievements/signal-2026-03-14-005200_003.jpeg',
    date: '2026-03-14',
  },
  {
    _id: '4',
    title: 'Health Awareness Program Conducted for Rural Communities',
    description: 'A health awareness initiative was organized to educate the public about preventive healthcare and hygiene practices. Medical professionals and volunteers addressed participants, providing guidance on maintaining good health and improving community well-being.',
    image: '/achievements/signal-2026-03-14-005200_004.jpeg',
    date: '2026-03-14',
  },
  {
    _id: '5',
    title: 'Public Awareness Rally Against Plastic Pollution',
    description: 'Students and volunteers conducted an awareness rally highlighting the environmental impact of plastic waste. The rally emphasized reducing plastic consumption and encouraged the community to adopt eco-friendly practices for a cleaner and healthier environment.',
    image: '/achievements/signal-2026-03-14-005200_005.jpeg',
    date: '2026-03-14',
  },
  {
    _id: '6',
    title: 'Plastic Awareness Rally Organized in Katuru',
    description: 'A plastic awareness rally was organized in Katuru village to educate citizens about the harmful effects of plastic usage. Volunteers and students participated actively, spreading awareness about environmental protection and promoting sustainable alternatives to plastic in daily life.',
    image: '/achievements/signal-2026-03-14-005200_006.jpeg',
    date: '2026-03-14',
  },
];

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div
          className="group relative overflow-hidden rounded-xl cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white font-outfit mb-2">
                {achievement.title}
              </h3>
              <div className="flex items-center text-sm text-gray-300">
                <Calendar size={14} className="mr-2" />
                {new Date(achievement.date).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-300 text-sm line-clamp-3">
              {achievement.description}
            </p>
            <div className="mt-4 flex items-center text-orange-400 text-sm font-medium group-hover:text-orange-300 transition-colors">
              Read more
              <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-[#18181b] text-white p-8 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle>
            <span className="block text-3xl font-bold text-orange-400 mb-4 text-center">
              {achievement.title}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden border border-orange-400">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="text-center space-y-4 w-full">
            <div className="flex justify-center flex-wrap gap-3 text-sm">
              <span className="bg-blue-500/20 px-4 py-2 rounded-full text-blue-300 flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(achievement.date).toLocaleDateString()}
              </span>
            </div>
            <DialogDescription className="text-gray-300 text-lg text-center mt-6 leading-relaxed">
              {achievement.description}
            </DialogDescription>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAchievements = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!baseUrl) {
        // No API configured; use fallback images from /public/achievements/
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/achievements`);
        if (response?.data?.length) {
          setAchievements(response.data);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading achievements...</div>
      </div>
    );
  }

  return (
    <div className='bg-transparent' >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" /> */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-outfit">
              Our <span className="text-orange-400">Achievements</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Celebrating the milestones, recognitions, and success stories that define our journey of excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {achievements.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-xl">No achievements found.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement._id}
                  achievement={achievement}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;
