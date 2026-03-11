export const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "John Doe",
    instructorPhoto: "/instructor1.jpg",
    rating: 4.5,
    reviews: 120,
    price: "Free",
    format: "Video",
    level: "Beginner", // Added level property
    duration: "Long",
    description:
      "Learn the basics of web development, including HTML, CSS, and JavaScript.",
    details:
      "This course covers the foundational concepts of web development, including HTML, CSS, and JavaScript. By the end of the course, you'll be able to create your own responsive websites.",
    prerequisites: ["Basic computer knowledge"],
    learningObjectives: [
      "Understand HTML, CSS, and JavaScript",
      "Build responsive websites",
      "Deploy websites online",
    ],
    assessments: "Quizzes, Projects",
    userReviews: [
      { user: "Alice", rating: 5, comment: "Great course!" },
      { user: "Bob", rating: 4, comment: "Very informative." },
    ],
  },
  {
    id: 2,
    title: "Advanced React Techniques",
    instructor: "Jane Smith",
    instructorPhoto: "/instructor2.jpg",
    rating: 4.8,
    reviews: 85,
    price: "$49.99",
    format: "Interactive",
    level: "Advanced", // Added level property
    duration: "Medium", // Added duration property
    description:
      "Master advanced concepts in React, including hooks, context, and performance optimization.",
    details:
      "This course dives deep into advanced React concepts such as hooks, context API, and performance optimization. You'll learn how to build scalable and efficient React applications.",
    prerequisites: ["Basic React knowledge", "JavaScript ES6"],
    learningObjectives: [
      "Understand React hooks in depth",
      "Optimize React app performance",
      "Build scalable React applications",
    ],
    assessments: "Quizzes, Projects",
    userReviews: [
      { user: "Alice", rating: 5, comment: "Great course!" },
      { user: "Bob", rating: 4, comment: "Very informative." },
    ],
  },
  {
    id: 3,
    title: "Full-Stack JavaScript Development",
    instructor: "Michael Brown",
    instructorPhoto: "/instructor2.jpg",
    rating: 4.7,
    reviews: 95,
    price: "$99.99",
    format: "Video",
    level: "Intermediate", // Added level property
    duration: "Short", // Added duration property
    description:
      "Learn how to build full-stack web applications using JavaScript, Node.js, Express, and MongoDB.",
    details:
      "This course provides an in-depth guide to full-stack JavaScript development. You'll learn how to create RESTful APIs with Node.js and Express, work with MongoDB for database management, and build responsive front-end applications.",
    prerequisites: ["Basic JavaScript knowledge", "HTML and CSS"],
    learningObjectives: [
      "Understand full-stack development concepts",
      "Build RESTful APIs with Node.js and Express",
      "Work with MongoDB for database management",
      "Develop responsive front-end applications",
    ],
    assessments: "Quizzes, Projects, Final Capstone Project",
    userReviews: [
      {
        user: "Charlie",
        rating: 5,
        comment: "Excellent course for full-stack development!",
      },
      { user: "Dana", rating: 4, comment: "Very detailed and practical." },
    ],
  },
];
