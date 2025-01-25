import React from 'react';
import './ScoreComment.css';
import SideBar from '../../Components/SideBar/SideBar';

const ScoreComment = ({ index }) => {
    return (
        <div className="answer-feedback">
            <div className="feedback-score">
                <label htmlFor={`score-${index}`}>Score:</label>
                <div className="score-input-wrapper">
                    <input type="number" id={`score-${index}`} min="0" max="100" />
                    <span>/100</span>
                </div>
            </div>
            <div className="feedback-comments">
                <label htmlFor={`comments-${index}`}>Comments:</label>
                <textarea id={`comments-${index}`} rows="3" placeholder="Enter your comments..."></textarea>
            </div>
        </div>)
};

export default ScoreComment;
