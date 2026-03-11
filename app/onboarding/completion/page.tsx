"use client";

import { useRouter } from "next/navigation";

export default function Completion() {
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">You’re All Set!</h1>
        <p className="text-gray-400 mb-6">
          Welcome to Vyuha, your personalized journey starts now.
        </p>
        <button
          onClick={handleDashboard}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
        >
          Take Me to My Dashboard
        </button>
      </div>
    </div>
  );
}
