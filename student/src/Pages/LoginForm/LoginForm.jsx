import React from 'react';
import './LoginForm.css';
import { Link, useNavigate  } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../../services/firebase-config';
import Footer from "../../Components/Footer/Footer"
import { useState } from 'react';

const login = async (email, password, navigate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
     // Lưu vào sessionStorage
     sessionStorage.setItem('authToken', token);
     
    alert("đăng nhập thành công")
    navigate("/");
  } catch (error) {
    alert("Lỗi đăng nhập:", error.message);
  }
};

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, navigate);
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
