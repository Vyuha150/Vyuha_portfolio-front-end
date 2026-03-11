"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step3() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [goal, setGoal] = useState("");

  const handleNext = () => {
    router.push("/onboarding/step4");
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Self Discovery</h1>
        <div className="space-y-6">
          {/* Skills Assessment */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Skills Assessment</h2>
            <p className="text-gray-400 mb-4">
              Rate your skills on a scale of 1 to 5.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Communication</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-2/3"
                  onChange={() => setProgress(progress + 10)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Technical Skills</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-2/3"
                  onChange={() => setProgress(progress + 10)}
                />
              </div>
            </div>
          </div>

          {/* Interest Quiz */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Interest Quiz</h2>
            <p className="text-gray-400 mb-4">Select your areas of interest.</p>
            <div className="flex gap-4">
              <button className="bg-gray-800 py-2 px-4 rounded-lg hover:bg-gray-700">
                Tech
              </button>
              <button className="bg-gray-800 py-2 px-4 rounded-lg hover:bg-gray-700">
                Arts
              </button>
              <button className="bg-gray-800 py-2 px-4 rounded-lg hover:bg-gray-700">
                Business
              </button>
            </div>
          </div>

          {/* Goal Setting */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Set Your Goals</h2>
            <p className="text-gray-400 mb-4">
              What do you want to achieve with Vyuha?
            </p>
            <input
              type="text"
              value={goal}
              onChange={handleGoalChange}
              placeholder="Enter your goals"
              className="w-full p-3 bg-black border border-gray-700 text-white rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleNext}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full"
        >
          Next: Set Preferences →
        </button>
      </div>
    </div>
  );
}
