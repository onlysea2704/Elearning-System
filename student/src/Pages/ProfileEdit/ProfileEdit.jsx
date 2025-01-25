import React, { useRef, useState } from "react";
import "./ProfileEdit.css";
import Footer from "../../Components/Footer/Footer";

const ProfileEdit = () => {
    const [profile, setProfile] = useState({
        name: "Phạm Duy Hải",
        age: "21",
        gender: "male",
        phone: "0918297371",
        email: "phamduyhai2704@gmail.com",
        avatar: null,
        avatarPreview: null,
    });

    // Reference for the hidden file input
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfile({
                    ...profile,
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
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile:", profile);
    };

    return (
        <>
            <div className="container-edit-profile">
                {/* Avatar Section */}
                <div className="avatar-section">
                    <div className="avatar-preview-edit">
                        {/* Clicking the image triggers file input */}
                        <img
                            src={
                                profile.avatarPreview
                                    ? profile.avatarPreview
                                    : "https://via.placeholder.com/140"
                            }
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
                                value={profile.name}
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
                                value={profile.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                            />
                        </div>
                        <div className="form-group-edit">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={profile.gender}
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
                                value={profile.phone}
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
                                value={profile.email}
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
        </>
    );
};

export default ProfileEdit;
