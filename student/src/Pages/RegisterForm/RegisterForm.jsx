import React, { useState } from 'react';
import './RegisterForm.css';
import { Link } from "react-router-dom";
import { auth } from '../../services/firebase-config';
import Footer from "../../Components/Footer/Footer"
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

const register = async (email, password) => {
  try {
    console.log(email, password)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // await fetch("http://localhost:5000/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ uid: userCredential.user.uid, email, role: "user" }),
    // });
    alert("Đăng ký thành công:", userCredential);
  } catch (error) {
    console.log(email, password)
    alert("Lỗi đăng ký:", error.message);
  }
};

const RegisterForm = () => {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
  };

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
          <form onSubmit={handleSubmit}>
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
                  <input type="email"
                    placeholder="Nhập email"
                    className="register-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              {/* Cột bên phải */}
              <div className="form-column">
                <div className="form-group">
                  <label className="input-label">Tên đăng nhập</label>
                  <input type="text" placeholder="Nhập tên đăng nhập" className="register-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="input-label">Mật khẩu</label>
                  <input type="password" placeholder="Nhập mật khẩu" className="register-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
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
      <Footer />
    </>
  );
};

export default RegisterForm;
