import { useState, createContext } from "react";
import thumbnail1 from "../Assets/Image/thumbnail1.jpg";
import thumbnail2 from "../Assets/Image/thumbnail2.jpg";
import thumbnail3 from "../Assets/Image/thumbnail3.jpg";
import thumbnail4 from "../Assets/Image/thumbnail4.jpg";
import thumbnail5 from "../Assets/Image/thumbnail5.jpg";
import thumbnail6 from "../Assets/Image/thumbnail6.jpg";
import thumbnail7 from "../Assets/Image/thumbnail7.jpg";
import thumbnail8 from "../Assets/Image/thumbnail8.jpg";

const StudentContext = createContext();

// Bảng User
const users = [
    { id_user: 1, user_name: "john_doe", pass: "12345", role: "student" },
    { id_user: 2, user_name: "jane_lecturer", pass: "abcde", role: "lecturer" },
    { id_user: 3, user_name: "mark_student", pass: "pass123", role: "student" },
    { id_user: 4, user_name: "emma_lecturer", pass: "lecturer456", role: "lecturer" },
    { id_user: 5, user_name: "sophia_student", pass: "student321", role: "student" },
    { id_user: 6, user_name: "oliver_lecturer", pass: "pass789", role: "lecturer" },
    { id_user: 7, user_name: "liam_student", pass: "student654", role: "student" },
    { id_user: 8, user_name: "ava_lecturer", pass: "lecturer987", role: "lecturer" },
    { id_user: 9, user_name: "noah_student", pass: "student789", role: "student" },
    { id_user: 10, user_name: "mia_lecturer", pass: "lecturer123", role: "lecturer" },
];

// Bảng Student
const students = [
    { id_student: 1, name: "John Doe", age: 20, gender: "male", phone: "1234567890", email: "john@example.com", link_image: "john.jpg", id_user: 1 },
    { id_student: 2, name: "Mark Brown", age: 22, gender: "male", phone: "9876543210", email: "mark@example.com", link_image: "mark.jpg", id_user: 3 },
    { id_student: 3, name: "Sophia White", age: 21, gender: "female", phone: "5556667777", email: "sophia@example.com", link_image: "sophia.jpg", id_user: 5 },
    { id_student: 4, name: "Liam Green", age: 23, gender: "male", phone: "4443332222", email: "liam@example.com", link_image: "liam.jpg", id_user: 7 },
    { id_student: 5, name: "Noah Black", age: 20, gender: "male", phone: "1112223333", email: "noah@example.com", link_image: "noah.jpg", id_user: 9 },
    { id_student: 6, name: "Emma Blue", age: 21, gender: "female", phone: "7778889999", email: "emma@example.com", link_image: "emma.jpg", id_user: 4 },
    { id_student: 7, name: "Olivia Brown", age: 24, gender: "female", phone: "6665554444", email: "olivia@example.com", link_image: "olivia.jpg", id_user: 8 },
    { id_student: 8, name: "Ethan White", age: 19, gender: "male", phone: "3332221111", email: "ethan@example.com", link_image: "ethan.jpg", id_user: 6 },
    { id_student: 9, name: "Isabella Green", age: 22, gender: "female", phone: "9990001111", email: "isabella@example.com", link_image: "isabella.jpg", id_user: 10 },
    { id_student: 10, name: "William Black", age: 20, gender: "male", phone: "8887776666", email: "william@example.com", link_image: "william.jpg", id_user: 2 },
];

// Bảng Lecturer
const lecturers = [
    { id_lecturer: 1, full_name: "Jane Smith", experience: 5, certification: "Master's Degree", id_user: 2 },
    { id_lecturer: 2, full_name: "Emma Davis", experience: 10, certification: "PhD", id_user: 4 },
    { id_lecturer: 3, full_name: "Oliver Wilson", experience: 8, certification: "Master's Degree", id_user: 6 },
    { id_lecturer: 4, full_name: "Ava Brown", experience: 7, certification: "Bachelor's Degree", id_user: 8 },
    { id_lecturer: 5, full_name: "Mia Taylor", experience: 12, certification: "PhD", id_user: 10 },
    { id_lecturer: 6, full_name: "Liam Carter", experience: 6, certification: "Master's Degree", id_user: 7 },
    { id_lecturer: 7, full_name: "Sophia Johnson", experience: 9, certification: "PhD", id_user: 5 },
    { id_lecturer: 8, full_name: "Ethan Brown", experience: 4, certification: "Bachelor's Degree", id_user: 3 },
    { id_lecturer: 9, full_name: "Isabella Stone", experience: 11, certification: "PhD", id_user: 9 },
    { id_lecturer: 10, full_name: "William Scott", experience: 15, certification: "Master's Degree", id_user: 1 },
];

// Bảng Course
const courses = [
    { "id_course": 1, "name_course": "English for Everyday Conversations", "description": "Enhance your English speaking skills for daily conversations.", "price": 200000, "number_session": 10, "number_student": 5, "id_lecturer": 1, "type_course": "Speaking","image":thumbnail1 },
    { "id_course": 2, "name_course": "Mastering Advanced English Grammar Skills", "description": "Improve your grammar to write and speak with confidence.", "price": 150000, "number_session": 8, "number_student": 3, "id_lecturer": 2, "type_course": "Reading","image":thumbnail2 },
    { "id_course": 3, "name_course": "Creative Writing Techniques in English", "description": "Learn to express your ideas clearly and creatively in English.", "price": 180000, "number_session": 9, "number_student": 4, "id_lecturer": 1, "type_course": "Writing","image":thumbnail3 },
    { "id_course": 4, "name_course": "English for Effective Communication", "description": "Develop your English skills to communicate effectively in all situations.", "price": 250000, "number_session": 12, "number_student": 6, "id_lecturer": 3, "type_course": "All Skill","image":thumbnail4 },
    { "id_course": 5, "name_course": "Beginner's Conversational English", "description": "Build a strong foundation for basic English conversations.", "price": 220000, "number_session": 11, "number_student": 5, "id_lecturer": 4, "type_course": "Listening + Reading","image":thumbnail5 },
    { "id_course": 6, "name_course": "Professional English Speaking Skills", "description": "Boost your speaking skills for professional and business settings.", "price": 300000, "number_session": 14, "number_student": 7, "id_lecturer": 5, "type_course": "Speaking + Writing","image":thumbnail6 },
    { "id_course": 7, "name_course": "Listening Practice for Fluent English", "description": "Sharpen your listening skills to understand native speakers with ease.", "price": 400000, "number_session": 16, "number_student": 8, "id_lecturer": 6, "type_course": "Listening","image":thumbnail7 },
    { "id_course": 8, "name_course": "Conversational English for Travel", "description": "Learn essential English phrases to travel confidently around the world.", "price": 180000, "number_session": 10, "number_student": 5, "id_lecturer": 7, "type_course": "Speaking","image":thumbnail8 },
    { "id_course": 9, "name_course": "English Reading Comprehension", "description": "Strengthen your reading skills to understand English texts easily.", "price": 220000, "number_session": 12, "number_student": 6, "id_lecturer": 8, "type_course": "Reading","image":thumbnail1 },
    { "id_course": 10, "name_course": "Comprehensive Full English Skills Course", "description": "A comprehensive course to improve all English skills: speaking, listening, reading, and writing.", "price": 350000, "number_session": 18, "number_student": 10, "id_lecturer": 9, "type_course": "Speaking + Writing","image":thumbnail2 },
    { "id_course": 11, "name_course": "English Pronunciation Mastery", "description": "Perfect your English pronunciation to sound more natural and confident.", "price": 210000, "number_session": 9, "number_student": 4, "id_lecturer": 1, "type_course": "Speaking","image":thumbnail3 },
    { "id_course": 12, "name_course": "English Vocabulary for Beginners", "description": "Expand your vocabulary for better understanding and communication.", "price": 160000, "number_session": 8, "number_student": 3, "id_lecturer": 2, "type_course": "Reading","image":thumbnail4 },
    { "id_course": 13, "name_course": "Advanced Business English Communication Course", "description": "Enhance your English for professional and business environments.", "price": 300000, "number_session": 15, "number_student": 7, "id_lecturer": 5, "type_course": "Speaking + Writing","image":thumbnail5 },
    { "id_course": 14, "name_course": "English Listening for Beginners", "description": "Improve your listening skills with clear and simple English dialogues.", "price": 180000, "number_session": 10, "number_student": 4, "id_lecturer": 3, "type_course": "Listening","image":thumbnail6 },
    { "id_course": 15, "name_course": "English Writing for Professionals", "description": "Learn how to write clear, concise, and professional English documents.", "price": 280000, "number_session": 14, "number_student": 6, "id_lecturer": 4, "type_course": "Writing","image":thumbnail7 },
    { "id_course": 16, "name_course": "English for Customer Service", "description": "Learn key phrases and skills for customer service interactions in English.", "price": 230000, "number_session": 11, "number_student": 5, "id_lecturer": 6, "type_course": "Speaking","image":thumbnail8 },
    { "id_course": 17, "name_course": "Essential English Phrases for Confident Travel", "description": "Learn essential English phrases for traveling confidently.", "price": 170000, "number_session": 8, "number_student": 3, "id_lecturer": 7, "type_course": "Listening + Reading","image":thumbnail1 },
    { "id_course": 18, "name_course": "English Preparation for Job Interviews", "description": "Practice and master your English skills to ace job interviews.", "price": 260000, "number_session": 13, "number_student": 6, "id_lecturer": 8, "type_course": "Speaking","image":thumbnail2 },
    { "id_course": 19, "name_course": "Academic English for Students", "description": "Prepare your English skills for academic writing and discussions.", "price": 290000, "number_session": 15, "number_student": 8, "id_lecturer": 9, "type_course": "Speaking + Writing","image":thumbnail3 },
    { "id_course": 20, "name_course": "English Conversation Practice", "description": "Engage in real-world conversations to practice fluent English speaking.", "price": 190000, "number_session": 9, "number_student": 5, "id_lecturer": 1, "type_course": "Speaking","image":thumbnail4 },

    { id_course: 0, name_course: "Entry Test", description: "Entry Test", price: 0, number_session: 0, number_student: 0, id_lecturer: 0, type_course: "entry test" },
];

// Bảng MyCourse
const myCourses = [
    { id_transaction: 1, id_student: 1, id_course: 1, time_transaction: "2024-01-15" },
    { id_transaction: 2, id_student: 1, id_course: 2, time_transaction: "2024-01-16" },
    { id_transaction: 3, id_student: 1, id_course: 3, time_transaction: "2024-01-17" },
    { id_transaction: 4, id_student: 1, id_course: 4, time_transaction: "2024-01-18" },
    { id_transaction: 5, id_student: 1, id_course: 5, time_transaction: "2024-01-19" },
    { id_transaction: 6, id_student: 1, id_course: 6, time_transaction: "2024-01-20" },
    { id_transaction: 7, id_student: 7, id_course: 7, time_transaction: "2024-01-21" },
    { id_transaction: 8, id_student: 8, id_course: 8, time_transaction: "2024-01-22" },
    { id_transaction: 9, id_student: 9, id_course: 9, time_transaction: "2024-01-23" },
    { id_transaction: 10, id_student: 10, id_course: 10, time_transaction: "2024-01-24" },
];

// Bảng Comment
const comments = [
    { id_comment: 1, id_student: 1, id_course: 1, comment: "Great course!", time: "2024-01-25" },
    { id_comment: 2, id_student: 2, id_course: 2, comment: "Very informative.", time: "2024-01-26" },
    { id_comment: 3, id_student: 3, id_course: 3, comment: "Loved it!", time: "2024-01-27" },
    { id_comment: 4, id_student: 4, id_course: 4, comment: "Good for beginners.", time: "2024-01-28" },
    { id_comment: 5, id_student: 5, id_course: 5, comment: "Highly recommend.", time: "2024-01-29" },
    { id_comment: 6, id_student: 6, id_course: 6, comment: "Well structured.", time: "2024-01-30" },
    { id_comment: 7, id_student: 7, id_course: 7, comment: "Excellent content.", time: "2024-01-31" },
    { id_comment: 8, id_student: 8, id_course: 8, comment: "A bit advanced.", time: "2024-02-01" },
    { id_comment: 9, id_student: 9, id_course: 9, comment: "Helpful examples.", time: "2024-02-02" },
    { id_comment: 10, id_student: 10, id_course: 10, comment: "Great experience.", time: "2024-02-03" },
];

// Bảng Progress
const progress = [
    { id_progress: 1, id_student: 1, id_lesson: 1, status: "completed" },
    { id_progress: 2, id_student: 2, id_lesson: 2, status: "in progress" },
    { id_progress: 3, id_student: 3, id_lesson: 3, status: "completed" },
    { id_progress: 4, id_student: 4, id_lesson: 4, status: "not started" },
    { id_progress: 5, id_student: 5, id_lesson: 5, status: "completed" },
    { id_progress: 6, id_student: 6, id_lesson: 6, status: "in progress" },
    { id_progress: 7, id_student: 7, id_lesson: 7, status: "completed" },
    { id_progress: 8, id_student: 8, id_lesson: 8, status: "not started" },
    { id_progress: 9, id_student: 9, id_lesson: 9, status: "completed" },
    { id_progress: 10, id_student: 10, id_lesson: 10, status: "completed" },


    { id_progress: 11, id_student: 1, id_lesson: 1, status: "completed" },
    { id_progress: 12, id_student: 1, id_lesson: 2, status: "in progress" },
    { id_progress: 13, id_student: 1, id_lesson: 3, status: "completed" },
    { id_progress: 14, id_student: 1, id_lesson: 4, status: "not started" },
    { id_progress: 15, id_student: 1, id_lesson: 5, status: "completed" },
    { id_progress: 16, id_student: 1, id_lesson: 6, status: "in progress" },
    { id_progress: 17, id_student: 1, id_lesson: 7, status: "completed" },
    { id_progress: 18, id_student: 1, id_lesson: 8, status: "not started" },
    { id_progress: 19, id_student: 1, id_lesson: 9, status: "completed" },
    { id_progress: 20, id_student: 1, id_lesson: 10, status: "completed" },
];

// Bảng Lesson
const lessons = [
    { id_lesson: 1, name_lesson: "Basic English Grammar Rules", description: "Introduction to basic grammar", link_material: "https://www.youtube.com/embed/Wn_eBrIDUuc", order_lesson: 1, id_course: 1, type_lesson: "video lesson" },
    { id_lesson: 2, name_lesson: "Common English Phrases", description: "Learn frequently used phrases", link_material: "https://www.youtube.com/embed/d0wV9EC3t14", order_lesson: 2, id_course: 1, type_lesson: "video lesson" },
    { id_lesson: 3, name_lesson: "Listening Practice for Beginners", description: "Practice listening skills", link_material: "https://www.youtube.com/embed/sCiG6rlk2Bc", order_lesson: 3, id_course: 1, type_lesson: "quiz" },
    { id_lesson: 4, name_lesson: "Speaking Everyday English", description: "Build confidence in speaking", link_material: "https://www.youtube.com/embed/y2wgl5mH7zc", order_lesson: 4, id_course: 1, type_lesson: "video lesson" },
    { id_lesson: 5, name_lesson: "Expand Your English Vocabulary", description: "Grow your vocabulary", link_material: "https://www.youtube.com/embed/Wn_eBrIDUuc", order_lesson: 5, id_course: 1, type_lesson: "quiz" },
    { id_lesson: 6, name_lesson: "Techniques for Reading English", description: "Learn effective reading methods", link_material: "https://www.youtube.com/embed/d0wV9EC3t14", order_lesson: 6, id_course: 1, type_lesson: "video lesson" },
    { id_lesson: 7, name_lesson: "Basic English Writing Skills", description: "Master essential writing skills", link_material: "https://www.youtube.com/embed/sCiG6rlk2Bc", order_lesson: 7, id_course: 1, type_lesson: "video lesson" },
    { id_lesson: 8, name_lesson: "IELTS Listening Preparation", description: "Prepare for IELTS Listening", link_material: "https://www.youtube.com/embed/y2wgl5mH7zc", order_lesson: 8, id_course: 1, type_lesson: "quiz" },
    { id_lesson: 9, name_lesson: "Improve Speaking for TOEFL", description: "Enhance TOEFL speaking skills", link_material: "https://www.youtube.com/embed/Wn_eBrIDUuc", order_lesson: 9, id_course: 1, type_lesson: "video lesson" },
    { id_lesson: 10, name_lesson: "English for Business Communication", description: "Learn business English", link_material: "https://www.youtube.com/embed/d0wV9EC3t14", order_lesson: 10, id_course: 1, type_lesson: "quiz" },

    { id_lesson: 16, name_lesson: "Foundations of Reading", description: "Develop basic reading comprehension skills", link_material: "https://www.youtube.com/embed/sCiG6rlk2Bc", order_lesson: 7, id_course: 1, type_lesson: "quiz" },
    { id_lesson: 17, name_lesson: "Listening Practice Basics", description: "Improve your basic listening ability", link_material: "https://www.youtube.com/embed/y2wgl5mH7zc", order_lesson: 8, id_course: 1, type_lesson: "quiz" },
    { id_lesson: 18, name_lesson: "Speaking Essentials", description: "Learn key techniques to speak fluently", link_material: "https://www.youtube.com/embed/Wn_eBrIDUuc", order_lesson: 9, id_course: 1, type_lesson: "quiz" },
    { id_lesson: 19, name_lesson: "Writing Fundamentals", description: "Master basic writing structures", link_material: "https://www.youtube.com/embed/d0wV9EC3t14", order_lesson: 10, id_course: 1, type_lesson: "quiz" },

    // Lesson for Entry Test (description updated for the last 5 lessons)
    { id_lesson: 11, name_lesson: "Reading Skill Assessment", description: "Evaluate your reading skills", link_material: "", order_lesson: 1, id_course: 0, type_lesson: "quiz" },
    { id_lesson: 12, name_lesson: "Listening Skill Test", description: "Assess your listening ability", link_material: "", order_lesson: 2, id_course: 0, type_lesson: "quiz" },
    { id_lesson: 13, name_lesson: "Writing Proficiency Test", description: "Test your writing skills", link_material: "", order_lesson: 3, id_course: 0, type_lesson: "quiz" },
    { id_lesson: 14, name_lesson: "Speaking Fluency Assessment", description: "Check your speaking fluency", link_material: "", order_lesson: 4, id_course: 0, type_lesson: "quiz" },
    { id_lesson: 15, name_lesson: "Guide to Choosing a Course", description: "How to select a course", link_material: "https://www.youtube.com/embed/zhpcgpqWc1Q", order_lesson: 4, id_course: 0, type_lesson: "video lesson" },
];


// Bảng Quiz
const quizzes = [
    { id_quiz: 1, name_quiz: "Basic English Reading Quiz", id_lesson: 1, score: 10, type_quiz: "Reading" },
    { id_quiz: 2, name_quiz: "English Vocabulary Listening Quiz", id_lesson: 2, score: 10, type_quiz: "Listening" },
    { id_quiz: 3, name_quiz: "English Grammar Writing Quiz", id_lesson: 3, score: 15, type_quiz: "Listening" },
    { id_quiz: 4, name_quiz: "Daily Conversations Speaking Quiz", id_lesson: 4, score: 20, type_quiz: "Speaking" },
    { id_quiz: 5, name_quiz: "Intermediate Reading Comprehension Quiz", id_lesson: 5, score: 15, type_quiz: "Reading" },
    { id_quiz: 6, name_quiz: "English Listening Practice Quiz", id_lesson: 6, score: 20, type_quiz: "Listening" },
    { id_quiz: 7, name_quiz: "English Pronunciation Speaking Quiz", id_lesson: 7, score: 25, type_quiz: "Speaking" },
    { id_quiz: 8, name_quiz: "Writing Formal Letters Quiz", id_lesson: 8, score: 15, type_quiz: "Writing" },
    { id_quiz: 9, name_quiz: "Short Stories Reading Quiz", id_lesson: 9, score: 10, type_quiz: "Reading" },
    { id_quiz: 10, name_quiz: "Travel Conversations Speaking Quiz", id_lesson: 10, score: 20, type_quiz: "Speaking" },

    { id_quiz: 16, name_quiz: "English Listening Practice Quiz", id_lesson: 16, score: 20, type_quiz: "Listening" },
    { id_quiz: 17, name_quiz: "English Pronunciation Speaking Quiz", id_lesson: 17, score: 25, type_quiz: "Speaking" },
    { id_quiz: 18, name_quiz: "Writing Formal Letters Quiz", id_lesson: 18, score: 15, type_quiz: "Writing" },
    { id_quiz: 19, name_quiz: "Short Stories Reading Quiz", id_lesson: 19, score: 10, type_quiz: "Reading" },

    { id_quiz: 11, name_quiz: "English Entry Test - Listening", id_lesson: 11, score: 10, type_quiz: "Listening" },
    { id_quiz: 12, name_quiz: "English Entry Test - Reading", id_lesson: 12, score: 10, type_quiz: "Reading" },
    { id_quiz: 13, name_quiz: "English Entry Test - Speaking", id_lesson: 13, score: 10, type_quiz: "Speaking" },
    { id_quiz: 14, name_quiz: "English Entry Test - Writing", id_lesson: 14, score: 10, type_quiz: "Writing" },
];

// Dữ liệu cho bảng Question
const questions = [
    { id_question: 1, id_quiz: 3, question: "Where is the nearest train station?", link_mp3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', link_image: null, options: ["It’s about 10 minutes from here", "I took the train yesterday", "Yes, it’s very convenient", "Rome"], answer: "It’s about 10 minutes from here", scale: 5, interpret: "Geography question", type_question: "listening" },
    { id_question: 2, id_quiz: 5, question: "The new policy will take effect next month, and all employees are required to _______ the updated guidelines.", link_mp3: null, link_image: null, options: ["follow", "follows", "following", "followed"], answer: "follow", scale: 4, interpret: "Astronomy question", type_question: "reading" },
    { id_question: 3, id_quiz: 8, question: "Describe a city you would like to visit", link_mp3: null, link_image: null, options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], answer: "Shakespeare", scale: 5, interpret: "Literature question", type_question: "writing" },
    { id_question: 4, id_quiz: 5, question: "What is the largest mammal on Earth?", link_mp3: null, link_image: null, options: ["Elephant", "Whale", "Shark", "Giraffe"], answer: "Whale", scale: 5, interpret: "Biology question", type_question: "reading" },
    { id_question: 5, id_quiz: 8, question: "Some people think that learning a second language should be compulsory in schools. Do you agree or disagree?", link_mp3: null, link_image: null, options: ["5", "6", "7", "8"], answer: "8", scale: 5, interpret: "Math question", type_question: "writing" },
    { id_question: 6, id_quiz: 5, question: "Who painted the Mona Lisa?", link_mp3: null, link_image: null, options: ["Van Gogh", "Da Vinci", "Picasso", "Dali"], answer: "Da Vinci", scale: 5, interpret: "Art question", type_question: "reading" },
    { id_question: 7, id_quiz: 5, question: "What is the smallest continent?", link_mp3: null, link_image: null, options: ["Asia", "Australia", "Africa", "Europe"], answer: "Australia", scale: 4, interpret: "Geography question", type_question: "reading" },
    { id_question: 8, id_quiz: 8, question: "Which of the following is a primary color?", link_mp3: null, link_image: null, options: ["Green", "Purple", "Blue", "Pink"], answer: "Blue", scale: 3, interpret: "Art question", type_question: "writing" },
    { id_question: 9, id_quiz: 10, question: "Which country is known as the Land of the Rising Sun?", link_mp3: null, link_image: null, options: ["China", "Japan", "South Korea", "India"], answer: "Japan", scale: 4, interpret: "Geography question", type_question: "speaking" },
    { id_question: 10, id_quiz: 10, question: "Who will be leading the meeting tomorrow?", link_mp3: null, link_image: null, options: ["China", "Japan", "South Korea", "India"], answer: "Japan", scale: 4, interpret: "Geography question", type_question: "speaking" },
    { id_question: 11, id_quiz: 5, question: "The company has decided to _______ its marketing strategy to attract more customers in the younger demographic.", link_mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", link_image: "https://example.com/images/question19.jpg", options: ["revise", "revising", "revision", "revised"], answer: "revise", scale: 3, interpret: "Economics question", type_question: "reading" },
    { id_question: 10, id_quiz: 3, question: "Who will be leading the meeting tomorrow?", link_mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", link_image: null, options: ["China", "Japan", "South Korea", "India"], answer: "Japan", scale: 4, interpret: "Geography question", type_question: "listening" },


    // Question for Entry Test
    { id_question: 11, id_quiz: 11, question: "What is the capital of France?", link_mp3: null, link_image: null, options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris", scale: 5, interpret: "Geography question", type_question: "reading" },
    { id_question: 12, id_quiz: 11, question: "Which planet is known as the Red Planet?", link_mp3: null, link_image: null, options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars", scale: 4, interpret: "Astronomy question", type_question: "reading" },
    { id_question: 13, id_quiz: 13, question: "Describe a city you would like to visit", link_mp3: null, link_image: null, options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], answer: "Shakespeare", scale: 5, interpret: "Literature question", type_question: "writing" },
    { id_question: 14, id_quiz: 11, question: "What is the largest mammal on Earth?", link_mp3: null, link_image: null, options: ["Elephant", "Whale", "Shark", "Giraffe"], answer: "Whale", scale: 5, interpret: "Biology question", type_question: "reading" },
    { id_question: 15, id_quiz: 13, question: "Some people think that learning a second language should be compulsory in schools. Do you agree or disagree?", link_mp3: null, link_image: null, options: ["5", "6", "7", "8"], answer: "8", scale: 5, interpret: "Math question", type_question: "writing" },
    { id_question: 16, id_quiz: 11, question: "Who painted the Mona Lisa?", link_mp3: null, link_image: null, options: ["Van Gogh", "Da Vinci", "Picasso", "Dali"], answer: "Da Vinci", scale: 5, interpret: "Art question", type_question: "reading" },
    { id_question: 17, id_quiz: 11, question: "What is the smallest continent?", link_mp3: null, link_image: null, options: ["Asia", "Australia", "Africa", "Europe"], answer: "Australia", scale: 4, interpret: "Geography question", type_question: "reading" },
    { id_question: 18, id_quiz: 13, question: "Which of the following is a primary color?", link_mp3: null, link_image: null, options: ["Green", "Purple", "Blue", "Pink"], answer: "Blue", scale: 3, interpret: "Art question", type_question: "writing" },
    { id_question: 19, id_quiz: 14, question: "Which country is known as the Land of the Rising Sun?", link_mp3: null, link_image: null, options: ["China", "Japan", "South Korea", "India"], answer: "Japan", scale: 4, interpret: "Geography question", type_question: "speaking" },
    { id_question: 20, id_quiz: 12, question: "Talk about your favorite hobby", link_mp3: "https://example.com/audio/question19.mp3", link_image: "https://example.com/images/question19.jpg", options: ["Euro", "Pound Sterling", "Dollar", "Yen"], answer: "Pound Sterling", scale: 3, interpret: "Economics question", type_question: "listening" },


    { id_question: 21, id_quiz: 19, question: "What is the capital of France?", link_mp3: null, link_image: null, options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris", scale: 5, interpret: "Geography question", type_question: "reading" },
    { id_question: 22, id_quiz: 19, question: "Which planet is known as the Red Planet?", link_mp3: null, link_image: null, options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars", scale: 4, interpret: "Astronomy question", type_question: "reading" },
    { id_question: 23, id_quiz: 17, question: "Describe a city you would like to visit", link_mp3: null, link_image: null, options: ["Shakespeare", "Dickens", "Hemingway", "Austen"], answer: "Shakespeare", scale: 5, interpret: "Literature question", type_question: "writing" },
    { id_question: 24, id_quiz: 19, question: "What is the largest mammal on Earth?", link_mp3: null, link_image: null, options: ["Elephant", "Whale", "Shark", "Giraffe"], answer: "Whale", scale: 5, interpret: "Biology question", type_question: "reading" },
    { id_question: 25, id_quiz: 18, question: "Some people think that learning a second language should be compulsory in schools. Do you agree or disagree?", link_mp3: null, link_image: null, options: ["5", "6", "7", "8"], answer: "8", scale: 5, interpret: "Math question", type_question: "writing" },
    { id_question: 26, id_quiz: 19, question: "Who painted the Mona Lisa?", link_mp3: null, link_image: null, options: ["Van Gogh", "Da Vinci", "Picasso", "Dali"], answer: "Da Vinci", scale: 5, interpret: "Art question", type_question: "reading" },
    { id_question: 27, id_quiz: 19, question: "What is the smallest continent?", link_mp3: null, link_image: null, options: ["Asia", "Australia", "Africa", "Europe"], answer: "Australia", scale: 4, interpret: "Geography question", type_question: "reading" },
    { id_question: 28, id_quiz: 18, question: "Which of the following is a primary color?", link_mp3: null, link_image: null, options: ["Green", "Purple", "Blue", "Pink"], answer: "Blue", scale: 3, interpret: "Art question", type_question: "writing" },
    { id_question: 29, id_quiz: 16, question: "Which country is known as the Land of the Rising Sun?", link_mp3: null, link_image: null, options: ["China", "Japan", "South Korea", "India"], answer: "Japan", scale: 4, interpret: "Geography question", type_question: "speaking" },
    { id_question: 30, id_quiz: 16, question: "Who will be leading the meeting tomorrow?", link_mp3: null, link_image: null, options: ["At 3:00 PM", "Mr. Johnson will", "In the main conference room", "India"], answer: "Mr. Johnson will", scale: 4, interpret: "Geography question", type_question: "speaking" },
    { id_question: 31, id_quiz: 17, question: "Talk about your favorite hobby", link_mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", link_image: "https://example.com/images/question19.jpg", options: ["Euro", "Pound Sterling", "Dollar", "Yen"], answer: "Pound Sterling", scale: 3, interpret: "Economics question", type_question: "listening" },
];

const results = [
    { id_result: 1, id_student: 1, id_quiz: 1, score: 85 },
    { id_result: 2, id_student: 2, id_quiz: 2, score: 90 },
    { id_result: 3, id_student: 1, id_quiz: 3, score: 50 },
    { id_result: 4, id_student: 2, id_quiz: 4, score: 88 },
    { id_result: 5, id_student: 1, id_quiz: 5, score: 92 },
    { id_result: 6, id_student: 2, id_quiz: 6, score: 75 },
    { id_result: 7, id_student: 1, id_quiz: 7, score: 80 },
    { id_result: 8, id_student: 1, id_quiz: 8, score: 89 },
    { id_result: 9, id_student: 1, id_quiz: 9, score: 77 },
    { id_result: 10, id_student: 1, id_quiz: 10, score: 91 }
  ];

const responses = [
    { id_response: 1, id_student: 1, id_question: 1, link_mp3: null, link_image: null, response: "Paris", score: 5, comment: "Correct answer" },
    { id_response: 2, id_student: 1, id_question: 2, link_mp3: null, link_image: null, response: "follow", score: 0, comment: "Incorrect answer" },
    { id_response: 3, id_student: 1, id_question: 3, link_mp3: null, link_image: null, response: "Shakespeare", score: 5, comment: "Correct answer" },
    { id_response: 4, id_student: 1, id_question: 4, link_mp3: null, link_image: null, response: "Giraffe", score: 2, comment: "Partially correct" },
    { id_response: 5, id_student: 1, id_question: 7, link_mp3: null, link_image: null, response: "Australia", score: 5, comment: "Correct answer" },
    { id_response: 6, id_student: 1, id_question: 6, link_mp3: null, link_image: null, response: "Da Vinci", score: 5, comment: "Correct answer" },
    { id_response: 7, id_student: 1, id_question: 11, link_mp3: null, link_image: null, response: "Pound Sterling", score: 5, comment: "Correct answer" },
    { id_response: 8, id_student: 1, id_question: 4, link_mp3: null, link_image: null, response: "text", score: 0, comment: "Incorrect answer" },
    { id_response: 9, id_student: 1, id_question: 5, link_mp3: null, link_image: null, response: "text", score: 5, comment: "Correct answer" },
    { id_response: 10, id_student: 1, id_question: 5, link_mp3: null, link_image: null, response: "text", score: 5, comment: "Correct answer" },
    { id_response: 11, id_student: 1, id_question: 6, link_mp3: null, link_image: null, response: "text", score: 5, comment: "Correct answer" },
    { id_response: 12, id_student: 1, id_question: 6, link_mp3: null, link_image: null, response: "text", score: 3, comment: "Partially correct" },
    { id_response: 13, id_student: 1, id_question: 7, link_mp3: null, link_image: null, response: "text", score: 5, comment: "Correct answer" },
    { id_response: 14, id_student: 1, id_question: 7, link_mp3: null, link_image: null, response: "text", score: 5, comment: "Correct answer" },
    { id_response: 15, id_student: 1, id_question: 8, link_mp3: null, link_image: null, response: "text", score: 5, comment: "Correct answer" },
    { id_response: 16, id_student: 1, id_question: 8, link_mp3: null, link_image: null, response: "text", score: 4, comment: "Correct, but incomplete" },
    { id_response: 17, id_student: 1, id_question: 9, link_mp3: null, link_image: null, response: "text", score: 5, comment: "Correct answer" },
    { id_response: 18, id_student: 1, id_question: 9, link_mp3: null, link_image: null, response: "text", score: 0, comment: "Incorrect answer" },
    { id_response: 19, id_student: 1, id_question: 10, link_mp3: null, link_image: null, response: "South Korea", score: 5, comment: "Correct answer" },
    { id_response: 20, id_student: 1, id_question: 20, link_mp3: null, link_image: null, response: "text", score: 4, comment: "Almost correct" }
];


const StudentContextProvider = (props) => {

    const contextValue = {
        users, students, lecturers, courses, myCourses,
        comments, progress, lessons, quizzes, questions, responses,
        results
    };

    return (
        <StudentContext.Provider value={contextValue}>
            {props.children}
        </StudentContext.Provider>
    )
}
export { StudentContext };
export default StudentContextProvider;