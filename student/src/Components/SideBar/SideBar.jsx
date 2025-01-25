import React, { useContext } from "react";
import "./SideBar.css";
import { Link, useParams } from "react-router-dom";
import { StudentContext } from "../../Context/Context";

const Sidebar = () => {
  const { id_course, id_lesson } = useParams();
  const { lessons } = useContext(StudentContext);
  const lesson_course = lessons.filter(lesson => lesson.id_course === Number(id_course));

  return (
    <div className="sidebar">
      <h2>Danh Sách Bài Học</h2>
      {lesson_course.map((lesson, index) => (
        <div
          key={index}
          className={`course-item ${lesson.id_lesson === Number(id_lesson) ? "active-lesson" : ""}`}
        >
          <Link to={`/coursedetail/${id_course}/lesson/${lesson.id_lesson}`} className="link-wrapper">
            <span className="icon">
              {lesson.type_lesson === "video lesson" ? (
                <i className="fas fa-video"></i> // Icon video
              ) : (
                <i className="fas fa-pen"></i> // Icon test
              )}
            </span>
            {lesson.name_lesson}
            <span className="arrow">
              <i className="fas fa-angle-right"></i>
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
