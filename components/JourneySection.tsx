"use client";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const JourneySection = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleButtonClick = () => {
    // Navigate to the quiz page
    router.push("/membership");
  };
  return (
    <section className="relative py-12 lg:py-16 text-white min-h-[50vh] flex items-center justify-center bg-transparent z-[1]">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto px-4 w-full gap-12">
        {/* 3D Model on the left */}
        <div className="flex-shrink-0">
          {isMounted && (
            <div
              dangerouslySetInnerHTML={{
                __html: `
              <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
              <model-viewer 
                src="/vyuha.glb" 
                alt="A 3D model of a hand with rings"
                camera-controls
                auto-rotate
                ar
                autoplay animation-name="ChakraAction"
                style="width: 400px; height: 400px; background-color: transparent; border: 1px solid orange; border-radius: 8px;">
              </model-viewer>
            `,
              }}
            />
          )}
        </div>
        {/* Content on the right */}
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            WE CONQUER THE KNOWN AND FORGE THE UNKNOWN
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mb-8">
            VYUHA guides you to break free from conditioning, cultivate
            self-awareness, and achieve lasting transformation.
          </p>
          <button
            className="mt-6 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                       hover:from-orange-600 hover:to-orange-700 text-white font-semibold 
                       rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 
                       hover:shadow-xl ring-2 ring-orange-500/30 hover:ring-orange-500/50
                       transform hover:scale-105 active:scale-95 transition-all duration-300
                       relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-400/20 before:to-orange-600/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
            onClick={handleButtonClick}
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
