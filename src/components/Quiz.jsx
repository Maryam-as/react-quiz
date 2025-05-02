import { useCallback, useEffect, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  // determine the index of the currently active question.
  // if no answer is being processed (`answerState === ""`), use the number of user answers submitted.
  // if an answer is being shown with feedback, subtract 1 to keep showing the same question during the delay.
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  // check if all questions have been answered (i.e., quiz is complete)
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  // memoize handleSelectAnswer to maintain referential stability,
  // ensuring dependent callbacks like handleSkipAnswer don't change unnecessarily.
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered"); // show as selected
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
      // delay evaluation of the selected answer by 1 second to allow for a visual feedback pause.
      // after the delay, update the answerState to "correct" or "wrong" based on whether the selected
      // answer matches the first item in the answer list (since it is the correct answer).
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        // after showing feedback for 2 seconds, reset answerState to "" to trigger transition to the next question
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

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
