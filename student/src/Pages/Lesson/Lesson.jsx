import React, { useContext } from "react";
import "./Lesson.css";
import Sidebar from "../../Components/SideBar/SideBar";
import VideoLesson from "../../Components/VideoLesson/VideoLesson";
import Quiz from "../../Components/Quiz/Quiz";
import { useParams } from "react-router-dom";
import { StudentContext } from "../../Context/Context";
import Result from "../../Components/Result/Result";

const Lesson = () => {
  const { id_lesson } = useParams();
  const { lessons, results, quizzes } = useContext(StudentContext);

  const lesson = lessons.find(
    (lesson) => lesson.id_lesson === Number(id_lesson)
  );
  const CheckComplete = () => {
    
    const currentQuiz = quizzes.find(
      (quiz) => quiz.id_lesson === Number(id_lesson)
    );
    const isComplete = results.some(
      (result) => result.id_quiz === Number(currentQuiz.id_quiz) && result.id_student === 1
    );
    return isComplete;
  }


  // Xử lý render component dựa trên type_lesson
  return (
    <div className="lesson-container">
      <Sidebar className="sidebar" />
      <div className="lesson">
        {lesson.type_lesson === "quiz" ? (CheckComplete() ? (<Result />) : (<Quiz />)
        ) : (
          <VideoLesson
            title={lesson.name_lesson}
            description={lesson.description}
            videoUrl={lesson.link_material}
            onMarkAsDone={false} // Thay đổi nếu có logic cho "Mark as Done"
          />
        )}
      </div>
    </div>
  );
};

export default Lesson;
