import { useState, useEffect, useContext } from "react";
import "./Quiz.css";
import ReadingQuestion from "../Question/ReadingQuestion/ReadingQuestion";
import ListeningQuestion from "../Question/ListeningQuestion/ListeningQuestion";
import WritingQuestion from "../Question/WritingQuestion/WritingQuestion";
import SpeakingQuestion from "../Question/SpeakingQuestion/SpeakingQuestion";
import { useParams } from "react-router-dom";
import { authAxios, publicAxios } from "../../services/axios-instance";
import { StudentContext } from "../../Context/Context";
import Popup from "../Popup/Popup";

const Quiz = () => {
  const { id_lesson } = useParams();
  const [infoQuiz, setInfoQuiz] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { statusLesson, setStatusLesson } = useContext(StudentContext);
  useEffect(() => {
    const fetchQuiz = async () => {
      const infoQuiz = await authAxios.post('/lesson/get-quiz-by-id-lesson', { idLesson: id_lesson });

      // Vì sẽ chạy lại mỗi lần id_lesson thay đổi nên có thể idLesson là của lecture không phải của quiz 
      // => nếu không phải của quiz thì ko có dữ liệu => nếu chạy thì sẽ bị lỗi undefined id_quiz 
      // => cần kiểm tra nếu không phải quiz thì không chạy tiếp
      if (!infoQuiz.data) {
        console.error("No quiz data found");
        return;
      }
      setInfoQuiz(infoQuiz.data);

      const result = await authAxios.post('/question/get-all-question-by-quiz-id', { idQuiz: infoQuiz.data.id_quiz });
      const questions = result.data.map(q => ({
        ...q,
        options: [q.option_1, q.option_2, q.option_3, q.option_4]
      }));
      setQuestions(questions);

    };
    if (statusLesson === 'quiz') {
      fetchQuiz();
    }
  }, [statusLesson]); // gọi khi id_lesson bị thay đổi giá trị

  // State quản lý câu trả lời
  const [answers, setAnswers] = useState(
    Array(questions.length).fill(null)
  );

  const handleAnswerChange = (questionIndex, answerValue) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answerValue;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    console.log(answers)
    if (answers.includes(undefined) || answers.length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("idLesson", id_lesson);

    questions.forEach((question, index) => {
      const answer = answers[index];
      if (question.type_question === "speaking" && answer instanceof File) {
        formData.append(`files`, answer); // gửi file mp3
        formData.append(`answers[${index}][id_question]`, question.id_question);
        formData.append(`answers[${index}][answer]`, answer.name); // hoặc mã định danh
      } else {
        formData.append(`answers[${index}][id_question]`, question.id_question);

        let answerValue = answer;
        if ((question.type_question === "reading" || question.type_question === "listening") && typeof answer === "number") {
          answerValue = question.options[answer]; // chuyển từ số thứ tự thành nội dung
        }
        formData.append(`answers[${index}][answer]`, answerValue);
      }
    });

    // In FormData trước khi gửi
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File name = ${value.name}, type = ${value.type}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      setLoading(true)
      const response = await authAxios.post('/lesson/submit-answers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Cố tình làm chậm thời gian chấm bài listening và reading
      // Vì thời gian chấm rất nhanh gần như lập tức
      // Nhưng mình muốn nó hiện cái Loading cho mọi người thấy đẹp :)))))
      if (Number(id_lesson) % 4 === 0) {
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 3000);
      } else {
        setLoading(false);
        window.location.reload();
      }
      console.log("Submission Response:", response.data);
      // setStatusLesson('lecture');
      // không hiểu sao setStatusLesson thì nó lại không trigger api lấy kết quả về 
      // => giải pháp tạm thời là reload lại trang 
    } catch (error) {
      console.error("Error submitting quiz:", error.message);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  // Render câu hỏi dựa trên loại quiz
  const renderQuestions = () => {
    return questions.map((question, index) => (
      <div key={question.id_question} className="quiz-question-block">
        {question.type_question === "reading" && (
          <ReadingQuestion
            question={question}
            selectedOption={answers[index]}
            onOptionChange={(value) => handleAnswerChange(index, value)}
          />
        )}
        {question.type_question === "listening" && (
          <ListeningQuestion
            question={question}
            selectedOption={answers[index]}
            onOptionChange={(value) => handleAnswerChange(index, value)}
          />
        )}
        {question.type_question === "writing" && (
          <WritingQuestion
            question={question}
            answer={answers[index]}
            onAnswerChange={(value) => handleAnswerChange(index, value)}
          />
        )}
        {question.type_question === "speaking" && (
          <SpeakingQuestion
            question={question}
            onFileUpload={(file) => handleAnswerChange(index, file)}
          />
        )}
      </div>
    ));
  };

  return (
    <>

      <div className="quiz-page-container">
        <div className="quiz-header">
          <h1 className="quiz-title">{infoQuiz?.name_quiz}</h1>
        </div>
        <div className="quiz-content">{renderQuestions()}</div>
        <button className="quiz-submit-button" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>
      {loading && <Popup type='send-answer' />}
    </>
  );
};

export default Quiz;
