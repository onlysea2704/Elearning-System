import "./VideoLesson.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { authAxios } from "../../services/axios-instance";
import { StudentContext } from "../../Context/Context";

const LessonDetail = () => {

  const { id_lesson } = useParams();
  const [lecture, setLecture] = useState("");
  const [isDone, setIsDone] = useState(false);
  const { statusLesson } = useContext(StudentContext);

  const onMarkAsDone = async () => {
    try {
      const res = await authAxios.post('/lesson/mark-as-done', { idLesson: id_lesson });
      if (res.data.success) {
        setIsDone(true);
      }
    } catch (error) {
      console.error("Error marking as done:", error);
    }
  };

  useEffect(() => {
    const fetchLecture = async () => {
      const isComplete = await authAxios.post('/lesson/check-complete-lesson', { idLesson: id_lesson });
      console.log(isComplete.data.status);
      setIsDone(isComplete.data.status);
      const lecture = await authAxios.post('/lesson/get-lecture-by-id-lesson', { idLesson: id_lesson });
      if (!lecture.data) {
        return;
      }
      setLecture(lecture.data);
    };
    if (statusLesson === 'video') {
      fetchLecture();
    }
  }, [statusLesson]);

  return (
    <div className="lesson-detail">
      <h1 className="lesson-title">{lecture.name_lecture}</h1>
      <p className="lesson-description">{lecture.description}</p>
      <div className="video-container">
        <iframe
          src={lecture.link_material}
          title="Lesson Video"
          allowFullScreen
        ></iframe>
      </div>
      <button
        className={`mark-done-button ${isDone ? "done" : ""}`}
        onClick={onMarkAsDone}
        disabled={false}
      >
        {isDone ? "Completed" : "Mark as Done"}
      </button>
    </div>
  );
};

export default LessonDetail;
