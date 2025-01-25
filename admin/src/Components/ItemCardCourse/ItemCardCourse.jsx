import React from 'react';
import './ItemCardCourse.css';
import { Link } from 'react-router-dom';

const ItemCardCourse = ({ course, index }) => {
    return (
        <Link to={`/dashboard/manage-course`} key={index} className="item-submission">
            <img src={course.imageUrl} alt={course.courseName} className="submission-image" />
            <div className="submission-details">
                <p><strong>ID Khóa Học:</strong> {course.courseId}</p>
                <p><strong>Tên Khóa Học:</strong> {course.courseName}</p>
                <p><strong>Loại khóa học:</strong> {course.category}</p>
                <p><strong>Số lượng bài học:</strong> {course.lessonCount}</p>
                <p><strong>Giảng Viên:</strong> {course.instructor}</p>

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
