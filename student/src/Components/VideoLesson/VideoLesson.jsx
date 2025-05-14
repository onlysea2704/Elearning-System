import "./VideoLesson.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authAxios, publicAxios } from "../../services/axios-instance";

const LessonDetail = () => {
  const onMarkAsDone = async () => {
    return;
  }
  const { id_lesson } = useParams();
  const [lecture, setLecture] = useState("");

  useEffect(() => {
    const fetchLecture = async () => {
      // const isComplete = await authAxios.post('/lesson/check-complete-lesson', { idLesson: id_lesson });
      // setIsComplete(isComplete.data.status);
      // console.log(isComplete.data.status);

      const lecture = await publicAxios.post('/lesson/get-lecture-by-id-lesson', { idLesson: id_lesson });
      if(!lecture.data) {
        return;
      }
      setLecture(lecture.data);
    };
    fetchLecture(); // Gọi API khi component được mount
  }, [id_lesson]); // gọi khi id_lesson bị thay đổi giá trị

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
      <button className="mark-done-button" onClick={onMarkAsDone}>
        Mark as Done
      </button>
    </div>
  );
};

export default LessonDetail;
