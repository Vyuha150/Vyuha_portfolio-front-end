"use client";

import React from "react";
import { motion } from "framer-motion";
import { mentors } from "@/data/mentors";

export default function PathPreview() {
  return (
    <main className="min-h-screen text-white">
      {/* Preview Video Section */}
      <section className="py-12 px-4 md:py-16 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text">
            The Seeker's Awakening
          </h1>
          <p className="text-gray-400 text-sm md:text-lg mb-8">
            "Are you searching for meaning? Do you feel lost or disconnected?
            The Seeker's Awakening path will guide you to rediscover your true
            self and embark on a journey of profound transformation."
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/example-video-id"
              title="Preview Video"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 2 }}
            className="mt-6 h-2 bg-orange-500 rounded-full"
          ></motion.div>
          <p className="text-sm text-gray-400 mt-2">75% Course Completion</p>
          <button className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Embedded Calendly Section */}
      <section className="py-12 px-4 md:py-16 md:px-6 lg:px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Book a Counseling Session
          </h2>
          <p className="text-gray-400 text-sm md:text-lg mb-8">
            Take the next step towards self-discovery and personal growth.
            Schedule a session with one of our experienced counselors.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://calendly.com/your-calendly-link"
              title="Book a Counseling Session"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      <section className="py-12 px-4 md:py-16 md:px-6 lg:px-8 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What to Expect from Counseling
          </h2>
          <p className="text-gray-400 text-sm md:text-lg mb-8">
            Discover how our counseling sessions can help you achieve
            self-mastery and personal growth.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/example-intro-video-id"
              title="What to Expect from Counseling"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <button className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105">
            Book Your Session
          </button>
        </div>
      </section>

      {/* Mentor Bio Cards Section */}
      <section className="py-12 px-4 md:py-16 md:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Meet Our Mentors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.name}
                className="p-6 bg-black/90 text-white rounded-lg shadow-lg hover:shadow-orange-500 transition-shadow duration-300"
              >
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-center">
                  {mentor.name}
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  {mentor.title}
                </p>
                <p className="text-sm text-gray-400 mt-4">{mentor.bio}</p>
                <button className="mt-4 w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105">
                  Book with {mentor.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA Section */}
      <section className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm md:text-lg">
            Begin your transformation with our introductory course. No
            commitment required.
          </p>
          <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105">
            Access Now
          </button>
        </div>
      </section>
    </main>
  );
}
