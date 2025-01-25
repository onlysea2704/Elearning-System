import React from "react";
import './HeaderBackButton.css'
import { Link } from "react-router-dom";

const HeaderBackButton = ({ button, title, dest }) => {
    return (
        <>
            <div className="header-back-button">
                <Link className="btn-back" to={dest}>{button}</Link>
                <div className="divider"></div>
                <h1 className="header-title">{title}</h1>
            </div>
        </>

    );
}

export default HeaderBackButton;