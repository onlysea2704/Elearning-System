import { useState } from "react";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../../services/firebase-config';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      // Lưu vào sessionStorage
      sessionStorage.setItem('authToken', token);
      alert("Đăng nhập thành công với vai trò admin");
      navigate('/dashboard/account-manage');
    } catch (error) {
      console.log(error.message);
      alert("Lỗi đăng nhập:", error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Hust-English</h2>
        <div className="login-form">
          <h2>Đăng nhập cho Admin</h2>
          <label className="input-label">Email Đăng Nhập</label>
          <input
            type="text"
            placeholder="Nhập Email đăng nhập"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị username
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
          <button className="submit-button" onClick={login}>
            Đăng nhập
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
