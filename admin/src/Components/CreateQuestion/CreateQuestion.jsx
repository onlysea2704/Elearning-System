import React from "react";
import './CreateQuestion.css';

const CreateQuestion = ({audioKey, handleImageUpload, uploadedImage, handleAudioUpload, uploadedAudio }) => {
    

    return (
        <>
            {/* Upload Section */}
            <div className="upload-section">
                <div className="form-group">
                    <label>ID Question</label>
                    <input type="text" placeholder="Nhập ID Question" />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select>
                        <option value="reading">Reading</option>
                        <option value="speaking">Speaking</option>
                        <option value="writing">Writing</option>
                        <option value="listening">Listening</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Score</label>
                    <input type="number" placeholder="Nhập điểm số" />
                </div>
                <div className="form-group">
                    <label>Tải ảnh</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="preview-image">
                    {uploadedImage ? (
                        <img src={uploadedImage} alt="Uploaded" />
                    ) : (
                        <p style={{ color: "#999" }}>No image uploaded</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Tải file MP3</label>
                    <input type="file" accept="audio/mp3" onChange={handleAudioUpload} />
                </div>
                <div className="preview-mp3">
                    {uploadedAudio ? (
                        <audio key={audioKey} controls>
                            <source src={uploadedAudio} type="audio/mpeg" />
                            Trình duyệt của bạn không hỗ trợ phát âm thanh.
                        </audio>
                    ) : (
                        <audio controls>
                            <source src="" type="audio/mpeg" />
                            Trình duyệt của bạn không hỗ trợ phát âm thanh.
                        </audio>
                    )}
                </div>
            </div>

            <div className="divider"></div>

            {/* Details Section */}
            <div className="details-section">
                <div className="form-group">
                    <label>Question</label>
                    <textarea placeholder="Nhập nội dung câu hỏi"></textarea>
                </div>
                <div className="form-group">
                    <label>Option A</label>
                    <input type="text" placeholder="Nhập Option A" />
                </div>
                <div className="form-group">
                    <label>Option B</label>
                    <input type="text" placeholder="Nhập Option B" />
                </div>
                <div className="form-group">
                    <label>Option C</label>
                    <input type="text" placeholder="Nhập Option C" />
                </div>
                <div className="form-group">
                    <label>Option D</label>
                    <input type="text" placeholder="Nhập Option D" />
                </div>
                <div className="form-group">
                    <label>Answer</label>
                    <select>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Interpret</label>
                    <textarea placeholder="Nhập giải thích"></textarea>
                </div>
                <button className="save-question" onClick={() => alert("Lưu thành công")}>Lưu Bài Kiểm Tra</button>
            </div>
        </>
    );
}

export default CreateQuestion;
