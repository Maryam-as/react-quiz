import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // set active question index based on how many answers the user has given
  const activeQuestionIndex = userAnswers.length;

  return (
    <div id="question">
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
          <li key={answer} className="answer">
            <button>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
