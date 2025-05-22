import { useState } from 'react';
import './CreateQuestion.css';
import { authAxios } from '../../services/axios-instance';

const CreateQuestion = ({
    currentQuestion,
    handleChangeQuestion,
    audioKey,
    handleImageUpload,
    imageUrlQuestion,
    audioUrlQuestion,
    handleAudioUpload,
    handleSubmitUpdateQuestion,
}) => {

    return (
        <>
            {/* Upload Section */}
            <div className="form-group">
                <label>ID Question</label>
                <input type="text" value={currentQuestion?.id_question} readOnly />
            </div>
            <div className="form-group">
                <label>Type</label>
                <select onChange={handleChangeQuestion} value={currentQuestion?.type_question}>
                    <option value="reading">Reading</option>
                    <option value="speaking">Speaking</option>
                    <option value="writing">Writing</option>
                    <option value="listening">Listening</option>
                </select>
            </div>
            <div className="form-group">
                <label>Score</label>
                <input type="number" value={10} readOnly />
            </div>
            <div className="form-group">
                <label>Upload Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div className="preview-image">
                {imageUrlQuestion ? (
                    <img src={imageUrlQuestion} alt="Uploaded" />
                ) : (
                    <p style={{ color: "#999" }}>No image uploaded</p>
                )}
            </div>
            <div className="form-group">
                <label>Upload MP3</label>
                <input type="file" accept="audio/mp3" onChange={handleAudioUpload} />
            </div>
            <div className="preview-mp3">
                {audioUrlQuestion ? (
                    <audio key={audioKey} controls>
                        <source src={audioUrlQuestion} type="audio/mpeg" />
                        Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                ) : (
                    <audio controls>
                        <source src="" type="audio/mpeg" />
                        Trình duyệt của bạn không hỗ trợ phát âm thanh.
                    </audio>
                )}
            </div>

            {/* <div className="divider"></div> */}

            {/* Details Section */}
            <div className="form-group">
                <label>Question</label>
                <textarea onChange={handleChangeQuestion} value={currentQuestion?.question} placeholder="Nhập nội dung câu hỏi"></textarea>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input onChange={handleChangeQuestion} type="text" value={currentQuestion?.option_1 || ''} placeholder="Nhập Option A" />
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input onChange={handleChangeQuestion} type="text" value={currentQuestion?.option_2 || ''} placeholder="Nhập Option B" />
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input onChange={handleChangeQuestion} type="text" value={currentQuestion?.option_3 || ''} placeholder="Nhập Option C" />
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input onChange={handleChangeQuestion} type="text" value={currentQuestion?.option_4 || ''} placeholder="Nhập Option D" />
            </div>
            <div className="form-group">
                <label>Answer</label>
                <select onChange={handleChangeQuestion}>
                    <option value="A">{currentQuestion?.option_1}</option>
                    <option value="B">{currentQuestion?.option_2}</option>
                    <option value="C">{currentQuestion?.option_3}</option>
                    <option value="D">{currentQuestion?.option_4}</option>
                </select>
            </div>
            <div className="form-group">
                <label>Interpret</label>
                <textarea onChange={handleChangeQuestion} value={currentQuestion?.interpret} placeholder="Nhập giải thích"></textarea>
            </div>
            <button className="save-question" onClick={handleSubmitUpdateQuestion}>Lưu Câu Hỏi</button>
        </>
    );
}

export default CreateQuestion;
