import React, { useState } from "react";
import './PopupAddCourse.css';

const PopupAddCourse = ({ newCourse, handleInputChange, handleImageUpload, handleSaveCourse, setShowPopup }) => {
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImagePreview = (event) => {
        handleImageUpload(event);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Tạo khóa học mới</h3>
                <div className="popup-inputs">
                    <div className="popup-left">
                        <label htmlFor="courseId">Mã khóa học:</label>
                        <input id="courseId" type="text" name="courseId" placeholder="Nhập mã khóa học" value={newCourse.courseId} onChange={handleInputChange} />

                        <label htmlFor="courseName">Tên khóa học:</label>
                        <input id="courseName" type="text" name="courseName" placeholder="Nhập tên khóa học" value={newCourse.courseName} onChange={handleInputChange} />

                        <label htmlFor="category">Thể loại:</label>
                        <input id="category" type="text" name="category" placeholder="Nhập thể loại" value={newCourse.category} onChange={handleInputChange} />

                        <label htmlFor="lessonCount">Số lượng bài học:</label>
                        <input id="lessonCount" type="number" name="lessonCount" placeholder="Nhập số lượng bài học" value={newCourse.lessonCount} onChange={handleInputChange} />
                    </div>
                    <div className="popup-right">
                        <label htmlFor="instructor">Tên giảng viên:</label>
                        <input id="instructor" type="text" name="instructor" placeholder="Nhập tên giảng viên" value={newCourse.instructor} onChange={handleInputChange} />

                        <label htmlFor="imageUpload">Ảnh khóa học:</label>
                        <input id="imageUpload" type="file" accept="image/*" onChange={handleImagePreview} />

                        {uploadedImage && <img src={uploadedImage} alt="Uploaded preview" className="uploaded-image" />}
                    </div>
                </div>
                <div className="popup-actions">
                    <button onClick={handleSaveCourse}>Lưu</button>
                    <button onClick={() => setShowPopup(false)}>Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default PopupAddCourse;
