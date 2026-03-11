'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const generateParticleData = (count = 20) => {
    return Array.from({ length: count }, () => ({
        size: Math.random() * 4 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 15 + 5,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.1,
    }));
};

export function ParticleBackground() {
    // Pre-generate particles data once
    const particlesData = useMemo(() => generateParticleData(), []);

    return (
        <div className="absolute inset-0 overflow-hidden z-[1]">
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          50% { transform: translateY(-40px) translateX(-15px) rotate(-5deg); }
          75% { transform: translateY(-20px) translateX(5px) rotate(3deg); }
        }
      `}</style>

            {/* Render particles using React instead of DOM manipulation */}
            {particlesData.map((particle, index) => (
                <div
                    key={`particle-${index}`}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: particle.left,
                        top: particle.top,
                        opacity: particle.opacity,
                        animation: `float ${particle.duration}s infinite ease-in-out`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}

            {/* Orange glow with animation */}
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
        </div>
    );
}
