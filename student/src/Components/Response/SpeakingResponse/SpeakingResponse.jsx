import "./SpeakingResponse.css";

const SpeakingResponse = ({ responseQuestions }) => {
  return (
    <div className="speaking-response-container">
      {responseQuestions.map((responseQuestion, index) => (
        <div key={responseQuestion.id_question} className="speaking-response-block">
          {/* Nội dung câu hỏi */}
          <div className="speaking-question-content">
            <p>{responseQuestion.question}</p>
          </div>

          {/* Audio Player */}
          <div className="speaking-audio-player">
            <h4>Audio của bạn:</h4>
            <audio controls>
              <source src={responseQuestion?.response?.link_mp3} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Feedback của giáo viên */}
          <div className="teacher-feedback">
            <h4>Điểm:</h4>
            <h4>Nhận xét của giáo viên:</h4>
            <p>{responseQuestion?.response?.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpeakingResponse;
