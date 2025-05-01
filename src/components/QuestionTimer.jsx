import { useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  setTimeout(onTimeout, timeout);

  return <progress id="question-time" />;
}
