import React, { useContext } from "react";
import "./ReadingResponse.css";
import { StudentContext } from "../../../Context/Context";

const ReadingResponse = ({ questions }) => {

  const { responses } = useContext(StudentContext);
  // Ghép Responses vào Question 
  const responseQuestions = questions.map((question) => {
    const matchedResponse = responses.find(
      (response) => response.id_question === question.id_question && response.id_student === 1
    );
    const nullResponse =  { id_response: null, 
      id_student: null, id_question: null, 
      link_mp3: null, link_image: null, 
      response: "", score: null, 
      comment: "" }
    return {
      ...question, // Giữ lại dữ liệu cũ trong question
      response: matchedResponse ? matchedResponse : nullResponse // Thêm điểm từ response
    };
  });

  return (
    <div className="reading-result">
      {responseQuestions.map((responseQuestion) => (
        <div key={responseQuestion.id_question} className="result-question-block">
          {/* Câu hỏi */}
          <h3 className="question-content">Question: {responseQuestion.question}</h3>

          {/* Các lựa chọn đáp án */}
          <div className="options-container">
            {responseQuestion.options.map((option, index) => (
              <div key={index} className="option-item">
                <label>
                  <input
                    type="radio"
                    name={`question-${responseQuestion.id_question}`}
                    value={option}
                    checked={option === responseQuestion.response.response} // Đáp án đã chọn
                    disabled // Vô hiệu hóa các lựa chọn
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Hiển thị đáp án và giải thích */}
          <div className="explanation-container">
            {responseQuestion.response.response === responseQuestion.answer ?
              (<p className="correct-answer">
                <strong>Correct Response </strong>
              </p>) : (<p className="wrong-answer">
                <strong>Wrong Response </strong>
              </p>)}
              <p className="correct-answer">
                <strong>Correct Answer: </strong>
                {responseQuestion.answer}
              </p>
            <p className="answer-explanation">
              <strong>Explanation: </strong>
              {responseQuestion.response.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingResponse;
