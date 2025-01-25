import React from "react";
import "./WritingQuestion.css";

const WritingQuestion = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="writing-question-container">
      <p className="writing-question">{question.question}</p>
      {question.link_image && (
        <div className="writing-question-image">
          <img src={question.link_image} alt="Question Illustration" />
        </div>
      )}
      <textarea
        name={`${question.id_question}`}
        className="writing-textarea"
        placeholder="Write your answer here..."
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default WritingQuestion;
