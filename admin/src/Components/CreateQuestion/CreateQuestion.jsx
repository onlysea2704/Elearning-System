import React from "react";
import './CreateQuestion.css';

const CreateQuestion = ({currentQuestion, audioKey, handleImageUpload, uploadedImage, handleAudioUpload, uploadedAudio }) => {

    return (
        <>
            {/* Upload Section */}
            <div className="form-group">
                <label>ID Question</label>
                <input type="text" value={currentQuestion?.id_question} readOnly />
            </div>
            <div className="form-group">
                <label>Type</label>
                <select value={currentQuestion?.type_question}>
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
                {currentQuestion?.link_image ? (
                    <img src={currentQuestion?.link_image} alt="Uploaded" />
                ) : (
                    <p style={{ color: "#999" }}>No image uploaded</p>
                )}
            </div>
            <div className="form-group">
                <label>Upload MP3</label>
                <input type="file" accept="audio/mp3" onChange={handleAudioUpload} />
            </div>
            <div className="preview-mp3">
                {currentQuestion?.link_mp3 ? (
                    <audio key={audioKey} controls>
                        <source src={currentQuestion?.link_mp3} type="audio/mpeg" />
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
                <textarea value={currentQuestion?.question} placeholder="Nhập nội dung câu hỏi"></textarea>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" value={currentQuestion?.option_1 || ''} placeholder="Nhập Option A" />
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" value={currentQuestion?.option_2 || ''} placeholder="Nhập Option B" />
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" value={currentQuestion?.option_3 || ''} placeholder="Nhập Option C" />
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" value={currentQuestion?.option_4 || ''} placeholder="Nhập Option D" />
            </div>
            <div className="form-group">
                <label>Answer</label>
                <select>
                    <option value="A">{currentQuestion?.option_1}</option>
                    <option value="B">{currentQuestion?.option_2}</option>
                    <option value="C">{currentQuestion?.option_3}</option>
                    <option value="D">{currentQuestion?.option_4}</option>
                </select>
            </div>
            <div className="form-group">
                <label>Interpret</label>
                <textarea value={currentQuestion?.interpret} placeholder="Nhập giải thích"></textarea>
            </div>
            <button className="save-question" onClick={() => alert("Lưu thành công")}>Lưu Bài Kiểm Tra</button>
        </>
    );
}

export default CreateQuestion;
