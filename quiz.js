const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Kolkata", correct: false },
      { text: "Chennai", correct: false },
    ],
  },
  {
    question: "Who is known as the Father of the Nation in India?",
    answers: [
      { text: "Subhas Chandra Bose", correct: false },
      { text: "Bhagat Singh", correct: false },
      { text: "Mahatma Gandhi", correct: true },
      { text: "Jawaharlal Nehru", correct: false },
    ],
  },
  {
    question: "Which is the national flower of India?",
    answers: [
      { text: "Rose", correct: false },
      { text: "Lotus", correct: true },
      { text: "Sunflower", correct: false },
      { text: "Lily", correct: false },
    ],
  },
  {
    question: "Which Indian city is called the Silicon Valley of India?",
    answers: [
      { text: "Hyderabad", correct: false },
      { text: "Bengaluru", correct: true },
      { text: "Pune", correct: false },
      { text: "Gurugram", correct: false },
    ],
  },
  {
    question: "Who was the first Prime Minister of India?",
    answers: [
      { text: "Mahatma Gandhi", correct: false },
      { text: "Jawaharlal Nehru", correct: true },
      { text: "Sardar Vallabhbhai Patel", correct: false },
      { text: "Rajendra Prasad", correct: false },
    ],
  },
  {
    question: "Which is the national animal of India?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Bengal Tiger", correct: true },
      { text: "Lion", correct: false },
      { text: "Leopard", correct: false },
    ],
  },
  {
    question: "In which year did India gain independence?",
    answers: [
      { text: "1942", correct: false },
      { text: "1945", correct: false },
      { text: "1947", correct: true },
      { text: "1950", correct: false },
    ],
  },
  {
    question: "Which is the national sport of India?",
    answers: [
      { text: "Cricket", correct: false },
      { text: "Hockey", correct: true },
      { text: "Kabaddi", correct: false },
      { text: "Football", correct: false },
    ],
  },
  {
    question: "Who wrote the Indian National Anthem?",
    answers: [
      { text: "Rabindranath Tagore", correct: true },
      { text: "Bankim Chandra Chatterjee", correct: false },
      { text: "Sarojini Naidu", correct: false },
      { text: "Mahatma Gandhi", correct: false },
    ],
  },
  {
    question: "Which is the largest state in India by area?",
    answers: [
      { text: "Maharashtra", correct: false },
      { text: "Rajasthan", correct: true },
      { text: "Madhya Pradesh", correct: false },
      { text: "Uttar Pradesh", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next Question";
  scoreElement.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.addEventListener("click", () =>
      selectAnswer(button, answer.correct)
    );
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(selectedButton, correct) {
  Array.from(answerButtons.children).forEach((button) => {
    const answerText = button.innerHTML;
    const answer = questions[currentQuestionIndex].answers.find(
      (a) => a.text === answerText
    );
    if (answer.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });

  if (correct) {
    score++;
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  scoreElement.style.display = "block";
  scoreElement.innerHTML = `Your Score: ${score} / ${questions.length}`;
  nextButton.innerHTML = "Restart Quiz";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz, { once: true });
}

startQuiz();
