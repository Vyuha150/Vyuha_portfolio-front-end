"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface PartnerItem {
  name: string;
}

const academicPartners: PartnerItem[] = [
  { name: "KL University" },
  { name: "KITS Guntur" },
  { name: "VR Siddhartha" },
];

const consultingPartners: PartnerItem[] = [
  { name: "Global Degrees" },
  { name: "Hackbots" },
  { name: "Synchronota" },
  { name: "KL IPR" },
];

const clientPartners: PartnerItem[] = [
  { name: "Iconic Infinity Group" },
  { name: "Yatra Elevators" },
  { name: "Origin Tiles" },
  { name: "Okto Farms" },
  { name: "Parivaar Interiors" },
  { name: "Nice Homes Developers" },
  { name: "Srinivasa Developers" },
  { name: "GVR Sea Foods" },
  { name: "Grand Mount Family Holding" },
  { name: "Nutrix" },
  { name: "The Nature's Way" },
  { name: "Celestial" },
  { name: "Aranya" },
];

function PartnerCard({
  name,
  category,
  index,
  accentColor = "orange",
}: {
  name: string;
  category: string;
  index: number;
  accentColor?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl bg-[#111111]/80 backdrop-blur-sm border border-white/10 p-6 hover:border-orange-500/40 hover:shadow-[0_0_25px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Subtle top corner gradient glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-orange-400/90 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
            {category}
          </span>
          <CheckCircle2 className="w-4 h-4 text-orange-400/60 group-hover:text-orange-400 transition-colors" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
          {name}
        </h3>
      </div>
    </motion.div>
  );
}

export default function OurPartnersAndClientsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-transparent text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* 1. Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Collaborative Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent">
              Our Partners & Clients
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light">
            Vyuha collaborates with forward-looking academic institutions,
            specialized consulting partners, and dynamic industry organizations to
            create meaningful opportunities, empower youth, and deliver
            practical impact.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full" />
        </motion.div>

        {/* 2. Academic Partners Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Academic Partners
                </h2>
                <p className="text-sm text-gray-400">
                  Institutions fostering student development and academic excellence
                </p>
              </div>
            </div>
            <span className="text-xs text-orange-400/80 font-mono">
              {academicPartners.length} Institutions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {academicPartners.map((partner, index) => (
              <PartnerCard
                key={partner.name}
                name={partner.name}
                category="Academic"
                index={index}
              />
            ))}
          </div>
        </section>

        {/* 3. Consulting Partners Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Consulting Partners
                </h2>
                <p className="text-sm text-gray-400">
                  Strategic advisors and innovation partners driving professional growth
                </p>
              </div>
            </div>
            <span className="text-xs text-orange-400/80 font-mono">
              {consultingPartners.length} Partners
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultingPartners.map((partner, index) => (
              <PartnerCard
                key={partner.name}
                name={partner.name}
                category="Consulting"
                index={index}
              />
            ))}
          </div>
        </section>

        {/* 4. Clients & Industry Partners Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Clients & Industry Partners
                </h2>
                <p className="text-sm text-gray-400">
                  Enterprises and industry leaders collaborating for real-world impact
                </p>
              </div>
            </div>
            <span className="text-xs text-orange-400/80 font-mono">
              {clientPartners.length} Organizations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clientPartners.map((partner, index) => (
              <PartnerCard
                key={partner.name}
                name={partner.name}
                category="Industry"
                index={index}
              />
            ))}
          </div>
        </section>

        {/* 5. Closing CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-r from-orange-500/10 via-[#161616] to-orange-600/10 border border-orange-500/30 p-8 sm:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Collaborate With Vyuha
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Join our network of academic institutions, consulting experts, and
              industry pioneers. Partner with us to cultivate talent and build
              future-ready solutions.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 group"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
