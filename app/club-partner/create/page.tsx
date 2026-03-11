"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

interface OpenClubFormData {
  collegeName: string;
  clubName: string;
  phone: string;
  vision: string;
  document: File | null;
}

export default function CreateClubPage() {
  const router = useRouter();

  const handleSubmit = async (
    endpoint: string,
    formData: OpenClubFormData
  ): Promise<void> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value as string | Blob);
        }
      });

      const response = await axios.post(
        `${apiUrl}/api/club-partner/${endpoint}`,
        formDataToSend
      );

      if (response.status === 201) {
        alert("Club proposal submitted successfully!");
        router.push('/club-partner');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => router.back()}
          className="mb-8 flex items-center text-orange-400 hover:text-orange-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to Club Partner
        </motion.button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6">
            Create a New Club
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start a new club in your college under the Vyuha community and lead initiatives 
            that matter to you. Be the change you want to see in your academic environment.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/70 p-8 rounded-xl border border-orange-500/20"
        >
          <form
            className="space-y-6"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const formData: OpenClubFormData = {
                collegeName: target["college-name"].value,
                clubName: target["club-name"].value,
                phone: target.phone.value,
                vision: target.vision.value,
                document: target.document.files?.[0] || null,
              };

              if (!formData.collegeName || !formData.clubName || !formData.phone || !formData.vision) {
                alert("All required fields must be filled out.");
                return;
              }

              handleSubmit("open-club", formData).then(() => {
                target.reset();
              });
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="college-name" className="block text-lg font-medium text-white mb-2">
                  College/University Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="college-name"
                  name="college-name"
                  placeholder="Enter your college or university name"
                  required
                  className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="club-name" className="block text-lg font-medium text-white mb-2">
                  Proposed Club Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="club-name"
                  name="club-name"
                  placeholder="Enter the proposed club name"
                  required
                  className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-white mb-2">
                  Contact Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your contact number"
                  required
                  className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="document" className="block text-lg font-medium text-white mb-2">
                  Supporting Documents <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="w-full bg-transparent p-4 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors file:bg-orange-500 file:text-white file:border-none file:rounded file:px-4 file:py-2 file:mr-4"
                />
              </div>
            </div>

            <div>
              <label htmlFor="vision" className="block text-lg font-medium text-white mb-2">
                Club Vision & Goals <span className="text-red-400">*</span>
              </label>
              <textarea
                id="vision"
                name="vision"
                placeholder="Describe your vision for the club, its objectives, planned activities, and how it will benefit students..."
                rows={8}
                required
                className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-vertical"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Submit Proposal
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Guidelines Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-orange-400 mb-6">Club Creation Guidelines</h3>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start">
              <span className="text-orange-400 mr-3 mt-1">📋</span>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Clear Purpose</h4>
                <p>Define a clear mission and objectives for your club that align with student interests and educational goals.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-400 mr-3 mt-1">👥</span>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Student Engagement</h4>
                <p>Demonstrate how your club will engage students and contribute to their personal and professional development.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-400 mr-3 mt-1">🏫</span>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Institutional Support</h4>
                <p>Ensure you have or can obtain the necessary approvals from your college administration.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-orange-400 mr-3 mt-1">🎯</span>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">Sustainability Plan</h4>
                <p>Outline how the club will maintain its activities and membership over time.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
