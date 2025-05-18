import { useEffect, useState } from "react";
import "./SideBar.css";
import { Link, useParams } from "react-router-dom";
import { publicAxios } from "../../services/axios-instance";

const Sidebar = () => {
  const { id_course, id_lesson } = useParams();
  const [listLesson, setListLesson] = useState([])
  useEffect(() => {
    const fetchDetailCourses = async () => {

      const response = await publicAxios.post('/lesson/get-list-lessons-by-id-course', { idCourse: id_course });
      setListLesson(response.data)
      console.log(response.data)
    };
    fetchDetailCourses(); // Gọi API khi component được mount
  }, [id_course]); // gọi khi isPurchase bị thay đổi giá trị

  return (
    <div className="sidebar">
      <h2>Danh Sách Bài Học</h2>
      {listLesson.map((lesson, index) => (
        <div
          key={index}
          className={`course-item ${lesson.id_lesson === Number(id_lesson) ? "active-lesson" : ""}`}
        >
          <Link to={`/coursedetail/${id_course}/lesson/${lesson.id_lesson}`} className="link-wrapper">
            <span className="icon">
              {lesson.type_lesson === "video" ? (
                <i className="fas fa-video"></i> // Icon video
              ) : (
                <i className="fas fa-pen"></i> // Icon test
              )}
            </span>
            {lesson.lesson_name}
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
