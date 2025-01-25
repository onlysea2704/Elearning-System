import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './DetailSubmission.css';
import SideBar from '../../Components/SideBar/SideBar';
import ScoreComment from '../../Components/ScoreComment/ScoreComment';
const mockResponses = [
    {
        question: "What is your favorite book and why?",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        answer: "Enhance your English speaking skills for daily conversations.Improve your grammar to write and speak with confidence.Learn to express your ideas clearly and creatively in English.Develop your English skills to communicate effectively in all situations.Build a strong foundation for basic English conversations.Boost your speaking skills for professional and business settings.Sharpen your listening skills to understand native speakers with ease.Enhance your English speaking skills for daily conversations.Improve your grammar to write and speak with confidence.Learn to express your ideas clearly and creatively in English.Develop your English skills to communicate effectively in all situations.Build a strong foundation for basic English conversations.Boost your speaking skills for professional and business settings.Sharpen your listening skills to understand native speakers with ease.",
        type: "reading"
    },
    {
        question: "Describe your ideal vacation.",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        answer: "Learn essential English phrases to travel confidently around the world. Enhance your English speaking skills for daily conversations. Improve your grammar to write and speak with confidence.Learn to express your ideas clearly and creatively in English.Develop your English skills to communicate effectively in all situations. Build a strong foundation for basic English conversations.Boost your speaking skills for professional and business settings. Sharpen your listening skills to understand native speakers with ease.",
        type: "reading"
    },
];


const DetailSubmission = () => {
    const { id_submission } = useParams();
    return (
        <div className="submission-container">
            <SideBar />
            <div className="submission-content">
                <header className="submission-header">
                    <div className="header-info">
                        <h1>Pham Duy Hai</h1>
                        <p>Lesson: Lesson Name</p>
                        <p>Course: English for Everyday Conversations</p>
                    </div>
                    <Link to='/dashboard/list-submission' className="back-to-list-button">
                        Quay lại danh sách
                    </Link>
                </header>
                <section className="submission-answers">
                    {mockResponses.map((response, index) => (
                        <div key={index} className="answer-card">
                            <h3>Question {index + 1}: {response.question}</h3>
                            {id_submission % 2 == 0 ?
                                <audio controls>
                                    <source src={response.audio} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                                : <div className="answer-text">
                                    <label htmlFor={`answer-${index}`}>Student's Answer:</label>
                                    <textarea
                                        id={`answer-${index}`}
                                        rows="5"
                                        value={response.answer}
                                        readOnly
                                    ></textarea>
                                </div>}
                            <ScoreComment index={index} />
                        </div>
                    ))}
                </section>
                <div className="submission-actions">
                    <button className="update-button">Cập nhật</button>
                </div>
            </div>
        </div>
    );
};

export default DetailSubmission;
