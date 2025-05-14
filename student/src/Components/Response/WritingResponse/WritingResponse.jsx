import "./WritingResponse.css";

const WritingResponse = ({ responseQuestions }) => {
  return (
    <div className="writing-response-container">
      {responseQuestions.map((responseQuestion, index) => (
        <div key={responseQuestion.id_question} className="writing-response-block">
          {/* Nội dung câu hỏi */}
          <div className="writing-question-content">
            <h3>Câu hỏi {index + 1}:</h3>
            <p>{responseQuestion.question}</p>
          </div>

          {/* Đoạn văn của học sinh */}
          <div className="student-answer-section">
            <h4>Bài làm của học sinh:</h4>
            <textarea
              className="student-answer"
              value={responseQuestion?.response?.response}
              readOnly
            />
          </div>

          {/* Feedback của giáo viên */}
          <div className="teacher-feedback">
            <h4>Điểm: {responseQuestion?.response?.score}</h4>
            <h4>Nhận xét của giáo viên:</h4>
            <p>{responseQuestion.question.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WritingResponse;
