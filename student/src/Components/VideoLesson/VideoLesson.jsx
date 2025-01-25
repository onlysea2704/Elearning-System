import React from "react";
import "./VideoLesson.css";

const LessonDetail = ({ title, description, videoUrl, onMarkAsDone }) => {
  return (
    <div className="lesson-detail">
      <h1 className="lesson-title">{title}</h1>
      <p className="lesson-description">{description}</p>
      <div className="video-container">
        <iframe
          src={videoUrl}
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
