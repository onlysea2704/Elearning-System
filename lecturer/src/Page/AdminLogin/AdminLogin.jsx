import React, { useState } from "react";
import "./AdminLogin.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import SideBar from "../../Components/SideBar/SideBar";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Dùng để chuyển hướng trang

  const handleLogin = () => {
    // Kiểm tra thông tin đăng nhập
    if (username === "lecturer" && password === "lecturer") {
      alert("Login successful! Redirecting to homepage...");
      navigate("/dashboard/account-manage"); // Chuyển sang trang chủ
    } else {
      setErrorMessage("Tên đăng nhập hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Hust-English</h2>
        <div className="login-form">
          <h2>Đăng nhập cho giảng viên</h2>
          <label className="input-label">Tên Đăng Nhập</label>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị username
          />
          <label className="input-label">Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cập nhật giá trị password
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="submit-button" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
