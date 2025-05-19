import { useEffect, useState } from "react";
import "./CourseDetail.css";
import Comments from "../../Components/Comments/Comments";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { authAxios, publicAxios } from "../../services/axios-instance";

const CourseDetail = () => {

  const { id_course } = useParams();
  const [detailCourse, setdetailCourse] = useState({
    name_course: "",
    description: "",
    price: 0,
    link_image: "",
    number_lesson: 0,
    number_student: 0,
    id_lecturer: 2,
  })
  const [listLesson, setListLesson] = useState([]);
  const [isMyCourse, setIsMyCourse] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [infoLecturer, setInfoLecturer] = useState('');
  const createBill = async () => {
    const result = await authAxios.post('/payment/create-bill', { idCourse: id_course })
    window.open(`${result.data.order_url}`, "_blank");
    console.log(result.data)
  }

  useEffect(() => {
    const fetchDetailCourses = async () => {

      const token = sessionStorage.getItem('authToken');
      let detailCourse
      if (token) {
        setIsLogin(true);
        detailCourse = await authAxios.post('/course/detail-course', { idCourse: id_course });
        setdetailCourse(detailCourse.data.detailCourse);
        console.log(detailCourse.data.detailCourse);
        setIsMyCourse(detailCourse.data.isMyCourse);
      } else {
        detailCourse = await publicAxios.post('/course/public-api-get-detail-course', { idCourse: id_course });
        setdetailCourse(detailCourse.data.detailCourse);
        console.log(detailCourse.data.detailCourse);
        setIsMyCourse(false);
      }

      const response2 = await publicAxios.post('/lesson/get-list-lessons-by-id-course', { idCourse: id_course });
      setListLesson(response2.data);
      const response3 = await publicAxios.post('/lesson/get-info-lecturer', { idLecturer: detailCourse.data.detailCourse.id_lecturer });
      setInfoLecturer(response3.data);
    };
    fetchDetailCourses(); // Gọi API khi component được mount
  }, [id_course]); // gọi khi isPurchase bị thay đổi giá trị

  return (
    <div>
      <div className="course-detail-container">
        <div className="course-content">
          {/* Phần bên trái */}
          <div className="course-info">
            <div className="course-header">
              <img
                src={detailCourse.link_image}
                alt="Course Thumbnail"
                className="course-thumbnail"
              />
              <div className="course-metadata">
                <h2 className="course-title">{detailCourse.name_course}</h2>
                <div className="course-details">
                  <p className="course-detail-item">
                    <i className="fas fa-solid fa-chalkboard-teacher course-icon"></i>
                    <span className="tooltip-container">
                      Giảng viên: {infoLecturer.name}
                      <span className="tooltip-text">
                        <img src={infoLecturer.link_image} alt="Lecturer" className="tooltip-avatar" />
                        <div className="tooltip-info">
                          <div className="tooltip-name">{infoLecturer.name}</div>
                          <div className="tooltip-email">{infoLecturer.email}</div>
                          <div className="tooltip-specialty">{infoLecturer.experience}</div>
                        </div>
                      </span>
                    </span>
                  </p>
                  <p className="course-detail-item">
                    <i className="fa-solid fa-book course-icon"></i>
                    &nbsp; Số lượng bài học: {detailCourse.number_lesson}
                  </p>
                  <p className="course-detail-item">
                    <i className="fa-solid fa-users course-icon"></i>
                    Số lượng sinh viên: {detailCourse.number_student}
                  </p>
                </div>
              </div>
            </div>

            <p className="course-description">
              <h2>Mô tả khóa học</h2>
              {detailCourse.description}
            </p>
            {isMyCourse ? (<Link to={`/progress/${id_course}`} className="buy-button">Xem tiến độ học tập</Link>)
              : (<div
                className="buy-button"
                onClick={() => {
                  if (isLogin) {
                    createBill();
                  } else {
                    alert("Vui lòng đăng nhập để mua khóa học!");
                  }
                }}
              >
                Mua khóa học
              </div>
              )}
          </div>

          {/* Phần bên phải */}
          <div className="lesson-list">
            <h3 className="lesson-header">Danh sách bài học</h3>
            <ul className="lessons">
              {listLesson.map((lesson) => (
                <li key={lesson.id_lesson} className="lesson-item">
                  <Link to={`/coursedetail/${detailCourse.id_course}/lesson/${lesson.id_lesson}`} className="lesson-link">
                    {lesson.order_lesson}. {lesson.lesson_name}
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