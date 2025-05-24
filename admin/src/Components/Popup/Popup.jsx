import Lottie from 'lottie-react';
// import animationData from './send-answer.json';
import loginAnimation from '../../Assets/login-animation.json';
import sendAnswerAnimation from '../../Assets/send-answer.json';
import signUpAnimation from '../../Assets/sign-up.json';
import editInformAnimation from '../../Assets/edit-inform.json';
import './Popup.css';

const Popup = ({type}) => {
    let message, animation
    if(type === 'update-lecturer'){
        message = 'Hệ thống đang cập nhật thông tin giảng viên'
        animation = loginAnimation
    } else if(type === 'create-question-by-ai'){
        message = 'AI đang tạo câu hỏi'
        animation = sendAnswerAnimation
    } else if( type === 'update-question'){
        message = 'Đang cập nhật nội dung câu hỏi'
        animation = signUpAnimation
    } else if( type === 'update-course'){
        message = 'Đang cập nhật thông tin khóa học'
        animation = editInformAnimation
    } else if( type === 'update-lecture'){
        message = 'Đang cập nhật nội dung bài học'
        animation = editInformAnimation
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
