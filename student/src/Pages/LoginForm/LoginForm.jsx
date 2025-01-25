import React from 'react';
import './LoginForm.css';
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer"

const LoginForm = () => {
  return (
    <>
    <div className="login-container">
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <form>
          <label className="input-label-login">Tên Đăng Nhập</label>
          <input 
            type="text" 
            placeholder="Nhập tên đăng nhập" 
            className="login-input" 
          />
          <label className="input-label-login">Mật khẩu</label>
          <input 
            type="password" 
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
