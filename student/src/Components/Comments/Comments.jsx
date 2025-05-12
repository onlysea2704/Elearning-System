import { useState, useEffect } from "react";
import "./Comments.css";
import { useParams } from "react-router-dom";
import { authAxios, publicAxios } from "../../services/axios-instance";
import { auth } from "../../services/firebase-config";

const Comments = () => {
    const { id_course } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchAllComments = async () => {
            const allComments = await publicAxios.post('/comment/get-all-comment-by-id-course', { idCourse: id_course });
            setComments(allComments.data);
        };
        fetchAllComments(); // Gọi API khi component được mount
    }, []); // gọi khi isPurchase bị thay đổi giá trị

    const [newComment, setNewComment] = useState("");

    // Xử lý khi gửi bình luận
    const handleAddComment = async () => {
        if (newComment.trim() === "") return;

        await authAxios.post('/comment/create', { idCourse: id_course, content: newComment })
        const allComments = await publicAxios.post('/comment/get-all-comment-by-id-course', { idCourse: id_course });
        setComments(allComments.data);
        setNewComment("");
    };

    return (
        <div className="comments">
            <h3 className="comments-header">Bình luận của học viên</h3>
            {comments.map((comment) => (
                <div key={comment.id_comment} className="comment">
                    <div className="comment-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="comment-content">
                        <p className="comment-author">{comment.name}</p>
                        <p className="comment-text">{comment.comment}</p>
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
