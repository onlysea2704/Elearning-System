import './ItemCardCourse.css';
import { Link, useNavigate } from 'react-router-dom';

const ItemCardCourse = ({ course, deleteCourse, index }) => {
    const navigate = useNavigate()
    return (
        <div key={index} className="item-submission">
            <img src={course.link_image} alt={course.name_course} className="submission-image" />
            <div className="submission-details">
                <p><strong>ID Khóa Học:</strong> {course.id_course}</p>
                <p><strong>Tên Khóa Học:</strong> {course.name_course}</p>
                <p><strong>Loại khóa học:</strong> {course.type_course}</p>
                <p><strong>Số lượng bài học:</strong> {course.number_lesson}</p>
                <p><strong>Giảng Viên:</strong> {course.id_lecturer}</p>

                <div onClick={() => navigate(`/dashboard/manage-course/${course.id_course}`)} className="edit-course-icon" title="Xóa khóa học">
                    <i className="fas fa-pen"></i>
                </div>

                <div onClick={() => deleteCourse(course.id_course)} className="delete-course-icon" title="Xóa khóa học">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    );
};

export default ItemCardCourse;
