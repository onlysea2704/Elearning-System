import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReadingResponse from './../Response/ReadingResponse/ReadingResponse';
import ListeningResponse from "./../Response/ListeningResponse/ListeningResponse";
import WritingResponse from "./../Response/WritingResponse/WritingResponse";
import SpeakingResponse from "./../Response/SpeakingResponse/SpeakingResponse";

import "./Result.css";
import { authAxios, publicAxios } from "../../services/axios-instance";

const Result = () => {
  const { id_course, id_lesson } = useParams();
  const [result, setResult] = useState();
  // const [respones, setResponses] = useState([]);
  const [responesQuestions, setresponesQuestions] = useState([]);
  const type_quiz = "reading";
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

      const result = await authAxios.post('/result/get-result-by-id-lesson', { idLesson: id_lesson });
      if (!result.data) {
        return;
      }
      console.log(result.data);
      setResult(result.data);
      const responses = await authAxios.post('/response/get-all-response-by-id-result', { idResult: result.data.id_result });
      // setResponses(response.data);
      console.log(responses.data);

      const infoQuiz = await publicAxios.post('/lesson/get-quiz-by-id-lesson', { idLesson: id_lesson });
      if (!infoQuiz.data) {
        console.error("No quiz data found");
        return;
      }
      const questionQuiz = await authAxios.post('/question/get-all-question-by-quiz-id', { idQuiz: infoQuiz.data.id_quiz });
      console.log(result.data);
      const questions = questionQuiz.data.map(q => ({
        ...q,
        options: [q.option_1, q.option_2, q.option_3, q.option_4]
      }));
      console.log(questions);

      const merged = questions.map(question => {
        const response = responses.data.find(r => r.id_question === question.id_question);
        return {
          ...question,
          response: response ? response : null
        };
      });

      console.log(merged);
      setresponesQuestions(merged);
    };
    fetchResponse(); // Gọi API khi component được mount
  }, [id_lesson]); // gọi khi isPurchase bị thay đổi giá trị

  return (
    <div className="result-page-container">
      <div className="result-header">
        <h1 className="result-title"> Results for: {result?.name_quiz}</h1>
        <div className="result-score">Score: {result?.score ?? 0} / 100</div>
      </div>

      <div className="result-content">
        {type_quiz === "reading" && (
          <ReadingResponse responseQuestions={responesQuestions} />
        )}
        {type_quiz === "listening" && (
          <ListeningResponse responseQuestions={responesQuestions} />
        )}
        {type_quiz === "writing" && (
          <WritingResponse responseQuestions={responesQuestions} />
        )}
        {type_quiz === "speaking" && (
          <SpeakingResponse responseQuestions={responesQuestions} />
        )}
      </div>

      <Link to={`/coursedetail/${id_course}/lesson/${Number(id_lesson) + 1}`} className="result-back-button">
        Next Lesson
      </Link>
    </div>
  );
};

export default Result;
