import React, { useState, useEffect, useContext } from 'react';
import './Checkout.css';
import QRCode from '../../Assets/Image/QR.png'; // Replace with your QR code image path
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import { StudentContext } from '../../Context/Context';

const Checkout = () => {
    const { id_course } = useParams();
    const {courses} = useContext(StudentContext);
    const course = courses.find(course => course.id_course === Number(id_course));

    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowPopup(true), 10000); // Show popup after 10 seconds
        return () => clearTimeout(timer); // Cleanup on component unmount
    }, []);

    const handleNavigate = () => {
        navigate(`/coursedetail/${id_course}`);
    };

    return (
        <>
            <div className="checkout-container">
                <div className="checkout-left">
                    <h2>Thông tin thanh toán</h2>
                    <div className="info-item">
                        <span className="label">Tên:</span> Phạm Duy Hải
                    </div>
                    <div className="info-item">
                        <span className="label">Mã học viên:</span> HV12345
                    </div>
                    <div className="info-item">
                        <span className="label">Số điện thoại:</span> 0918297371
                    </div>
                    <div className="info-item">
                        <span className="label">Email:</span> phamduyhai2704@gmail.com
                    </div>
                    <div className="info-item">
                        <span className="label">ID khóa học:</span> {id_course}
                    </div>
                    <div className="info-item">
                        <span className="label">Tên khóa học:</span> {course.name_course}
                    </div>
                    <div className="info-item">
                        <span className="label">Giá tiền: </span> 
                        <span className='label price-checkout'>{course.price} VNĐ</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Nội dung thanh toán:</span> Thanh toán học phí
                    </div>
                </div>
                <div className="checkout-right">
                    <h2>Quét mã QR</h2>
                    <img src={QRCode} alt="QR Code" className="qr-code" />
                </div>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Thanh toán thành công!</h3>
                            <p>Chúc bạn học tập vui vẻ và thành công!</p>
                            <button onClick={handleNavigate}>Xem chi tiết khóa học</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
