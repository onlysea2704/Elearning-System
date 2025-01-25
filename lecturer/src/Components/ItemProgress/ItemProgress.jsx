import React, { useState } from 'react';
import './ItemProgress.css';
import { Link } from 'react-router-dom';


const ItemProgress = ({ student }) => {

    return (
        <Link to='/dashboard/detail-progress' className="student-item" key={student.id}>
            <img src={student.avatar} alt={student.name} className="student-avatar" />
            <div className="student-info">
                <h3 className="student-name">{student.name}</h3>
                <p className="student-course">{student.course}</p>
                <p className="student-progress">Tiến độ: {student.progress}</p>
            </div>
        </Link>
    );
};

export default ItemProgress;
