import "./Card.css";
import { Link } from "react-router-dom";

const CourseCard = ({ course, type }) => {
  return (
    <div className="course-card">
      <img
        src={course.link_image || "https://via.placeholder.com/150?text=No+Image"}
        alt={course.name}
        className="course-card-image"
      />
      <div className="course-card-details">
        <h3 className="course-card-title">
          {course.name_course}
        </h3>
        <p className="course-card-price"> {Number(course.price).toLocaleString('vi-VN', { maximumFractionDigits: 0 })} ₫</p>
        <div className="course-card-info">
          <span className="course-card-lessons">
            <i className="fas fa-book"></i> {course.number_lesson} bài học
          </span>
          <span className="course-card-students">
            <i className="fas fa-user"></i> {course.number_student} học viên
          </span>
        </div>
        <button className="explore-button">
          <Link to={`/coursedetail/${course.id_course}`}>{type}</Link>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
