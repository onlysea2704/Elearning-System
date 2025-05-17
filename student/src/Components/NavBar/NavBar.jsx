import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import avatar from '../../Assets/Image/user-default-image.jpg'
import { StudentContext } from "../../Context/Context";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { nameStudent } = useContext(StudentContext);
  const { avatarStudent } = useContext(StudentContext);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-logo">HUST-ENGLISH</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/my-course">Khóa Học Của Tôi</Link>
          </li>
          <li>
            <Link to="/explore-course">Khám Phá</Link>
          </li>
          <li>
            <Link to="/coursedetail/21">Kiểm tra đầu vào</Link>
          </li>
          <li>
            <Link to="/login">Đăng nhập</Link>
          </li>
        </ul>
        <div className="name-user">{nameStudent}</div>
        <div className="avatar-container" onClick={handleAvatarClick}>
          {/* <div className="avatar"></div> */}
          <img src={avatarStudent || avatar} alt="Avatar" className="avatar" />
          {showDropdown && (
            <div className="dropdown-menu" ref={dropdownRef}>
              <ul>
                <li><Link to='/change-password'>Thay mật khẩu</Link></li>
                <li><Link to='/profile-edit'>Thay đổi thông tin cá nhân</Link></li>
                <li><Link to='/login'>Đăng xuất</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
