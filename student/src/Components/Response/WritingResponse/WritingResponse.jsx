import "./WritingResponse.css";

const WritingResponse = ({ responseQuestion }) => {
  return (
    <div className="writing-response-container">
        <div key={responseQuestion.id_question} className="writing-response-block">
          {/* Nội dung câu hỏi */}
          <div className="writing-question-content">
            <p>Question: {responseQuestion.question}</p>
          </div>

          {/* Đoạn văn của học sinh */}
          <div className="student-answer-section">
            <h4>Bài làm của bạn:</h4>
            <textarea
              className="student-answer"
              value={responseQuestion?.response?.response}
              readOnly
            />
          </div>

          {/* Feedback của giáo viên */}
          <div className="teacher-feedback">
            <h4>Điểm: {responseQuestion.response.score}</h4>
            <h4>Nhận xét của giáo viên:</h4>
            <p>{responseQuestion.response.comment}</p>
          </div>
        </div>
    </div>
  );
};

export default WritingResponse;
