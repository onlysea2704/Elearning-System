import React from "react";
import "./SpeakingResponse.css";

// Dữ liệu câu hỏi và feedback được gộp vào 1 mảng
const speakingData = [
  {
    id_question: 1,
    content: "Describe your daily routine.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    feedback: "Good job! Your vocabulary is impressive, but work on your fluency.",
  },
  {
    id_question: 2,
    content: "What do you like about your job?",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    feedback: "You answered clearly, but try to avoid pauses.",
  },
  {
    id_question: 3,
    content: "Explain your favorite book.",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    feedback: "Nice explanation, but improve your pronunciation for 'favorite'.",
  },
];

const SpeakingResponse = () => {
  return (
    <div className="speaking-response-container">
      {speakingData.map((item, index) => (
        <div key={item.id_question} className="speaking-response-block">
          {/* Nội dung câu hỏi */}
          <div className="speaking-question-content">
            <p>{item.content}</p>
          </div>

          {/* Audio Player */}
          {item.audio && (
            <div className="speaking-audio-player">
              <h4>Audio của bạn:</h4>
              <audio controls>
                <source src={item.audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Feedback của giáo viên */}
          <div className="teacher-feedback">
            <h4>Điểm:</h4>
            <h4>Nhận xét của giáo viên:</h4>
            <p>{item.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpeakingResponse;
