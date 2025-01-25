import React, { useState } from "react";
import "./ListeningQuestion.css";

const ListeningQuestion = ({ question,selectedOption, onOptionChange  }) => {
 
  return (
    <div className="listening-question-container">
      <p className="listening-question">{question.question}</p>
      <audio className="audio-player" controls>
        <source src={question.link_mp3} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="listening-options">
        {question.options.map((option, index) => (
          <label key={index} className="listening-option">
            <input
              type="radio"
              name={`${question.id_question}`}
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

export default ListeningQuestion;
