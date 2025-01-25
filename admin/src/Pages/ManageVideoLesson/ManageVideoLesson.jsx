import React, { useState } from 'react';
import './ManageVideoLesson.css';
import SideBar from '../../Components/SideBar/SideBar';
import { Link } from 'react-router-dom';
import HeaderBackButton from '../../Components/HeaderBackButton/HeaderBackButton';

const ManageVideoLesson = () => {
    const [video, setVideo] = useState(null);

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
                dest='/dashboard/manage-course'
                />

                <div className="content-video-lesson">
                    <div className="left-panel-video-lesson">
                        <form>
                            <div className="form-group">
                                <label>ID Bài Học</label>
                                <input type="text" value="123" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Tên Bài Học</label>
                                <input type="text" placeholder="Nhập tên bài học" />
                            </div>
                            <div className="form-group">
                                <label>Loại Bài Học</label>
                                <input type="text" placeholder="Nhập loại bài học" />
                            </div>
                            <div className="form-group">
                                <label>Số Thứ Tự</label>
                                <input type="text" value="1" readOnly />
                            </div>
                            <div className="form-group">
                                <label>ID Khóa Học</label>
                                <input type="text" value="456" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Tên Khóa Học</label>
                                <input type="text" value="Khóa học A" readOnly />
                            </div>
                            <div className="form-group">
                                <label>Mô Tả Chi Tiết</label>
                            </div>
                            <textarea className='description-course' placeholder="Nhập mô tả chi tiết bài học"></textarea>

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
                            {video ? (
                                <video controls src={video}></video>
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
