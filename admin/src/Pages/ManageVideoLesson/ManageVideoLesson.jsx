import React, { useState, useEffect } from 'react';
import './ManageVideoLesson.css';
import SideBar from '../../Components/SideBar/SideBar';
import { useParams } from 'react-router-dom';
import HeaderBackButton from '../../Components/HeaderBackButton/HeaderBackButton';
import { authAxios } from '../../services/axios-instance';
import Popup from '../../Components/Popup/Popup';

const ManageVideoLesson = () => {

    const { id_lesson } = useParams();
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [lecture, setLecture] = useState("");
    const [course, setCourse] = useState("");
    const [loading, setLoading] = useState(false)
    // đặc biệt lưu ý phần giá trị khởi tạo của useState
    // Nếu đặt là null => lúc đầu khi load trang (chưa load api) sẽ không đọc được các thuộc tính của nó
    // Ví dụ nếu đặt course là null => ko thể viết là course.id 
    // có thể sửa bằng cách tạo 1 type ban đầu cho nó hoặc là dùng ? course?.id

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLecture({ ...lecture, [name]: value });
    };

    useEffect(() => {
        const fetchDetailCourses = async () => {
            const lecture = await authAxios.post('/lecture/get-lecture-by-id-lesson', { idLesson: id_lesson });
            setLecture(lecture.data);
            if (!lecture.data) {
                return
            }
            setVideoUrl(lecture.data.link_material);
            console.log(lecture.data.link_material);

            const course = await authAxios.post('/lesson/get-detail-course-by-id-lesson', { idLesson: id_lesson });
            setCourse(course.data);
            console.log(course.data);
        };
        fetchDetailCourses();
    }, [id_lesson]);

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoUrl(URL.createObjectURL(file));
            setVideo(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        console.log(lecture)
        formData.append('lecture', JSON.stringify(lecture));
        if (video) {
            formData.append('video', video);
        }
        console.log()
        await authAxios.post('/lecture/update-lecture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false)
        alert('Cập nhật thành công')
    };

    return (
        <>
            <div className='page-manage-video-lesson'>
                <SideBar />
                <div className="manage-video-lesson">
                    <HeaderBackButton
                        button='Quay lại khóa học'
                        title='Quản lý bài học'
                    />
                    <div className="content-video-lesson">
                        <div className="left-panel-video-lesson">
                            <form>
                                <div className="form-group">
                                    <label>ID Bài Học</label>
                                    <input type="text" value={id_lesson} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Tên Bài Học</label>
                                    <input type="text"
                                        onChange={handleChange}
                                        name="name_lecture"
                                        value={lecture?.name_lecture}
                                        placeholder="Nhập tên bài học" />
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
                                <textarea
                                    value={lecture?.description}
                                    className='description-course'
                                    name='description'
                                    onChange={handleChange}
                                    placeholder="Nhập mô tả chi tiết bài học">
                                </textarea>
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
                                {videoUrl ? (
                                    <video controls src={videoUrl}></video>
                                ) : (
                                    <div className="placeholder">
                                        <p>Chưa có video tải lên</p>
                                    </div>
                                )}
                            </div>
                            <button className="save-button" onClick={handleSubmit}>
                                Cập Nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Popup type='send-answer' />}
        </>


    );
};

export default ManageVideoLesson;
