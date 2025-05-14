import "./ReadingResponse.css";

const ReadingResponse = ({ responseQuestions }) => {

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
                    checked={option === responseQuestion?.response?.response} // Đáp án đã chọn
                    disabled // Vô hiệu hóa các lựa chọn
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Hiển thị đáp án và giải thích */}
          <div className="explanation-container">
            {responseQuestion?.response?.response === responseQuestion.answer ?
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
              {responseQuestion.response?.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadingResponse;
