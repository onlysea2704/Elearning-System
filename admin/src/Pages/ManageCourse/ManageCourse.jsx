import React, { useState, useEffect } from "react";
import "./ManageCourse.css";
import SideBar from "../../Components/SideBar/SideBar";
import ListLesson from "../../Components/ListLesson/ListLesson";
import { useNavigate, useParams } from "react-router-dom";
import HeaderBackButton from "../../Components/HeaderBackButton/HeaderBackButton";
import { authAxios, publicAxios } from "../../services/axios-instance";

const ManageCourse = () => {
    const { id_course } = useParams();

    const [courseImage, setCourseImage] = useState("");
    const navigate = useNavigate();
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
    const [infoLecturer, setInfoLecturer] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdetailCourse({ ...detailCourse, [name]: value });
    };

    useEffect(() => {
        console.log('123456789')
        const fetchDetailCourses = async () => {

            const detailCourse = await authAxios.post('/course/detail-course', { idCourse: id_course });
            setdetailCourse(detailCourse.data.detailCourse);
            console.log(detailCourse.data.detailCourse);

            const response2 = await publicAxios.post('/lesson/get-list-lessons-by-id-course', { idCourse: id_course });
            setListLesson(response2.data);
            const response3 = await publicAxios.post('/lesson/get-info-lecturer', { idLecturer: detailCourse.data.detailCourse.id_lecturer });
            setInfoLecturer(response3.data);
        };
        fetchDetailCourses(); // Gọi API khi component được mount
    }, [id_course]); // gọi khi isPurchase bị thay đổi giá trị

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
                                        src={detailCourse.link_image}
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
                                    <input name="idCourse" type="text" value={detailCourse.id_course} disabled />
                                </div>
                                <div className="form-group-course">
                                    <label>Tên Khóa Học</label>
                                    <input name="name_course" type="text" value={detailCourse.name_course} onChange={handleChange} placeholder="Nhập tên khóa học" />
                                </div>
                                <div className="form-group-course">
                                    <label>Giá</label>
                                    <input name="price" type="number" value={detailCourse.price} onChange={handleChange} placeholder="Nhập giá khóa học" />
                                </div>
                                <div className="form-group-course">
                                    <label>Tên Giảng Viên</label>
                                    <input name="id_lecturer" type="text" value={detailCourse.id_lecturer} onChange={handleChange} placeholder="Nhập tên giảng viên" />
                                </div>
                                <div className="form-group-course">
                                    <label>Loại Bài Học</label>
                                    <input name="type_course" type="text" value={detailCourse.type_course} onChange={handleChange} placeholder="Nhập loại bài học" />
                                </div>
                                <div className="info-group-course">
                                    <span>
                                        <i className="fas fa-user-graduate icon"></i> Sinh Viên: {detailCourse.number_student}
                                    </span>
                                    <span>
                                        <i className="fas fa-book icon"></i> Bài Học: {detailCourse.number_lesson}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group-course">
                            <label>Mô Tả Chi Tiết:</label>
                        </div>
                        <textarea name="description"
                            value={detailCourse.description}
                            onChange={handleChange} className="course-textarea" rows="5" placeholder="Nhập mô tả chi tiết"></textarea>
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
