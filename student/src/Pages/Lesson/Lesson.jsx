import { useEffect, useState } from "react";
import "./Lesson.css";
import Sidebar from "../../Components/SideBar/SideBar";
import VideoLesson from "../../Components/VideoLesson/VideoLesson";
import Quiz from "../../Components/Quiz/Quiz";
import { useParams } from "react-router-dom";
import Result from "../../Components/Result/Result";
import { authAxios, publicAxios } from "../../services/axios-instance";

const Lesson = () => {
  const { id_lesson } = useParams();
  const [typeLesson, setTypeLesson] = useState("");
  const [lecture, setLecture] = useState("");
  const [isComplete, setIsComplete] = useState("");

  useEffect(() => {
    const fetchInfoLesson = async () => {
      const infoLesson = await authAxios.post('/lesson/get-info-lesson', { idLesson: id_lesson });
      setTypeLesson(infoLesson.data.type_lesson);

      const isComplete = await authAxios.post('/lesson/check-complete-lesson', { idLesson: id_lesson });
      setIsComplete(isComplete.data.status);
      console.log(isComplete.data.status);
      
      // if(infoLesson.data.type_lesson === "quiz") {
      //   const quiz = await publicAxios.post('/lesson/get-quiz-by-id-lesson', { idLesson: id_lesson });
      //   console.log(quiz.data);
      // }else {
      //   const lecture = await publicAxios.post('/lesson/get-lecture-by-id-lesson', { idLesson: id_lesson });
      //   console.log(lecture.data);
      //   setLecture(lecture.data);
      // }
    };
    fetchInfoLesson(); // Gọi API khi component được mount
  }, [id_lesson]); // gọi khi id_lesson bị thay đổi giá trị

  // Xử lý render component dựa trên type_lesson
  return (
    <div className="lesson-container">
      <Sidebar className="sidebar" />
      <div className="lesson">
        {typeLesson === "quiz" ? (isComplete ? (<Result />) : (<Quiz />)
        ) : (
          <VideoLesson
            lecture={lecture}
          />
        )}
      </div>
    </div>
  );
};

export default Lesson;
