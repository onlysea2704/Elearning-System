import React from "react";
import "./EntryTest.css";
import Sidebar from "../../Components/SideBar/SideBar";
import VideoLesson from "../../Components/VideoLesson/VideoLesson";
import ReadingQuestion from "../../Components/Question/ReadingQuestion/ReadingQuestion";
import Quiz from "../../Components/Quiz/Quiz";

const EntryTest = () => {
    let handleMarkAsDone = false;
    return (
        <div className="lesson-container"> {/* Thêm container */}
            <Sidebar className="sidebar" />
            <div className="lesson">
                {/* <VideoLesson
                    title="React Basics"
                    description="Learn the basics of React, including components, state, and props."
                    videoUrl="https://www.youtube.com/embed/YtLx_sfJquA"
                    onMarkAsDone={handleMarkAsDone}
                /> */}
                <Quiz/>
            </div>
            {/* <ReadingQuestion/> */}
        </div>
    );
};

export default EntryTest;
