import React, { useState } from 'react';
import './RegisterForm.css';
import { Link } from "react-router-dom";
import { auth } from '../../services/firebase-config';
import Footer from "../../Components/Footer/Footer"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { publicAxios } from '../../services/axios-instance';

const register = async (user) => {
  try {
    const { email, password } = user;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const uid = userCredential.user.uid;
    await publicAxios.post('/user/register', {
      ...user,
      firebase_user_id: uid, // gán thêm uid từ Firebase
    });

    alert("Đăng ký thành công!");
  } catch (error) {
    alert("Lỗi đăng ký: " + error.message);
  }
};

const RegisterForm = () => {
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    name: '',
    age: '',
    gender: 'male',
    phone: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setUser((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(user);
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
                  <input name="name" type="text" placeholder="Nhập tên" className="register-input" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="input-label">Tuổi</label>
                  <input name="age" type="number" placeholder="Nhập tuổi" className="register-input" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="input-label">Giới tính</label>
                  <select name="gender" className="register-input" value={user.gender} onChange={handleChange}>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">Số điện thoại</label>
                  <input name="phone" type="tel" placeholder="Nhập số điện thoại" className="register-input" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="input-label">Email</label>
                  <input name="email" type="email" placeholder="Nhập email" className="register-input" value={user.email} onChange={handleChange} />
                </div>
              </div>

              {/* Cột bên phải */}
              <div className="form-column">
                <div className="form-group">
                  <label className="input-label">Tên đăng nhập</label>
                  <input name="username" type="text" placeholder="Nhập tên đăng nhập" className="register-input" value={user.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="input-label">Mật khẩu</label>
                  <input name="password" type="password" placeholder="Nhập mật khẩu" className="register-input" value={user.password} onChange={handleChange} />
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
