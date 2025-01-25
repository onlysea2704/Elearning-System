import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and About Section */}
        <div className="footer-section footer-about">
          <h2 className="footer-logo">HUST-English</h2>
          <p>
            HUST-English là nền tảng học tiếng Anh trực tuyến giúp bạn cải thiện 
            kỹ năng ngôn ngữ mọi lúc, mọi nơi. Chúng tôi cung cấp các khóa học cho 
            mọi trình độ với nội dung phong phú.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section footer-links">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="/home">Trang chủ</a></li>
            <li><a href="/courses">Khóa học</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Liên hệ</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section footer-contact">
          <h3>Liên hệ</h3>
          <p>Email: <a href="mailto:support@englishlearn.com">support@englishlearn.com</a></p>
          <p>Hotline: +84 123 456 789</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 HUST-English. All rights reserved. | Designed with Pham Duy Hai</p>
      </div>
    </footer>
  );
};

export default Footer;
