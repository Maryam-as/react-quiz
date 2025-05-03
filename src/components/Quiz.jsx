import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  // check if all questions have been answered (i.e., quiz is complete)
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  // memoize handleSelectAnswer to maintain referential stability,
  // ensuring dependent callbacks like handleSkipAnswer don't change unnecessarily.
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  // memoize the skip handler to prevent recreation on every render,
  // avoiding unnecessary resets of the QuestionTimer's timeout effect.
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // render the "Quiz Completed" message with a trophy icon when the quiz is finished
  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
