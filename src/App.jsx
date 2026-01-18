import { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Tool Markup Language",
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks Text Mark Language"
    ],
    correctAnswer: 1
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correctAnswer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correctAnswer: 3
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useRef", "useState", "useContext"],
    correctAnswer: 2
  },
  {
    question: "Which symbol is used for JSX expressions?",
    options: ["()", "{}", "[]", "<>"],
    correctAnswer: 1
  }
];

function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    });
  };

  const handleSubmit = () => {
    let finalScore = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        finalScore++;
      }
    });

    setScore(finalScore);
    setSubmitted(true);
  };

  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setSubmitted(false);
  };

  return (
    <div className="container">
      <h1> Quiz Application</h1>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-card">
          <h3>
            {qIndex + 1}. {q.question}
          </h3>

          {q.options.map((option, oIndex) => (
            <label key={oIndex} className="option">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={oIndex}
                checked={answers[qIndex] === oIndex}
                onChange={() => handleChange(qIndex, oIndex)}
                disabled={submitted}
              />
              {option}
            </label>
          ))}

          {submitted && (
            <p className={answers[qIndex] === q.correctAnswer ? "correct" : "wrong"}>
              {answers[qIndex] === q.correctAnswer
                ? "✔ Correct"
                : `✘ Correct Answer: ${q.options[q.correctAnswer]}`}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="result">
          <h2> Result</h2>
          <p>
            Your Score: <strong>{score}</strong> / {questions.length}
          </p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;
