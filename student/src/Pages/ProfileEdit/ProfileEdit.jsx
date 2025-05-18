import { useRef, useState, useEffect, useContext } from "react";
import "./ProfileEdit.css";
import Footer from "../../Components/Footer/Footer";
import { authAxios } from "../../services/axios-instance";
import { useNavigate } from "react-router-dom";
import { StudentContext } from '../../Context/Context';
import Popup from "../../Components/Popup/Popup";

const ProfileEdit = () => {

    const [studentInfo, setstudentInfo] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
    });
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setNameStudent, setAvatarStudent } = useContext(StudentContext)


    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const response = await authAxios('/student/info');
                setstudentInfo(response.data);
                setAvatarUrl(response.data.link_image);
            } catch (err) {
                console.error("Failed to fetch student info:", err);
            }
        };
        fetchStudentInfo();
    }, []);

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
        setstudentInfo({ ...studentInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        // Tạo FormData để gửi cả file và JSON
        const formData = new FormData();
        formData.append('studentInfo', JSON.stringify(studentInfo));
        console.log(studentInfo)
        if (avatar) {
            formData.append('avatar', avatar);
        }

        await authAxios.put('/student/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const userInfo = await authAxios.get('/student/info');
        setNameStudent(userInfo.data.name);
        setAvatarStudent(userInfo.data.link_image);
        setLoading(false)
        navigate("/");
    };

    return (
        <>
            <div className="container-edit-profile">
                {/* Avatar Section */}
                <div className="avatar-section">
                    <div className="avatar-preview-edit">
                        {/* Clicking the image triggers file input */}
                        <img
                            src={avatarUrl ? avatarUrl : "https://via.placeholder.com/140"}
                            alt="Avatar"
                            onClick={handleImageClick}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Form Section */}
                <div className="form-section">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group-edit">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={studentInfo.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form-group-edit">
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={studentInfo.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                            />
                        </div>
                        <div className="form-group-edit">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={studentInfo.gender}
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group-edit">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={studentInfo.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className="form-group-edit">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={studentInfo.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
            {loading && <Popup type='edit-inform' />}
        </>
    );
};

export default ProfileEdit;
