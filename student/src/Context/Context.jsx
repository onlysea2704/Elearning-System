import { useState, createContext, useEffect } from "react";

const StudentContext = createContext();

const StudentContextProvider = (props) => {
    const [nameStudent, setNameStudent] = useState(null);
    const [avatarStudent, setAvatarStudent] = useState(null);
    const [statusLesson, setStatusLesson] = useState(null);

    // mỗi lần reload lại trang thì cần lấy lại thông tin đễ đỡ phải đăng nhập lại vì khi reload các state cx bị reset
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            setNameStudent(savedUsername);
        }
        const savedAvatar = localStorage.getItem('link_avatar');
        if (savedAvatar) {
            setAvatarStudent(savedAvatar);
        }
    }, []);

    const contextValue = {
        nameStudent, setNameStudent, statusLesson, setStatusLesson, avatarStudent, setAvatarStudent
    };

    return (
        <StudentContext.Provider value={contextValue}>
            {props.children}
        </StudentContext.Provider>
    )
}
export { StudentContext };
export default StudentContextProvider;