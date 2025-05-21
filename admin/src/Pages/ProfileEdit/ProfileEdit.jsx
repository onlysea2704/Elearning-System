import { useRef, useState, useEffect } from "react";
import "./ProfileEdit.css";
import SideBar from "../../Components/SideBar/SideBar";
import { useParams } from "react-router-dom";
import HeaderBackButton from "../../Components/HeaderBackButton/HeaderBackButton";
import { authAxios } from "../../services/axios-instance";

const ProfileEdit = () => {

    const { id_lecturer } = useParams();
    const [lecturer, setLecturer] = useState({
        name: "",
        age: "",
        phone: "",
        email: "",
        avatar: null,
        experience: ""
    });
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchDetailCourses = async () => {
            const lecturer = await authAxios.post('/lesson/get-info-lecturer', { idLecturer: id_lecturer });
            setLecturer(lecturer.data);
            setAvatarUrl(lecturer.data.link_image);
            console.log(lecturer.data);
        };
        fetchDetailCourses();
    }, [id_lecturer]);

    // Reference for the hidden file input
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarUrl(URL.createObjectURL(file));
            setAvatar(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger file input click when image is clicked
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setLecturer({ ...lecturer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Tạo FormData để gửi cả file và JSON
        const formData = new FormData();
        formData.append('lecturer', JSON.stringify(lecturer));
        if (avatar) {
            formData.append('avatar', avatar);
        }
        console.log(lecturer)
        await authAxios.post('/lecturer/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
                                <img src={avatarUrl ? avatarUrl : "https://via.placeholder.com/140"}
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
                                    <input type="tel" id="phone" name="phone_number" value={lecturer.phone_number} onChange={handleChange} placeholder="Enter your phone number" />
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
