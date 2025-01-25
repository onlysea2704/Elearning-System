import React, { useState } from "react";
import "./ManageCourse.css";
import SideBar from "../../Components/SideBar/SideBar";
import ListLesson from "../../Components/ListLesson/ListLesson";
import { Link, useNavigate } from "react-router-dom";
import HeaderBackButton from "../../Components/HeaderBackButton/HeaderBackButton";

const ManageCourse = () => {
    const [courseImage, setCourseImage] = useState("https://via.placeholder.com/300x200");
    const navigate = useNavigate();
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseImage(reader.result); // Hiển thị ảnh mới
            };
            reader.readAsDataURL(file); // Đọc tệp ảnh dưới dạng URL
        }
    };

    const handleEditLesson = (lessonId) => {
        console.log(`Chỉnh sửa bài học ${lessonId}`);
    };

    const handleDeleteLesson = (lessonId) => {
        console.log(`Xóa bài học ${lessonId}`);
    };

    const handleCreateLesson = () => {
        window.alert("Bạn có muốn tạo Lesson?");
        navigate('/dashboard/manage-video-lesson'); // Thay bằng đường dẫn cần chuyển hướng
    };

    const handleCreateQuiz = () => {
        window.alert("Bạn có muốn tạo Quiz?");
        navigate('/dashboard/manage-quiz/0'); // Thay bằng đường dẫn cần chuyển hướng
    };

    return (
        <div className="page-course-manage">
            <SideBar />
            <div className="manage-course-container">

                {/* Header */}
                <HeaderBackButton
                    button='Quay lại danh sách'
                    title='Quản Lý Khóa Học'
                    dest='/dashboard/list-course'
                />

                <div className="manage-course-content">
                    {/* Left Section */}
                    <div className="course-details">
                        <div className="course-header">
                            <div className="course-image-container">
                                <label htmlFor="upload-image">
                                    <img
                                        src={courseImage}
                                        alt="Ảnh Khóa Học"
                                        className="course-image"
                                    />
                                </label>
                                <input
                                    id="upload-image"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </div>


                            <div className="course-info">
                                <div className="form-group-course">
                                    <label>ID</label>
                                    <input type="text" value="12345" disabled />
                                </div>
                                <div className="form-group-course">
                                    <label>Tên Khóa Học</label>
                                    <input type="text" placeholder="Nhập tên khóa học" />
                                </div>
                                <div className="form-group-course">
                                    <label>Giá</label>
                                    <input type="number" placeholder="Nhập giá khóa học" />
                                </div>
                                <div className="form-group-course">
                                    <label>Tên Giảng Viên</label>
                                    <input type="text" placeholder="Nhập tên giảng viên" />
                                </div>
                                <div className="form-group-course">
                                    <label>Loại Bài Học</label>
                                    <input type="text" placeholder="Nhập loại bài học" />
                                </div>
                                <div className="info-group-course">
                                    <span>
                                        <i className="fas fa-user-graduate icon"></i> Sinh Viên: 100
                                    </span>
                                    <span>
                                        <i className="fas fa-book icon"></i> Bài Học: 10
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group-course">
                            <label>Mô Tả Chi Tiết:</label>
                        </div>
                        <textarea className="course-textarea" rows="5" placeholder="Nhập mô tả chi tiết"></textarea>
                        <button className="btn-save">Lưu</button>
                    </div>

                    {/* Right Section */}
                    <ListLesson
                        handleEditLesson={handleEditLesson}
                        handleDeleteLesson={handleDeleteLesson}
                        handleCreateLesson={handleCreateLesson}
                        handleCreateQuiz={handleCreateQuiz}
                    />
                </div>
            </div>
        </div>

    );
};

export default ManageCourse;
