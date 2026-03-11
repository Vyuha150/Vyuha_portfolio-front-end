"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Mail,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

interface Advisor {
  _id: string;
  name: string;
  designation: string;
  bio?: string;
  expertise?: string[];
  experience?: string;
  education?: string;
  linkedIn?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdvisorsPage() {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch advisors from backend
  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/advisors`
        );
        setAdvisors(response.data);
      } catch (err) {
        console.error("Error fetching advisors:", err);
        setError("Failed to load advisors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading advisors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen  text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Our Advisors
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet our experienced advisors who guide and mentor our community
            with their expertise and knowledge.
          </p>
        </motion.div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={advisor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-orange-500 transition-all duration-300 h-full flex flex-col overflow-hidden">
                {/* Image Section */}
                <div className="relative h-64 bg-gray-800">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/api/advisors/image/${advisor._id}`}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden w-full h-full bg-gray-700 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Name and Designation */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {advisor.name}
                    </h3>
                    <div className="flex items-center text-orange-400 mb-3">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="font-medium">{advisor.designation}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  {advisor.bio && (
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {advisor.bio}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {advisors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">
              No advisors available at the moment.
            </div>
            <p className="text-gray-500 mt-2">Check back later for updates.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
