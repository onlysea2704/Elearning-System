import Lottie from 'lottie-react';
// import animationData from './send-answer.json';
import loginAnimation from '../../Assets/login-animation.json';
import sendAnswerAnimation from '../../Assets/send-answer.json';
import signUpAnimation from '../../Assets/sign-up.json';
import editInformAnimation from '../../Assets/edit-inform.json';
import purchaseAnimation from '../../Assets/purchase.json';
import './Popup.css';

const Popup = ({type}) => {
    let message, animation
    if(type === 'login'){
        message = 'Hệ thống đang liên kết với dữ liệu của bạn'
        animation = loginAnimation
    } else if(type === 'send-answer'){
        message = 'Bài làm của bạn đang được hệ thống chấm xử lý Hãy đợi chút nhé ❤️❤️❤️'
        animation = sendAnswerAnimation
    } else if( type === 'signup'){
        message = 'Hệ thống đang tạo tài khoản cho bạn'
        animation = signUpAnimation
    } else if( type === 'edit-inform'){
        message = 'Thông tin của bạn đang được cập nhật'
        animation = editInformAnimation
    }else if( type === 'purchase'){
        message = 'Hãy mua khóa học để bắt đầu nhé'
        animation = purchaseAnimation
    }
    return (
        <div className={`app-container blurred`}>
            <div className="animation-overlay">
                <div className="animation-popup">
                    <div className="animation-header">
                        <p>{message}</p>
                    </div>
                    <div className="animation-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 16px' }}>
                        <Lottie animationData={animation} loop={true} style={{ height: 180, width: 180 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
