import { useRouter } from "next/navigation";

export default function ResultsDashboard({ category }: { category: string }) {
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black/50 backdrop-blur-md rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">
        You are a {category}!
      </h2>
      <p className="text-gray-300 mb-6">
        {category === "Seeker" &&
          "You're currently on a journey to understand your purpose and are open to exploring new perspectives."}
        {category === "Explorer" &&
          "You're actively engaged in personal growth and are seeking to deepen your self-awareness."}
        {category === "Matrix Breaker" &&
          "You demonstrate a strong sense of self-mastery and are ready to live in alignment with your higher purpose."}
      </p>
      <button
        onClick={navigateToHome} // Navigate to the home page on click
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Explore Your Path
      </button>
    </div>
  );
}
