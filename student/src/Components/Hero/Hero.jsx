import React, { useState, useEffect } from 'react';
import './Hero.css';
import BG1 from '../../Assets/Image/BG3.png'
import { Link } from 'react-router-dom';

const HeroText = ({ text }) => {
    return (
        <h1 className="hero-title">
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className="hero-letter"
                    style={{
                        animationDelay: `${index * 0.05}s`,
                        display: 'inline-block',
                        willChange: 'transform, opacity'
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </h1>
    );
};

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`hero ${isVisible ? 'visible' : ''}`}>
            <div className="hero-content">
                <div className="hero-text-container">
                    <HeroText text="Khám Phá Tiếng Anh Dễ Dàng" />
                    <p className="hero-subtitle">
                        Học tiếng Anh thông minh, hiệu quả và thú vị
                        với phương pháp học tập tiên tiến
                    </p>
                    <div className="hero-cta-group">
                        <Link to="/coursedetail/21" className="cta-btn primary-btn">
                            <i className="fas fa-play btn-icon"></i>
                            Kiểm tra đầu vào
                        </Link>
                        <Link to="/explore-course" className="cta-btn secondary-btn">
                            <i className="fas fa-book-open btn-icon"></i>
                            Khám Phá Khóa Học
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">1000+</span>
                            <span className="stat-label">Học Viên</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Khóa Học</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">700+</span>
                            <span className="stat-label">Bài Học</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image-container">
                    <div className="hero-image-overlay"></div>
                    <img
                        src={BG1}
                        alt="English Learning"
                        className="hero-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
