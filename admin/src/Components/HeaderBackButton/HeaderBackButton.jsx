import React from "react";
import './HeaderBackButton.css'
import { useNavigate } from "react-router-dom";

const HeaderBackButton = ({ button, title, dest }) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // quay lại trang trước đó
    };
    return (
        <>
            <div className="header-back-button">
                <button className="btn-back" onClick={handleBack}>{button}</button>
                <div className="divider"></div>
                <h1 className="header-title">{title}</h1>
            </div>
        </>

    );
}

export default HeaderBackButton;