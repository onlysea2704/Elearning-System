import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReadingResponse from './../Response/ReadingResponse/ReadingResponse';
import ListeningResponse from "./../Response/ListeningResponse/ListeningResponse";
import WritingResponse from "./../Response/WritingResponse/WritingResponse";
import SpeakingResponse from "./../Response/SpeakingResponse/SpeakingResponse";

import "./Result.css";
import { authAxios } from "../../services/axios-instance";
import { StudentContext } from "../../Context/Context";

const Result = () => {
  const { id_course, id_lesson } = useParams();
  const [responseQuestions, setresponseQuestions] = useState([]);
  const { statusLesson } = useContext(StudentContext)
  useEffect(() => {
    const fetchResponse = async () => {

      const result = await authAxios.post('/result/get-result-by-id-lesson', { idLesson: id_lesson });
      if (!result.data) {
        setresponseQuestions([])
        return;
      }
      console.log(result.data);
      setresponseQuestions(result.data);
    };
    if (statusLesson === 'result') {
      fetchResponse();
    }
  }, [statusLesson]);
  
  return (
    <div className="result-page-container">
      <div className="result-header">
        <h1 className="result-title"> Results for: {responseQuestions?.name_quiz}</h1>
        <div className="result-score">Score: {responseQuestions?.score ?? 0} / 100</div>
      </div>

      <div className="result-content">
        {
          responseQuestions.map((responseQuestion, index) => (
            <div>
              {responseQuestion.type_question === "reading" && (
                <ReadingResponse responseQuestion={responseQuestion} />
              )}
              {responseQuestion.type_question === "listening" && (
                <ListeningResponse responseQuestion={responseQuestion} />
              )}
              {responseQuestion.type_question === "writing" && (
                <WritingResponse responseQuestion={responseQuestion} />
              )}
              {responseQuestion.type_question === "speaking" && (
                <SpeakingResponse responseQuestion={responseQuestion} />
              )}
            </div>
          ))
        }
        {/* {type_quiz === "reading" && (
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
        )} */}
      </div>

      <Link to={`/coursedetail/${id_course}/lesson/${Number(id_lesson) + 1}`} className="result-back-button">
        Next Lesson
      </Link>
    </div>
  );
};

export default Result;
