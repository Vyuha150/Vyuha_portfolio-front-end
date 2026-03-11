"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step4() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<{
    interests: string[];
    format: string;
    communication: string;
  }>({
    interests: [],
    format: "",
    communication: "",
  });

  const handleToggle = (
    key: "interests" | "format" | "communication",
    value: string
  ) => {
    setPreferences((prev) => {
      if (key === "interests") {
        // Toggle interests array
        const updatedInterests = prev.interests.includes(value)
          ? prev.interests.filter((interest) => interest !== value)
          : [...prev.interests, value];
        return { ...prev, interests: updatedInterests };
      } else {
        // Toggle single-value keys (format, communication)
        return { ...prev, [key]: prev[key] === value ? "" : value };
      }
    });
  };

  const handleSubmit = () => {
    // Save preferences to local storage or backend
    localStorage.setItem("preferences", JSON.stringify(preferences));
    router.push("/onboarding/completion");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Set Your Preferences</h1>
        <div className="space-y-6">
          {/* Areas of Interest */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Areas of Interest</h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleToggle("interests", "Tech")}
                className={`py-2 px-4 rounded-lg ${
                  preferences.interests.includes("Tech")
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }`}
              >
                Tech
              </button>
              <button
                onClick={() => handleToggle("interests", "Design")}
                className={`py-2 px-4 rounded-lg ${
                  preferences.interests.includes("Design")
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }`}
              >
                Design
              </button>
            </div>
          </div>

          {/* Format Preference */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Format Preference</h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleToggle("format", "Audio")}
                className={`py-2 px-4 rounded-lg ${
                  preferences.format === "Audio"
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }`}
              >
                Audio
              </button>
              <button
                onClick={() => handleToggle("format", "Video")}
                className={`py-2 px-4 rounded-lg ${
                  preferences.format === "Video"
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }`}
              >
                Video
              </button>
            </div>
          </div>

          {/* Communication */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Communication</h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleToggle("communication", "Email")}
                className={`py-2 px-4 rounded-lg ${
                  preferences.communication === "Email"
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => handleToggle("communication", "WhatsApp")}
                className={`py-2 px-4 rounded-lg ${
                  preferences.communication === "WhatsApp"
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }`}
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full"
        >
          Submit & Get My Personalized Dashboard 🚀
        </button>
      </div>
    </div>
  );
}
