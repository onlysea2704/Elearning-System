import React, { useState, useEffect } from 'react';
import './ManageVideoLesson.css';
import SideBar from '../../Components/SideBar/SideBar';
import { useParams } from 'react-router-dom';
import HeaderBackButton from '../../Components/HeaderBackButton/HeaderBackButton';
import { authAxios } from '../../services/axios-instance';

const ManageVideoLesson = () => {
    const [video, setVideo] = useState(null);
    const { id_lesson } = useParams();
    const [lecture, setLecture] = useState("");
    const [course, setCourse] = useState(""); 
    // đặc biệt lưu ý phần giá trị khởi tạo của useState
    // Nếu đặt là null => lúc đầu khi load trang (chưa load api) sẽ không đọc được các thuộc tính của nó
    // Ví dụ nếu đặt course là null => ko thể viết là course.id 
    // có thể sửa bằng cách tạo 1 type ban đầu cho nó hoặc là dùng ? course?.id

    useEffect(() => {
        const fetchDetailCourses = async () => {
            const lecture = await authAxios.post('/lesson/get-lecture-by-id-lesson', { idLesson: id_lesson });
            setLecture(lecture.data);
            console.log(lecture.data);

            const course = await authAxios.post('/lesson/get-detail-course-by-id-lesson', { idLesson: id_lesson });
            setCourse(course.data);
            console.log(course.data);
        };
        fetchDetailCourses();
    }, [id_lesson]);

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideo(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        alert('Lưu thông tin bài học thành công!');
    };

    return (
        <div className='page-manage-video-lesson'>

            <SideBar />

            <div className="manage-video-lesson">

                <HeaderBackButton
                    button='Quay lại khóa học'
                    title='Quản lý bài học'
                    dest={`/dashboard/manage-course/${course.detailCourse?.id_course}`}
                />

                <div className="content-video-lesson">
                    <div className="left-panel-video-lesson">
                        <form>
                            <div className="form-group">
                                <label>ID Bài Học</label>
                                <input type="text" value={1} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Tên Bài Học</label>
                                <input type="text" value={lecture.name_lecture} placeholder="Nhập tên bài học" />
                            </div>
                            <div className="form-group">
                                <label>Loại Bài Học</label>
                                <input type="text" value='video' readOnly />
                            </div>
                            <div className="form-group">
                                <label>Số Thứ Tự</label>
                                <input type="text" value={course.orderLesson} readOnly />
                            </div>
                            <div className="form-group">
                                <label>ID Khóa Học</label>
                                <input type="text" value={course.detailCourse?.id_course} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Tên Khóa Học</label>
                                <input type="text" value={course.detailCourse?.name_course} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Mô Tả Chi Tiết</label>
                            </div>
                            <textarea value={lecture.description} className='description-course' placeholder="Nhập mô tả chi tiết bài học"></textarea>

                        </form>
                    </div>

                    <div className="divider"></div>

                    <div className="right-panel-video-lesson">
                        <div className="video-upload">
                            <label htmlFor="videoInput" className="upload-button">
                                Tải video lên
                            </label>
                            <input
                                type="file"
                                id="videoInput"
                                accept="video/*"
                                onChange={handleVideoUpload}
                            />
                        </div>
                        <div className="video-preview">
                            {lecture.link_material ? (
                                <video controls src={lecture.link_material}></video>
                            ) : (
                                <div className="placeholder">
                                    <p>Chưa có video tải lên</p>
                                </div>
                            )}
                        </div>
                        <button className="save-button" onClick={handleSave}>
                            Cập Nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ManageVideoLesson;
