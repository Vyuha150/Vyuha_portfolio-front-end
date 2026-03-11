import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function IconicLoader() {
  const [fadeOut, setFadeOut] = useState(false);

  // Start fade out animation before the component unmounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000); // Start fade out after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#18120b] to-[#1a1207] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Enhanced Loader Section */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        {/* Multiple layered glows */}
        <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-orange-400/40 via-yellow-300/30 to-red-400/20 blur-3xl animate-pulse-slow" />
        <div className="absolute w-3/4 h-3/4 rounded-full bg-gradient-to-br from-yellow-400/30 via-orange-500/20 to-red-500/10 blur-2xl animate-pulse" />

        {/* Single circle of revolving dots */}

        {/* Outer rotating ring */}
        <div className="absolute w-56 h-56 rounded-full border-4 border-transparent border-t-orange-400 border-r-yellow-400 animate-spin" />
        <div className="absolute w-48 h-48 rounded-full border-2 border-transparent border-b-red-400 border-l-orange-300 animate-[spin_3s_linear_infinite_reverse]" />

        {/* Main loader container */}
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#2a1a0a] to-[#18120b] border-2 border-orange-400 flex items-center justify-center shadow-2xl overflow-hidden">
          {/* Inner spinning elements */}
          <div className="absolute -inset-3 rounded-full border-2 border-transparent border-r-orange-400 border-t-yellow-400 animate-spin" />
          <div className="absolute -inset-1 rounded-full border-2 border-transparent border-l-red-400 border-b-orange-300 animate-[spin_2s_linear_infinite_reverse]" />
          <div className="absolute inset-3 rounded-full border border-transparent border-t-yellow-300 animate-[spin_4s_linear_infinite]" />

          {/* Pulsing center */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-400/10 flex items-center justify-center animate-pulse-glow">
            <Image src="/logo.png" alt="Vyuha Logo" width={140} height={140} />
          </div>
        </div>
      </div>

      {/* Enhanced Company Name with typewriter effect */}
      <div className="relative mb-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 animate-gradient-shift typewriter">
          VYUHA INNOVATION FOUNDATION
        </h2>
        <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-xl animate-text-glow" />
      </div>

      {/* Enhanced Subtitle */}
      <p className="text-xl text-orange-200 mb-8 text-center font-medium animate-fade-in-up">
        Loading the future of innovation...
      </p>

      {/* Advanced Progress Bar */}
      <div className="relative w-80 h-3 bg-gradient-to-r from-[#2a1a0a] to-[#1a1207] rounded-full overflow-hidden border border-orange-400/30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent animate-shimmer-bg" />
        <div
          className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 animate-progress-wave rounded-full relative overflow-hidden"
          style={{ width: "45%" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-progress-shine" />
        </div>
        <div className="absolute inset-0 rounded-full shadow-inner" />
      </div>
      <style>{`
        .animate-loader-bar {
          animation: loader-bar 1.8s cubic-bezier(0.4,0,0.2,1) infinite alternate;
        }
        @keyframes loader-bar {
          0% { width: 10%; }
          100% { width: 90%; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }
        @keyframes pulse-glow {
          0% { 
            background: linear-gradient(45deg, rgba(255,165,0,0.2), rgba(255,215,0,0.1));
            transform: scale(1);
          }
          100% { 
            background: linear-gradient(45deg, rgba(255,165,0,0.4), rgba(255,215,0,0.3));
            transform: scale(1.05);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .animate-orbit {
          animation: orbit 4s linear infinite;
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(0.8);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) scale(1);
            opacity: 1;
          }
          75% { 
            transform: translateY(-10px) translateX(-10px) scale(1.2);
            opacity: 0.8;
          }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite alternate;
        }
        @keyframes text-glow {
          0% { opacity: 0.5; transform: scale(0.98); }
          100% { opacity: 0.8; transform: scale(1.02); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out 0.5s both;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer-bg {
          animation: shimmer-bg 2s ease-in-out infinite;
        }
        @keyframes shimmer-bg {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-progress-wave {
          animation: progress-wave 2s ease-in-out infinite alternate;
        }
        @keyframes progress-wave {
          0% { width: 30%; }
          100% { width: 70%; }
        }
        
        .animate-progress-shine {
          animation: progress-shine 1.5s ease-in-out infinite;
        }
        @keyframes progress-shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
}
