// import { useState } from "react";
//
// const Quiz = ({ quizData }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [userAnswers, setUserAnswers] = useState(
//     Array(quizData.length).fill(null),
//   );
//   const [showScore, setShowScore] = useState(false);
//
//   const handleAnswerClick = (answerIndex: number) => {
//     const newAnswers = [...userAnswers];
//     newAnswers[currentQuestion] = answerIndex;
//     setUserAnswers(newAnswers);
//   };
//
//   const handleNextQuestion = () => {
//     setCurrentQuestion(currentQuestion + 1);
//   };
//
//   const handleFinishQuiz = () => {
//     setShowScore(true);
//   };
//
//   const calculateScore = () => {
//     const correctAnswers = quizData.reduce((total, question, index) => {
//       return total + (question.correctIndex === userAnswers[index] ? 1 : 0);
//     }, 0);
//     return Math.round((correctAnswers / quizData.length) * 100);
//   };
//
//   return (
//     <div>
//       {showScore ? (
//         <div>
//           <h2>Your Score: {calculateScore()}%</h2>
//           <button onClick={() => setShowScore(false)}>Retry</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Question {currentQuestion + 1}</h2>
//           <h3>{quizData[currentQuestion].question}</h3>
//           <ul>
//             {quizData[currentQuestion].options.map((option, index) => (
//               <li key={index} onClick={() => handleAnswerClick(index)}>
//                 {option}
//               </li>
//             ))}
//           </ul>
//           {currentQuestion < quizData.length - 1 ? (
//             <button onClick={handleNextQuestion}>Next</button>
//           ) : (
//             <button onClick={handleFinishQuiz}>Finish</button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default Quiz;
