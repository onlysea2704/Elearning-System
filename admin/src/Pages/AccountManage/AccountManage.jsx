import React, { useState } from "react";
import "./AccountManage.css";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";

const AccountManage = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }
        setMessage("Password changed successfully!");
        // Add your password update logic here
    };

    return (
        <>
            <div className="change-password-dashboard">
                <SideBar />
                <div className="logout-container">
                    <Link to='/' className="logout-link">Đăng xuất</Link>
                    <form className="change-password-form" onSubmit={handleSubmit}>
                        <h2>Thay đổi mật khẩu</h2>
                        
                        <div className="form-group-change-pass">
                            <label>Mật khẩu hiện tại</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Current password"
                                required
                            />
                        </div>
                        <div className="form-group-change-pass">
                            <label>Mật khẩu mới</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New password"
                                required
                            />
                        </div>
                        <div className="form-group-change-pass">
                            <label>Xác nhận mật khẩu mới</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm"
                                required
                            />
                        </div>
                        {message && <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
                        <button type="submit" className="submit-btn">Cập nhật mật khẩu</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AccountManage;
