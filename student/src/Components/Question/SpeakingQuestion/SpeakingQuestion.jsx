import React, { useState } from "react";
import "./SpeakingQuestion.css";

const SpeakingQuestion = ({ question, onFileUpload }) => {
  const [audioURL, setAudioURL] = useState(null);
  const [fileName, setFileName] = useState(null);
  const handleFileChange = (event) => {
    console.log(1234567899);
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setAudioURL(URL.createObjectURL(file));
      onFileUpload(file);
    }
  };

  return (
    <div className="speaking-question-card">
      <h2 className="speaking-question-title">{question.question}</h2>
      <div className="speaking-upload-container">
        <label htmlFor={`file-upload-${question.id_question}`} className="upload-button">
          {fileName ? "Replace File" : "Upload your MP3 answer"}
        </label>
        <input
          id={`file-upload-${question.id_question}`}
          name={`${question.id_question}`}
          type="file"
          accept="audio/mp3"
          className="file-input-hidden"
          onChange={handleFileChange}
        />
        {fileName && (
          <p className="file-name">
            <span className="uploaded-file-text">Your File: </span>{fileName}
          </p>
        )}
      </div>
      {audioURL && (
        <div className="audio-preview-container">
          <h3 className="audio-preview-title">Listen to your recording:</h3>
          {/* React sử dụng key để theo dõi các phần tử trong DOM và đảm bảo rằng khi dữ liệu thay đổi, 
          các phần tử được render lại chính xác. Việc thay đổi key giúp React biết rằng phần tử cũ phải bị 
          loại bỏ và phần tử mới (với URL mới) phải được render lại từ đầu. */}
          <audio key={audioURL} controls className="audio-player">
            <source src={audioURL} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default SpeakingQuestion;
