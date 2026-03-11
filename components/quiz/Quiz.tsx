import { useState } from "react";
import { quizQuestions } from "@/data/quizQuestions";
import ProgressBar from "./ProgressBar";
import ResultsDashboard from "./ResultsDashboard";
import QuestionRenderer from "./QuestionRenderer";
import FullScreenWrapper from "./FullScreenWrapper";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // New state to track if the quiz has started

  const handleAnswer = (questionId: number, answer: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResults(true);
    }
  };

  const calculateCategory = () => {
    const seekerAnswers = quizQuestions
      .filter((q) => q.category === "Seeker")
      .map((q) => answers[q.id]);
    const explorerAnswers = quizQuestions
      .filter((q) => q.category === "Explorer")
      .map((q) => answers[q.id]);
    const matrixBreakerAnswers = quizQuestions
      .filter((q) => q.category === "Matrix Breaker")
      .map((q) => answers[q.id]);

    const seekerScore = seekerAnswers.filter((a) => a === "Yes").length;
    const explorerScore = explorerAnswers.filter((a) => a === "Daily").length;
    const matrixBreakerScore = matrixBreakerAnswers.filter(
      (a) => a === "Always"
    ).length;

    if (matrixBreakerScore > explorerScore && matrixBreakerScore > seekerScore)
      return "Matrix Breaker";
    if (explorerScore > seekerScore) return "Explorer";
    return "Seeker";
  };

  if (!quizStarted) {
    // Show the "Start Quiz" button before the quiz begins
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <button
          onClick={() => setQuizStarted(true)} // Start the quiz on button click
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Full Screen Mode
        </button>
      </div>
    );
  }

  if (showResults) {
    const category = calculateCategory();

    // Log the answers to the console
    console.log("User's Answers:", answers);

    return (
      <FullScreenWrapper exitFullScreen={true} quizStarted={true}>
        <div className="min-h-screen flex justify-center items-center">
          <ResultsDashboard category={category} />
        </div>
      </FullScreenWrapper>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <FullScreenWrapper exitFullScreen={false} quizStarted={true}>
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-6 bg-black/50 backdrop-blur-md rounded-lg shadow-lg">
          <ProgressBar
            progress={(currentQuestionIndex / quizQuestions.length) * 100}
          />
          <QuestionRenderer
            // @ts-ignore
            question={currentQuestion}
            onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
          />
        </div>
      </div>
    </FullScreenWrapper>
  );
}
