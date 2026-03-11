// Define the Question type
type Question = {
  id: number;
  text: string;
  type: "multiple-choice" | "sliding-scale";
  options?: string[]; // Optional for multiple-choice questions
  scale?: { min: number; max: number }; // Optional for sliding-scale questions
};

// Define the props for the component
type QuestionRendererProps = {
  question: Question;
  onAnswer: (answer: string | number) => void;
};

export default function QuestionRenderer({
  question,
  onAnswer,
}: QuestionRendererProps) {
  if (!question) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-orange-400 mb-4">
        {question.text}
      </h2>

      {/* Multiple-Choice Question */}
      {question.type === "multiple-choice" && question.options && (
        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Sliding Scale Question */}
      {question.type === "sliding-scale" && question.scale && (
        <div className="mt-4">
          <input
            type="range"
            min={question.scale.min}
            max={question.scale.max}
            onChange={(e) => onAnswer(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="text-gray-400 text-sm mt-2">
            Selected Value: <span id="slider-value">{question.scale.min}</span>
          </div>
        </div>
      )}
    </div>
  );
}
