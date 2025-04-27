import { useState } from "react";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  // set active question index based on how many answers the user has given
  const activeQuestionIndex = userAnswers.length;

  return <p>Currently active Question</p>;
}
