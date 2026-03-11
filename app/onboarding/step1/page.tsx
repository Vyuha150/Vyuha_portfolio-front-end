"use client";

import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding/step2");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to Vyuha</h1>
        <p className="text-gray-400 mb-6">
          Your journey to discovering your true potential starts here!
        </p>
        <p className="text-gray-400 mb-8">
          Let’s understand your strengths, goals, and learning style to
          personalize your experience.
        </p>
        <button
          onClick={handleNext}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
        >
          Let’s Begin
        </button>
      </div>
    </div>
  );
}
