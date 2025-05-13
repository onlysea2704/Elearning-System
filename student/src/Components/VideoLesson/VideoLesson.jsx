import React from "react";
import "./VideoLesson.css";

const LessonDetail = ({ lecture }) => {
  const { name_lecture, description, link_material } = lecture;
  const onMarkAsDone = async () => {
    return;
  }

  return (
    <div className="lesson-detail">
      <h1 className="lesson-title">{name_lecture}</h1>
      <p className="lesson-description">{description}</p>
      <div className="video-container">
        <iframe
          src={link_material}
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
