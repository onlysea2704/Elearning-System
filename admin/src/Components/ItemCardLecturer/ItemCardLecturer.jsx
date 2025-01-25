import React, { useState } from 'react';
import './ItemCardLecturer.css';
import { Link } from 'react-router-dom';


const ItemCardLecturer = ({ lecturer }) => {

    return (
        <Link to='/dashboard/manage-teacher' className="student-item" key={lecturer.id}>
            <img src={lecturer.avatar} alt={lecturer.name} className="student-avatar" />
            <div className="student-info">
                <h3 className="student-name">{lecturer.name}</h3>
                <p className="student-course">ID: GV{lecturer.id}</p>
                <p className="student-course">Email: {lecturer.email}</p>
            </div>
        </Link>
    );
};

export default ItemCardLecturer;
