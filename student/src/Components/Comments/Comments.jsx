import React, { useContext, useState } from "react";
import "./Comments.css";
import { StudentContext } from "../../Context/Context";
import { useParams } from "react-router-dom";

const Comments = () => {
    const {id_course} = useParams();
    // const {comments,students} = useContext(StudentContext);

    const [comments, setComments] = useState([
        { id: 2, author: "Nguyễn Hoàng Bảo", text: "Nội dung chi tiết và dễ hiểu." },
        { id: 3, author: "Phạm Quỳnh Anh", text: "Giảng viên dạy rất dễ hiểu, tôi rất thích!" },
        { id: 4, author: "Trần Gia Huy", text: "Khóa học cung cấp đầy đủ kiến thức cơ bản." },
    ]);

    const [newComment, setNewComment] = useState("");

    // Xử lý khi gửi bình luận
    const handleAddComment = () => {
        if (newComment.trim() === "") return;

        const newCommentObject = {
            id: comments.length + 1,
            author: "Bạn", // Tạm thời để tên là "Bạn"
            text: newComment,
        };

        setComments([...comments, newCommentObject]);
        setNewComment(""); // Reset textarea
    };

    return (
            <div className="comments">
                <h3 className="comments-header">Bình luận của học viên</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="comment-avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="comment-content">
                            <p className="comment-author">{comment.author}</p>
                            <p className="comment-text">{comment.text}</p>
                        </div>
                    </div>
                ))}

                {/* Phần thêm bình luận */}
                <div className="add-comment-section">
                    <textarea
                        className="add-comment-textarea"
                        placeholder="Viết bình luận của bạn..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button className="add-comment-button" onClick={handleAddComment}>
                        Gửi bình luận
                    </button>
                </div>
            </div>
    );
};

export default Comments;
