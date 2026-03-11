"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step2() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    router.push("/onboarding/step3");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:block">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Welcome Illustration"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-black border border-gray-700 text-white rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-black border border-gray-700 text-white rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone (Optional)
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-black border border-gray-700 text-white rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-black border border-gray-700 text-white rounded-lg"
              />
            </div>
          </form>
          <button
            onClick={handleNext}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full"
          >
            Next: Self Discovery →
          </button>
        </div>
      </div>
    </div>
  );
}
