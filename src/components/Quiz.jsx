import { useCallback, useEffect, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // set active question index based on how many answers the user has given
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

  // create a shuffled copy of the current question's answers
  // to randomize the order each time they are displayed
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        {/* provide a key based on the active question index to force React to
        remount the QuestionTimer component whenever the question changes,
        ensuring that its internal timer state resets correctly with each new
        question. */}
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={30000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
