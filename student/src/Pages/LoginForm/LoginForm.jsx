import React, { useContext } from 'react';
import './LoginForm.css';
import { Link, useNavigate  } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../../services/firebase-config';
import Footer from "../../Components/Footer/Footer"
import { useState } from 'react';
import { authAxios } from '../../services/axios-instance';
import { StudentContext } from '../../Context/Context';

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setNameStudent, setAvatarStudent } = useContext(StudentContext)

  const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // Lưu vào sessionStorage
    sessionStorage.setItem('authToken', token);
    const userInfo = await authAxios.get('/student/info');
    setNameStudent(userInfo.data.name);
    setAvatarStudent(userInfo.data.link_image);
    console.log(userInfo.data);
    console.log(userInfo.data.link_image);
    alert("đăng nhập thành công");
    navigate("/");
  } catch (error) {
    console.log(error.message);
    alert("Lỗi đăng nhập:", error.message);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    <>
    <div className="login-container">
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <label className="input-label-login">Email</label>
          <input 
            type="text" 
            placeholder="Nhập email" 
            className="login-input" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="input-label-login">Mật khẩu</label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu" 
            className="login-input" 
          />
          <button type="submit" className="submit-button-login">Đăng nhập</button>
        </form>
        <p className="register-text">
          Chưa có tài khoản? <Link to="/register">Đăng Ký</Link>
        </p>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default LoginForm;
