"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Leaf, Package, Tractor } from "lucide-react";

const showcaseSections = [
  {
    title: "Paddy and Rice",
    subtitle: "Premium sourcing, processing, and export-ready quality.",
    image: "/business/business_consulting.jpg",
    icon: Package,
    products: [
      "Raw Paddy (multiple grades)",
      "White Rice & Parboiled Rice",
      "Long Grain / Medium Grain varieties",
      "Bulk packaging for domestic & export markets",
    ],
    services: [
      "Farmer network sourcing",
      "Moisture and quality checks",
      "Sorting, grading and bagging",
      "Logistics coordination and dispatch",
    ],
  },
  {
    title: "Vegetables and Fruits",
    subtitle: "Farm-fresh produce supply chain with dependable delivery.",
    image: "/business/community_health_drives.jpg",
    icon: Leaf,
    products: [
      "Seasonal vegetables",
      "Fresh fruits for retail and wholesale",
      "Custom assortment for B2B buyers",
      "Packhouse-ready and market-ready lots",
    ],
    services: [
      "Post-harvest handling",
      "Cold-chain ready packaging",
      "Quality sorting and shelf-life planning",
      "Regional and interstate distribution",
    ],
  },
  {
    title: "Spices and Aloe Products",
    subtitle: "Value-added natural products for modern markets.",
    image: "/business/spirituality_wellbeing.jpg",
    icon: CheckCircle2,
    products: [
      "Whole and powdered spices",
      "Aloe vera raw leaves",
      "Aloe-based wellness product mock range",
      "Custom private-label opportunities",
    ],
    services: [
      "Product sourcing and curation",
      "Basic processing and compliance-ready packaging",
      "Batch consistency and traceability",
      "B2B supply and export support",
    ],
  },
  {
    title: "Technology Solutions in Agriculture",
    subtitle: "Autonomous vehicles, drone-led operations, and smart workflows.",
    image: "/business/technical_skilling.jpg",
    icon: Tractor,
    products: [
      "Autonomous field vehicle concepts",
      "Spraying and surveillance drone mock solutions",
      "Farm monitoring dashboards (concept)",
      "Decision support analytics (mock modules)",
    ],
    services: [
      "Pilot planning and implementation support",
      "Drone mapping and farm assessment",
      "Process automation recommendations",
      "Training and adoption enablement",
    ],
  },
];

export default function ExportsAndAgriBusinessPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 text-orange-300 text-sm mb-5">
            <Leaf className="w-4 h-4" />
            Business Vertical
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Exports and agri business
          </h1>
          <p className="mt-5 text-gray-300 max-w-3xl mx-auto text-base md:text-lg">
            A professional showcase page for our agri-focused offerings.
            Products and services are organized in scroll-based sections with
            mock-up visuals for now.
          </p>
        </motion.div>

        <div className="space-y-10">
          {showcaseSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-7 bg-black/35 border border-white/10 rounded-2xl p-5 md:p-7"
              >
                <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-orange-500/20">
                  <Image
                    src={section.image}
                    alt={`${section.title} mock-up`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-orange-400">
                    {section.title}
                  </h2>
                  <p className="text-gray-300 mt-2 mb-5">{section.subtitle}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-black/40 border border-white/10 p-4">
                      <h3 className="text-white font-semibold mb-3">Products</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        {section.products.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-black/40 border border-white/10 p-4">
                      <h3 className="text-white font-semibold mb-3">Services</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        {section.services.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/business"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Back to Business Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
