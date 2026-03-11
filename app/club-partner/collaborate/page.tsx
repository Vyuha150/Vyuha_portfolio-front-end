"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

interface CollaborateFormData {
  clubName: string;
  collegeName: string;
  phone: string;
  collaborationDetails: string;
  document: File | null;
}

export default function CollaboratePage() {
  const router = useRouter();

  const handleSubmit = async (
    endpoint: string,
    formData: CollaborateFormData
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
        alert("Collaboration request submitted successfully!");
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
            Collaborate with Vyuha
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Partner with existing Vyuha clubs and work together on exciting projects and initiatives. 
            Let's create something amazing together through collaboration and shared vision.
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
              const formData: CollaborateFormData = {
                clubName: target["club-name"].value,
                collegeName: target["college-name"].value,
                phone: target.phone.value,
                collaborationDetails: target["collaboration-details"].value,
                document: target.document.files?.[0] || null,
              };

              if (!formData.clubName || !formData.collegeName || !formData.phone || !formData.collaborationDetails) {
                alert("All required fields must be filled out.");
                return;
              }

              handleSubmit("collaborate", formData).then(() => {
                target.reset();
              });
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="club-name" className="block text-lg font-medium text-white mb-2">
                  Your Club Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="club-name"
                  name="club-name"
                  placeholder="Enter your club name"
                  required
                  className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

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
                  Proposal Document <span className="text-gray-400">(Optional)</span>
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
              <label htmlFor="collaboration-details" className="block text-lg font-medium text-white mb-2">
                Collaboration Details <span className="text-red-400">*</span>
              </label>
              <textarea
                id="collaboration-details"
                name="collaboration-details"
                placeholder="Describe how you want to collaborate with Vyuha clubs. Include details about proposed projects, events, shared resources, or any other collaboration ideas..."
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
                Submit Collaboration Request
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Collaboration Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-orange-400 mb-6">Collaboration Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">🤝</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Joint Events</h4>
                  <p className="text-gray-300">Organize workshops, seminars, and cultural events together for greater impact.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">💡</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Innovation Projects</h4>
                  <p className="text-gray-300">Work on exciting tech and innovation projects with shared resources and expertise.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">📚</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Knowledge Sharing</h4>
                  <p className="text-gray-300">Exchange best practices, training materials, and educational resources.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">🌐</span>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Network Expansion</h4>
                  <p className="text-gray-300">Expand your reach and connect with students from multiple institutions.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
