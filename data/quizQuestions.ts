export const quizQuestions = [
  {
    id: 1,
    text: "Do you often question the meaning of your life and your place in the world?",
    type: "multiple-choice", // Explicitly set the type
    category: "Seeker",
    options: ["Yes", "Sometimes", "No"],
  },
  {
    id: 2,
    text: "How comfortable are you with exploring new ideas and beliefs that challenge your current understanding?",
    type: "sliding-scale", // Explicitly set the type
    category: "Seeker",
    scale: { min: 1, max: 10 },
  },
  {
    id: 3,
    text: "How frequently do you engage in practices that promote self-awareness, such as meditation or journaling?",
    type: "multiple-choice", // Explicitly set the type
    category: "Explorer",
    options: ["Daily", "Weekly", "Rarely", "Never"],
  },
  {
    id: 4,
    text: "Do you feel a strong sense of alignment between your thoughts, words, and actions?",
    type: "multiple-choice", // Explicitly set the type
    category: "Matrix Breaker",
    options: ["Always", "Often", "Sometimes", "Rarely"],
  },
];
