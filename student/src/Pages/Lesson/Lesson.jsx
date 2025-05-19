import { useContext, useEffect, useState } from "react";
import "./Lesson.css";
import Sidebar from "../../Components/SideBar/SideBar";
import VideoLesson from "../../Components/VideoLesson/VideoLesson";
import Quiz from "../../Components/Quiz/Quiz";
import { useParams, useNavigate } from "react-router-dom";
import Result from "../../Components/Result/Result";
import { authAxios } from "../../services/axios-instance";
import { StudentContext } from "../../Context/Context";
import Popup from "../../Components/Popup/Popup";

const Lesson = () => {
  const { id_lesson, id_course } = useParams();
  const { setStatusLesson } = useContext(StudentContext)
  const [typeLesson, setTypeLesson] = useState("");
  const [isComplete, setIsComplete] = useState("");
  const [displayPurchase, setDisplayPurchase] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfoLesson = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        // alert("Vui lòng đăng nhập để mua khóa học!");
        setDisplayPurchase(true)
        setTimeout(() => {
          navigate(`/login`);
          setDisplayPurchase(false)
        }, 2000);
      }

      const infoLesson = await authAxios.post('/lesson/get-info-lesson', { idLesson: id_lesson });
      console.log(infoLesson)
      console.log(infoLesson.status)
      if (!infoLesson.data.status) {
        setDisplayPurchase(true)
        setTimeout(() => {
          navigate(`/coursedetail/${id_course}`)
          setDisplayPurchase(false)
        }, 2000);
        return
      }
      setTypeLesson(infoLesson.data.type_lesson);

      const isComplete = await authAxios.post('/lesson/check-complete-lesson', { idLesson: id_lesson });
      setIsComplete(isComplete.data.status);
      console.log(infoLesson.data.type_lesson);
      // Phải set là temp vì nếu di chuyển giữa 2 lesson cùng loại thì state của lesson không thay đổi 
      // => không render ra dữ liệu mới
      // phải có timeout, nếu bỏ đi thì ko chạy => ko biết tại sao =)))
      setStatusLesson('temp');
      setTimeout(() => {
        if (infoLesson.data.type_lesson === 'video') {
          setStatusLesson('video');
        } else if (isComplete.data.status === false) {
          setStatusLesson('quiz');
        } else {
          setStatusLesson('result');
        }
      }, 0);
    };
    fetchInfoLesson(); // Gọi API khi component được mount
  }, [id_lesson]); // gọi khi id_lesson bị thay đổi giá trị

  // Xử lý render component dựa trên type_lesson
  return (
    <div className="lesson-container">
      <Sidebar className="sidebar" />
      <div className="lesson">
        {typeLesson === "quiz" ? (isComplete ? (<Result />) : (<Quiz />)
        ) : (
          <VideoLesson />
        )}
      </div>
      {displayPurchase && <Popup type='purchase' />}
    </div>
  );
};

export default Lesson;
