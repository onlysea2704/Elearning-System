import React, { useContext, useState } from "react";
import "./Quiz.css";
import ReadingQuestion from "../Question/ReadingQuestion/ReadingQuestion";
import ListeningQuestion from "../Question/ListeningQuestion/ListeningQuestion";
import WritingQuestion from "../Question/WritingQuestion/WritingQuestion";
import SpeakingQuestion from "../Question/SpeakingQuestion/SpeakingQuestion";
import { StudentContext } from "../../Context/Context";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { id_lesson } = useParams();
  const { quizzes, questions } = useContext(StudentContext);

  // Tìm quiz hiện tại và các câu hỏi liên quan
  const currentQuiz = quizzes.find(
    (quiz) => quiz.id_lesson === Number(id_lesson)
  );

  const relatedQuestions = questions.filter(
    (question) => question.id_quiz === currentQuiz?.id_quiz
  );

  // State quản lý câu trả lời
  const [answers, setAnswers] = useState(
    Array(relatedQuestions.length).fill(null)
  );

  const handleAnswerChange = (questionIndex, answerValue) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answerValue;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Quiz submitted! Check console for answers.");
  };

  // Render câu hỏi dựa trên loại quiz
  const renderQuestions = () => {
    return relatedQuestions.map((question, index) => (
      <div key={question.id_question} className="quiz-question-block">
        {currentQuiz?.type_quiz.toLowerCase() === "reading" && (
          <ReadingQuestion
            question={question}
            selectedOption={answers[index]}
            onOptionChange={(value) => handleAnswerChange(index, value)}
          />
        )}
        {currentQuiz?.type_quiz.toLowerCase() === "listening" && (
          <ListeningQuestion
            question={question}
            selectedOption={answers[index]}
            onOptionChange={(value) => handleAnswerChange(index, value)}
          />
        )}
        {currentQuiz?.type_quiz.toLowerCase() === "writing" && (
          <WritingQuestion
            question={question}
            answer={answers[index]}
            onAnswerChange={(value) => handleAnswerChange(index, value)}
          />
        )}
        {currentQuiz?.type_quiz.toLowerCase() === "speaking" && (
          <SpeakingQuestion
            question={question}
            onFileUpload={(file) => handleAnswerChange(index, file)}
          />
        )}
      </div>
    ));
  };

  return (
    <div className="quiz-page-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{currentQuiz?.name_quiz}</h1>
      </div>
      <div className="quiz-content">{renderQuestions()}</div>
      <button className="quiz-submit-button" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;
