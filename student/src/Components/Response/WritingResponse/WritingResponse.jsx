import React from "react";
import "./WritingResponse.css";

// Dữ liệu câu hỏi và đoạn văn của học sinh
const writingData = [
  {
    id_question: 1,
    score: 40,
    content: "Write an essay about your favorite hobby.",
    studentAnswer:
      "My favorite hobby is reading books. Reading allows me to explore new worlds, gain knowledge, and relax during my free time. I enjoy fiction, non-fiction, and sometimes fantasy novels. My favorite author is J.K. Rowling because her stories are full of creativity and magic. Books are my best companions, and I try to read at least one book a month.My favorite hobby is reading books. Reading allows me to explore new worlds, gain knowledge, and relax during my free time. I enjoy fiction, non-fiction, and sometimes fantasy novels. My favorite author is J.K. Rowling because her stories are full of creativity and magic. Books are my best companions, and I try to read at least one book a month.",
    feedback: "Good structure and vocabulary! Try to add more examples next time.",
  },
  {
    id_question: 2,
    score: 20,
    content: "Explain the benefits of learning a new language.",
    studentAnswer:
      "Learning a new language can open many opportunities. It helps you connect with people from different cultures, improves your cognitive abilities, and enhances your career options. For example, knowing English has helped me communicate with friends online and study international courses.",
    feedback: "Great job! Consider making your arguments more detailed with statistics.",
  },
];

const WritingResponse = () => {
  return (
    <div className="writing-response-container">
      {writingData.map((item, index) => (
        <div key={item.id_question} className="writing-response-block">
          {/* Nội dung câu hỏi */}
          <div className="writing-question-content">
            <h3>Câu hỏi {index + 1}:</h3>
            <p>{item.content}</p>
          </div>

          {/* Đoạn văn của học sinh */}
          <div className="student-answer-section">
            <h4>Bài làm của học sinh:</h4>
            <textarea
              className="student-answer"
              value={item.studentAnswer}
              readOnly
            />
          </div>

          {/* Feedback của giáo viên */}
          <div className="teacher-feedback">
            <h4>Điểm: {item.score}</h4>
            <h4>Nhận xét của giáo viên:</h4>
            <p>{item.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WritingResponse;
