"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Instagram,
    Linkedin,
    Youtube,
    ArrowRight,
    MapPin,
    Mail,
    Phone,
    Star
} from "lucide-react";

const Footer = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create floating particles consistent with other components
        const createParticles = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;

            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute rounded-full opacity-0';

                const colors = ['bg-white/30', 'bg-orange-500/20', 'bg-orange-400/15'];
                const colorClass = colors[Math.floor(Math.random() * colors.length)];
                particle.classList.add(colorClass);

                const size = Math.random() * 6 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;

                const animDuration = Math.random() * 15 + 5;
                particle.style.animation = `float ${animDuration}s infinite ease-in-out`;

                particle.style.animationDelay = `${Math.random() * 5}s`;
                particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;

                container.appendChild(particle);
            }
        };

        createParticles();

        return () => {
            if (containerRef.current) {
                const particles = containerRef.current.querySelectorAll('div[class*="absolute rounded-full"]');
                particles.forEach((particle: Element) => particle.remove());
            }
        };
    }, []);

    return (
        <footer className="relative py-16 overflow-hidden">
            {/* Background elements */}
            <div
                ref={containerRef}
                className="absolute inset-0 overflow-hidden z-[1]"
            >
                <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            25% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
            50% { transform: translateY(-40px) translateX(-15px) rotate(-5deg); }
            75% { transform: translateY(-20px) translateX(5px) rotate(3deg); }
          }
        `}</style>

                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] z-[1]"
                    animate={{
                        scale: [0.8, 1, 0.8],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-[2]" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Brand / Vision */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="bg-white/10 backdrop-blur-sm text-xs font-medium text-orange-200 px-3 py-1 rounded-full border border-white/10 inline-flex items-center gap-1 mb-4">
                            <Star size={12} className="text-orange-400" />
                            <span>Our Mission</span>
                        </div>

                        <h2 className="text-2xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200 mb-3">
                            Vyuha Innovation Foundation
                        </h2>

                        <p className="text-gray-300 mb-6 font-outfit">
                            Empowering students to lead innovation through technology, entrepreneurship, and real-world impact.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium font-outfit group"
                        >
                            Learn more about us
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-bold text-white font-outfit mb-6">Navigation</h3>
                        <ul className="space-y-3 text-gray-300 font-outfit">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Our Portfolio", href: "/portfolio" },
                                { name: "Connect and Challenge", href: "/connect" },
                                { name: "Our Clubs and Courses", href: "/clubs" },
                                { name: "About", href: "/about" },
                            ].map((link, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="hover:text-orange-400 transition-colors flex items-center gap-2 group"
                                    >
                                        <span>{link.name}</span>
                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-bold text-white font-outfit mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-gray-300 font-outfit">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-orange-400 flex-shrink-0 mt-1" />
                                <span>Nirmala Convent Road, Lohithya Towers First Floor, Vijayawada, Andhra Pradesh</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-orange-400 flex-shrink-0 mt-1" />
                                <span>founder@ivyuha.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-orange-400 flex-shrink-0 mt-1" />
                                <span>+91 7416417573</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social Media */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-lg font-bold text-white font-outfit mb-6">Connect With Us</h3>

                        <div className="flex gap-4">
                            {[
                                { icon: <Instagram size={20} />, label: "Instagram", color: "hover:text-orange-400",link:"https://www.instagram.com/vyuha_35" },
                                { icon: <Linkedin size={20} />, label: "LinkedIn", color: "hover:text-orange-400",link : "https://www.linkedin.com/in/venkat-kalyan-4239ba21a/" },
                                { icon: <Youtube size={20} />, label: "YouTube", color: "hover:text-orange-400",link : "https://youtube.com/@ananthavyuha" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    className={`bg-white/5 backdrop-blur-sm border border-white/10 text-white h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ${social.color}`}
                                    whileHover={{ y: -5, borderColor: "rgba(249, 115, 22, 0.3)" }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>

                        <p className="mt-6 text-gray-400 text-sm font-outfit">
                            Subscribe to our newsletter for updates on events, opportunities, and innovations.
                        </p>

                        <div className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-orange-500/50 flex-1"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-r-lg text-white"
                            >
                                <ArrowRight size={16} />
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Area */}
                <motion.div
                    className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <p className="text-sm text-gray-400 font-outfit mb-4 md:mb-0">
                        © {new Date().getFullYear()} Vyuha Innovation Foundation. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm text-gray-400 font-outfit">
                        <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;