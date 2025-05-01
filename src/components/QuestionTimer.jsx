export default function QuestionTimer({ timeout, onTimeout }) {
  setTimeout(onTimeout, timeout);

  return <progress id="question-time" />;
}
