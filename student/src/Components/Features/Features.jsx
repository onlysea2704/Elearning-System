// File: LandingPage.jsx
import React from "react";
import "./Features.css";

const Features = () => {

  return (
      <div id="features" className="features">
        <h2>Tính năng nổi bật</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Học từ vựng</h3>
            <p>Phát triển vốn từ vựng với các bài học tương tác.</p>
          </div>
          <div className="feature-item">
            <h3>Luyện đọc nghe</h3>
            <p>Cải thiện kỹ năng nghe đọc với các bài tập thực tế.</p>
          </div>
          <div className="feature-item">
            <h3>Kiểm tra trực tuyến</h3>
            <p>Đánh giá năng lực của bạn qua các bài kiểm tra.</p>
          </div>
          <div className="feature-item">
            <h3>Luyện nói viết </h3>
            <p>Cải thiện kỹ năng nói viết với hướng dẫn của giảng viên.</p>
          </div>
        </div>
      </div>
  );
};

export default Features;
