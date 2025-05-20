import React from 'react';
import './ItemCardCourse.css';
import { Link } from 'react-router-dom';

const ItemCardCourse = ({ course, index }) => {
    return (
        <Link to={`/dashboard/manage-course/${course.id_course}`} key={index} className="item-submission">
            <img src={course.link_image} alt={course.name_course} className="submission-image" />
            <div className="submission-details">
                <p><strong>ID Khóa Học:</strong> {course.id_course}</p>
                <p><strong>Tên Khóa Học:</strong> {course.name_course}</p>
                <p><strong>Loại khóa học:</strong> {course.type_course}</p>
                <p><strong>Số lượng bài học:</strong> {course.number_lesson}</p>
                <p><strong>Giảng Viên:</strong> {course.id_lecturer}</p>

                <div className="edit-course-icon" title="Xóa khóa học">
                    <i className="fas fa-pen"></i>
                </div>

                <div className="delete-course-icon" title="Xóa khóa học">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </Link>
    );
};

export default ItemCardCourse;
