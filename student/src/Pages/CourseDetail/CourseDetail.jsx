import React, { useContext } from "react";
import "./CourseDetail.css";
import Comments from "../../Components/Comments/Comments";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { StudentContext } from "../../Context/Context";

const CourseDetail = () => {
  const { courses, lessons, myCourses } = useContext(StudentContext);
  const { id_course } = useParams();
  const course = courses.find(course => course.id_course === Number(id_course));
  const lesson_course = lessons.filter(lesson => lesson.id_course === Number(id_course));
  const isMyCourse = myCourses.some(
    (course) =>
      course.id_course === Number(id_course) && course.id_student === Number(1)
  );


  return (
    <div>
      <div className="course-detail-container">
        <div className="course-content">
          {/* Phần bên trái */}
          <div className="course-info">
            <div className="course-header">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Course Thumbnail"
                className="course-thumbnail"
              />
              <div className="course-metadata">
                <h2 className="course-title">{course.name_course}</h2>
                <div className="course-details">
                  <p className="course-detail-item">
                    <i className="fa-solid fa-chalkboard-teacher course-icon"></i>
                    Giảng viên: {course.id_lecturer}
                  </p>
                  <p className="course-detail-item">
                    <i className="fa-solid fa-book course-icon"></i>
                    Số lượng bài học: {course.number_session}
                  </p>
                  <p className="course-detail-item">
                    <i className="fa-solid fa-users course-icon"></i>
                    Số lượng sinh viên: {course.number_student}
                  </p>
                </div>
              </div>
            </div>

            <p className="course-description">
              <h2>Mô tả khóa học</h2>
              {course.description}
            </p>
            {isMyCourse ? (<Link to={`/progress/${id_course}`} className="buy-button">Xem tiến độ học tập</Link>)
              : (<Link to={`/checkout/${id_course}`} className="buy-button">Mua khóa học</Link>)}
          </div>

          {/* Phần bên phải */}
          <div className="lesson-list">
            <h3 className="lesson-header">Danh sách bài học</h3>
            <ul className="lessons">
              {lesson_course.map((lesson) => (
                <li key={lesson.id_lesson} className="lesson-item">
                  <Link to={`/coursedetail/${course.id_course}/lesson/${lesson.id_lesson}`} className="lesson-link">
                    {lesson.name_lesson}
                    <i className="fa fa-angle-right lesson-icon"></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Comments />
      </div>
      <Footer />
    </div>

  );
};

export default CourseDetail;