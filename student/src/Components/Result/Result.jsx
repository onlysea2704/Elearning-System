import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReadingResponse from './../Response/ReadingResponse/ReadingResponse';
import ListeningResponse from "./../Response/ListeningResponse/ListeningResponse";
import WritingResponse from "./../Response/WritingResponse/WritingResponse";
import SpeakingResponse from "./../Response/SpeakingResponse/SpeakingResponse";

import "./Result.css";
import { publicAxios } from "../../services/axios-instance";

const Result = () => {
  const { id_course, id_lesson } = useParams();
  const [result, setResult] = useState();
  const [respones, setResponses] = useState([]);
  // const { quizzes, questions } = useContext(StudentContext);

  // // Tìm quiz hiện tại và các câu hỏi liên quan
  // const currentQuiz = quizzes.find(
  //   (quiz) => quiz.id_lesson === Number(id_lesson)
  // );

  // const relatedQuestions = questions.filter(
  //   (question) => question.id_quiz === currentQuiz?.id_quiz
  // );

  useEffect(() => {
    const fetchResponse = async () => {

      const result = await publicAxios.post('/result/get-result-by-id-lesson', { idLesson: id_lesson });
      setResult(result.data);
      const response = await publicAxios.post('/respone/get-response-by-id-result', { idResult: result.data.id_result });
      setResponses(response.data);
      // setListLesson(response.data)
      // console.log(response.data)
    };
    fetchResponse(); // Gọi API khi component được mount
  }, [id_lesson]); // gọi khi isPurchase bị thay đổi giá trị

  return (
    <div className="result-page-container">
      <div className="result-header">
        <h1 className="result-title"> Results for: {currentQuiz?.name_quiz}</h1>
        <div className="result-score">Score: {currentQuiz?.score ?? 0} / 100</div>
      </div>

      <div className="result-content">
        {currentQuiz?.type_quiz.toLowerCase() === "reading" && (
          <ReadingResponse questions={relatedQuestions} />
        )}
        {currentQuiz?.type_quiz.toLowerCase() === "listening" && (
          <ListeningResponse questions={relatedQuestions} />
        )}
        {currentQuiz?.type_quiz.toLowerCase() === "writing" && (
          <WritingResponse questions={relatedQuestions} />
        )}
        {currentQuiz?.type_quiz.toLowerCase() === "speaking" && (
          <SpeakingResponse questions={relatedQuestions} />
        )}
      </div>

      <Link to={`/coursedetail/${id_course}/lesson/${Number(id_lesson) + 1}`} className="result-back-button">
        Next Lesson
      </Link>
    </div>
  );
};

export default Result;
