"use client";

import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

interface CentralTeamFormData {
  name: string;
  email: string;
  phone: string;
  skills: string;
  document: File | null;
}

export default function JoinCentralTeamPage() {
  const router = useRouter();

  const handleSubmit = async (
    endpoint: string,
    formData: CentralTeamFormData
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
        alert("Form submitted successfully!");
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
            Join Vyuha Central Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Become part of our core team and contribute to the growth of Vyuha community 
            with your skills and expertise. Help us build a stronger, more impactful community.
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
              const formData: CentralTeamFormData = {
                name: (target.elements.namedItem("name") as HTMLInputElement).value,
                email: target.email.value,
                phone: target.phone.value,
                skills: target.skills.value,
                document: target.document.files?.[0] || null,
              };

              if (!formData.name || !formData.email || !formData.phone || !formData.skills) {
                alert("All required fields must be filled out.");
                return;
              }

              handleSubmit("join-central-team", formData).then(() => {
                target.reset();
              });
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-white mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-white mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-white mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  className="w-full bg-transparent p-4 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="document" className="block text-lg font-medium text-white mb-2">
                  Upload Resume/CV <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  accept=".pdf,.doc,.docx"
                  className="w-full bg-transparent p-4 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors file:bg-orange-500 file:text-white file:border-none file:rounded file:px-4 file:py-2 file:mr-4"
                />
              </div>
            </div>

            <div>
              <label htmlFor="skills" className="block text-lg font-medium text-white mb-2">
                Skills & Expertise <span className="text-red-400">*</span>
              </label>
              <textarea
                id="skills"
                name="skills"
                placeholder="Describe your skills, expertise, and how you can contribute to Vyuha..."
                rows={6}
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
                Submit Application
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-orange-400 mb-4">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">🚀 Growth Opportunities</h4>
              <p>Develop leadership skills and gain experience in community management.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">🤝 Networking</h4>
              <p>Connect with like-minded individuals and build lasting professional relationships.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">📚 Learning</h4>
              <p>Access to exclusive workshops, training sessions, and mentorship programs.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">🎯 Impact</h4>
              <p>Make a meaningful difference in the student community and beyond.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
