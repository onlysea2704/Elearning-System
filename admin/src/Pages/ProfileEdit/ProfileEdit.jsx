import React, { useRef, useState, useEffect } from "react";
import "./ProfileEdit.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useParams } from "react-router-dom";
import HeaderBackButton from "../../Components/HeaderBackButton/HeaderBackButton";
import { authAxios } from "../../services/axios-instance";

const ProfileEdit = () => {
    const [lecturer, setLecturer] = useState({
        name: "Phạm Duy Hải",
        age: "21",
        phone: "0918297371",
        email: "phamduyhai2704@gmail.com",
        avatar: null,
        avatarPreview: null,
        password: "123456789"
    });
    const { id_lecturer } = useParams();

    useEffect(() => {
        const fetchDetailCourses = async () => {
            const lecturer = await authAxios.post('/lesson/get-info-lecturer', { idLecturer: id_lecturer });
            setLecturer(lecturer.data);
            console.log(lecturer.data);
        };
        fetchDetailCourses();
    }, [id_lecturer]);

    // Reference for the hidden file input
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLecturer({
                    ...lecturer,
                    avatar: file,
                    avatarPreview: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger file input click when image is clicked
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLecturer({ ...lecturer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile:", lecturer);
    };
    return (
        <>
            <div className="page-edit-profile">
                <SideBar />
                <div className="page-edit-profile-left">
                    <HeaderBackButton
                        button='Danh Sách Giảng Viên'
                        title='Quản lý thông tin giảng viên'
                        dest='/dashboard/list-teacher'
                    />

                    <div className="container-edit-profile">
                        {/* Avatar Section */}
                        <div className="avatar-section">
                            <div className="avatar-preview-edit">
                                {/* Clicking the image triggers file input */}
                                <img src={lecturer.avatarPreview ? lecturer.avatarPreview : "https://via.placeholder.com/140"}
                                    alt="Avatar" onClick={handleImageClick} />
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="form-section">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group-edit">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" value={lecturer.name} onChange={handleChange} placeholder="Enter your name" />
                                </div>
                                <div className="form-group-edit">
                                    <label htmlFor="age">Age:</label>
                                    <input type="number" id="age" name="age" value={lecturer.age} onChange={handleChange} placeholder="Enter your age" />
                                </div>
                                <div className="form-group-edit">
                                    <label htmlFor="phone">Phone:</label>
                                    <input type="tel" id="phone" name="phone" value={lecturer.phone} onChange={handleChange} placeholder="Enter your phone number" />
                                </div>
                                <div className="form-group-edit">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" value={lecturer.email} onChange={handleChange} placeholder="Enter your email" />
                                </div>
                                <div className="form-group-edit">
                                    <label htmlFor="experience">Experience:</label>
                                    <input type="text" id="experience" name="experience" value={lecturer.experience} onChange={handleChange} placeholder="Enter your password" />
                                </div>
                                <button type="submit" className="submit-btn">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileEdit;
