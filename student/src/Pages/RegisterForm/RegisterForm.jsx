import React, { useState } from 'react';
import './RegisterForm.css';
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer"

const RegisterForm = () => {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-form">
          <h2>Đăng ký</h2>
          <form>
            <div className="form-grid">
              {/* Cột bên trái */}
              <div className="form-column">
                <div className="form-group">
                  <label className="input-label">Tên</label>
                  <input type="text" placeholder="Nhập tên" className="register-input" />
                </div>
                <div className="form-group">
                  <label className="input-label">Tuổi</label>
                  <input type="number" placeholder="Nhập tuổi" className="register-input" />
                </div>
                <div className="form-group">
                  <label className="input-label">Giới tính</label>
                  <select className="register-input">
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">Số điện thoại</label>
                  <input type="tel" placeholder="Nhập số điện thoại" className="register-input" />
                </div>
                <div className="form-group">
                  <label className="input-label">Email</label>
                  <input type="email" placeholder="Nhập email" className="register-input" />
                </div>
              </div>

              {/* Cột bên phải */}
              <div className="form-column">
                <div className="form-group">
                  <label className="input-label">Tên đăng nhập</label>
                  <input type="text" placeholder="Nhập tên đăng nhập" className="register-input" />
                </div>
                <div className="form-group">
                  <label className="input-label">Mật khẩu</label>
                  <input type="password" placeholder="Nhập mật khẩu" className="register-input" />
                </div>
                <div className="form-group">
                  <label className="input-label avatar-label">Avatar</label>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="register-input large-input" />
                  {avatar && <img src={avatar} alt="Avatar" className="avatar-preview" />}
                </div>
              </div>
            </div>
            <button type="submit" className="submit-button">Đăng ký</button>
            <p className="login-link">
              Đã có tài khoản? <Link to="/login" className="login-anchor">Đăng nhập</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default RegisterForm;
