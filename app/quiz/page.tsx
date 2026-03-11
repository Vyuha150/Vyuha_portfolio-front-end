"use client";
import { useState } from "react";
import Quiz from "@/components/quiz/Quiz";

export default function QuizPage() {
  const [startQuiz, setStartQuiz] = useState(false);

  if (startQuiz) {
    return <Quiz />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz</h1>
      <p className="text-gray-400 mb-6">
        Please ensure you have 10 minutes of uninterrupted time to complete the
        quiz.
      </p>
      <button
        onClick={() => setStartQuiz(true)}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
      >
        Start Quiz
      </button>
    </div>
  );
}
