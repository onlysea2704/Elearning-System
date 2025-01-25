import React from "react";
import "./ReadingQuestion.css";

const ReadingQuestion = ({ question, selectedOption, onOptionChange}) => {
  return (
    <div className="reading-question-container">
      <p className="reading-question">{question.question}</p>
      <div className="reading-options">
        {question.options.map((option, index) => (
          <label key={index} className="reading-option">
            <input
              type="radio"
              name={`${question.id_question}`} /* Mỗi câu hỏi có một name khác nhau */
              value={index}
              checked={selectedOption === index}
              onChange={() => onOptionChange(index)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ReadingQuestion;
