"use client";
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Instagram,
    Linkedin,
    Youtube,
    Music, // Replaced Spotify with Music
    Mic,
    Monitor, // Replaced Apple with Monitor
    Star,
    ArrowRight
} from "lucide-react";

const SocialMedia = () => {
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
        <section className="relative py-24 overflow-hidden">
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
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] z-[1]"
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

                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-orange-400/10 blur-[100px] z-[1]"
                    animate={{
                        scale: [1, 0.8, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-[2]" />

            <div className="max-w-6xl mx-auto px-8 relative z-10">

                {/* Podcast Section */}
                <motion.div
                    className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-2xl overflow-hidden backdrop-blur-sm max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    whileHover={{
                        boxShadow: "0 0 30px 5px rgba(249, 115, 22, 0.2)",
                        borderColor: "rgba(249, 115, 22, 0.4)"
                    }}
                >
                    <div className="p-10 md:p-12">
                        <motion.div
                            className="mb-6 bg-orange-500/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto border border-orange-500/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        >
                            <Mic className="h-8 w-8 text-orange-400" />
                        </motion.div>

                        <motion.h3
                            className="text-2xl sm:text-3xl font-bold text-white mb-3 font-outfit text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            🎙 Vyuha Talks — Coming Soon
                        </motion.h3>

                        <motion.p
                            className="text-gray-300 mb-8 text-center font-outfit"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            Explore student journeys, mentor insights, and breakthrough stories through our upcoming podcast.
                        </motion.p>

                        <motion.div
                            className="flex justify-center gap-8 text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            {[
                                { icon: <Music className="h-6 w-6" />, color: "hover:text-green-500" },
                                { icon: <Monitor className="h-6 w-6" />, color: "hover:text-gray-300" },
                                { icon: <Youtube className="h-6 w-6" />, color: "hover:text-red-500" }
                            ].map((platform, index) => (
                                <motion.div
                                    key={index}
                                    className={`cursor-pointer ${platform.color} transition-colors duration-300`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {platform.icon}
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="mt-8 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium font-outfit mx-auto group"
                            >
                                Get notified on launch
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default SocialMedia;