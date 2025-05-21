import React, { useState, useEffect, useRef } from "react";
import "./ManageCourse.css";
import SideBar from "../../Components/SideBar/SideBar";
import ListLesson from "../../Components/ListLesson/ListLesson";
import { useParams } from "react-router-dom";
import HeaderBackButton from "../../Components/HeaderBackButton/HeaderBackButton";
import { authAxios, publicAxios } from "../../services/axios-instance";

const ManageCourse = () => {
    const { id_course } = useParams();

    const [courseImage, setCourseImage] = useState(null);
    const [courseImageUrl, setcourseImageUrl] = useState('');
    const [detailCourse, setdetailCourse] = useState({
        name_course: "",
        description: "",
        price: 0,
        link_image: "",
        number_lesson: 0,
        number_student: 0,
        id_lecturer: 2,
    })
    const [allLecturers, setAllLecturers] = useState([]);

    // Reference for the hidden file input
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setcourseImageUrl(URL.createObjectURL(file));
            setCourseImage(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger file input click when image is clicked
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdetailCourse({ ...detailCourse, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('detailCourse', JSON.stringify(detailCourse));
        if (courseImage) {
            formData.append('courseImage', courseImage);
        }
        console.log(detailCourse)
        await authAxios.post('/course/update-course', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    useEffect(() => {
        const fetchDetailCourses = async () => {
            console.log(id_course)
            const detailCourse = await authAxios.post('/course/detail-course', { idCourse: id_course });
            setdetailCourse(detailCourse.data.detailCourse);
            setcourseImageUrl(detailCourse.data.detailCourse.link_image)
            console.log(detailCourse.data.detailCourse)

            const allLecturers = await publicAxios.post('/course/public-api-get-all-lecturers');
            setAllLecturers(allLecturers.data);
        };
        fetchDetailCourses();
    }, [id_course]);

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
                                        src={courseImageUrl}
                                        alt="Ảnh Khóa Học"
                                        className="course-image"
                                        // onClick={handleImageClick}
                                        // có thể bỏ handleImageClick đi vì htmlFor đã thực hiện trigger mở fileInput rồi
                                        // có thể bỏ trigger bằng hàm handleImageClick đi 
                                    />
                                </label>
                                <input
                                    id="upload-image"
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
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
                                    {/* <input name="id_lecturer" type="text" value={detailCourse.id_lecturer} onChange={handleChange} placeholder="Nhập tên giảng viên" /> */}
                                    <select
                                        name="id_lecturer"
                                        value={detailCourse.id_lecturer}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Chọn giảng viên --</option>
                                        {allLecturers.map((lecturer) => (
                                            <option key={lecturer.id_lecturer} value={lecturer.id_lecturer}>
                                                {lecturer.id_lecturer}. {lecturer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group-course">
                                    <label>Loại Bài Học</label>
                                    {/* <input name="type_course" type="text" value={detailCourse.type_course} onChange={handleChange} placeholder="Nhập loại bài học" /> */}
                                    <select
                                        name="type_course"
                                        value={detailCourse.type_course}
                                        onChange={handleChange}
                                    >
                                        <option value="Reading">Reading</option>
                                        <option value="Listening">Listening</option>
                                        <option value="Writing">Writing</option>
                                        <option value="Speaking">Speaking</option>
                                    </select>
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
                        <button className="btn-save" onClick={handleSubmit}>Lưu</button>
                    </div>

                    {/* Right Section */}
                    <ListLesson />
                </div>
            </div>
        </div>

    );
};

export default ManageCourse;
