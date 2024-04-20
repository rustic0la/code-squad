"use client";

import React, { useState } from "react";

const QuizCreator = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      question,
      options,
      correctIndex,
    };

    try {
      // const response = await axios.post("/api/quizzes", quizData);
      console.log("Quiz created:", response.data);
      // Provide feedback to the user
    } catch (error) {
      console.error("Error creating quiz:", error);
      // Provide feedback to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Question:</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <label>Options:</label>
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
        />
      ))}
      <label>Correct Answer:</label>
      <select
        value={correctIndex}
        onChange={(e) => setCorrectIndex(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit">Create Quiz</button>
    </form>
  );
};

export default QuizCreator;
