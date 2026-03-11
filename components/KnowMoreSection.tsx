"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const KnowMoreSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-6">
            Know More About Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scan the QR code to explore more about Vyuha Innovation Foundation.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-xl">
                {/* Placeholder for QR Code - replace with actual QR code image */}
                {/* <div className="text-center">
                  <div className="w-48 h-48 bg-black rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xs">QR CODE</span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">
                    Scan to Learn More
                  </p>
                </div> */}
                <Image src="/qr.jpg" alt="QR Code" width={256} height={256} />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-orange-400">
                Quick Access to Our Digital World
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Use your smartphone camera to scan the QR code and instantly access:
              </p>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-black/30 p-4 rounded-lg border border-orange-500/20"
              >
                <h4 className="text-orange-400 font-semibold mb-2">Our Programs</h4>
                <p className="text-gray-300 text-sm">
                  Detailed information about our courses, workshops, and training programs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-black/30 p-4 rounded-lg border border-orange-500/20"
              >
                <h4 className="text-orange-400 font-semibold mb-2">Success Stories</h4>
                <p className="text-gray-300 text-sm">
                  Read inspiring stories from our community members and alumni.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-black/30 p-4 rounded-lg border border-orange-500/20"
              >
                <h4 className="text-orange-400 font-semibold mb-2">Events & Updates</h4>
                <p className="text-gray-300 text-sm">
                  Stay updated with our latest events, announcements, and opportunities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-black/30 p-4 rounded-lg border border-orange-500/20"
              >
                <h4 className="text-orange-400 font-semibold mb-2">Contact Info</h4>
                <p className="text-gray-300 text-sm">
                  Direct access to our contact details and social media channels.
                </p>
              </motion.div>
            </div> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gradient-to-r from-orange-500/20 to-orange-600/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30"
            >
              <p className="text-center text-gray-200 font-medium">
                "Innovation begins with curiosity. Scan to join our journey of transformation."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KnowMoreSection;
