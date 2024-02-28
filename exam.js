let timeControl = document.querySelector(".time-control");
let question = document.querySelector(".question-title");
let answers = Array.from(document.querySelectorAll(".answer"));
let startBtn = document.querySelector(".start-btn");
let nextQuestionBtn = document.querySelector(".next-question");
let lastQuestionBtn = document.querySelector(".last-question");
let submitBtn = document.querySelector(".submit");
let examPage = document.querySelector(".exam");
let resultPage = document.querySelector(".exam-result");

let selectedAnswers = [];
let currentQuestionIndex = 0;
let quizStarted = false;
let countdownInterval;

let questionsAndAnswers = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
    photoUrl: "",
  },
  // Add more questions as needed
];

nextQuestionBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questionsAndAnswers.length) {
    displayQuestion();
  } else {
    nextQuestionBtn.style.display = "none";
    submitBtn.style.display = "block";
  }
});

lastQuestionBtn.addEventListener("click", () => {
  currentQuestionIndex--;

  if (currentQuestionIndex >= 0) {
    displayQuestion();
  } else {
  }
});

function displayQuestion() {
  const currentQuestion = questionsAndAnswers[currentQuestionIndex];
  question.innerHTML = currentQuestion.question;

  // Check if there is a photo URL in the question
  if (currentQuestion.photoUrl) {
    // Assuming you have a container with the class "photo-container" in your HTML
    const photoContainer = document.querySelector(".images");

    // Create an image element
    const imageElement = document.createElement("img");
    imageElement.src = currentQuestion.photoUrl;
    imageElement.alt = "Question Photo";

    // Append the image element to the container
    photoContainer.innerHTML = ""; // Clear previous content
    photoContainer.appendChild(imageElement);
  }
  resetAnswerStyles();

  for (let i = 0; i < answers.length; i++) {
    answers[i].innerHTML = currentQuestion.options[i];

    answers[i].addEventListener("click", function () {
      selectedAnswers[currentQuestionIndex] = {
        answer: currentQuestion.options[i],
        index: i,
      };
      resetAnswerStyles();
      this.classList.add("choosed");
    });

    if (
      selectedAnswers[currentQuestionIndex] &&
      selectedAnswers[currentQuestionIndex].answer ===
        currentQuestion.options[i]
    ) {
      answers[i].classList.add("choosed");
    }
  }
}

submitBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  examPage.style.display = "none";
  resultPage.style.display = "block";
  showResult();
});

function startQuiz() {
  displayQuestion();

  const countdownDuration = 45;
  const endTime = new Date().getTime() + countdownDuration * 60 * 1000;
  countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const ending = endTime - now;

    const minutes = Math.floor((ending % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ending % (1000 * 60)) / 1000);

    document.querySelector(".time").innerHTML = `${minutes}m ${seconds}s`;
    if (ending < 0) {
      clearInterval(countdownInterval);
      document.querySelector(".time").innerHTML = "EXPIRED!";
    }
  }, 1000);
}

window.onload = () => {
  if (!quizStarted) {
    quizStarted = true;
    startQuiz();
  }
};

function resetAnswerStyles() {
  answers.forEach((answer) => answer.classList.remove("choosed"));
}

function showResult() {
  const resultContainer = document.querySelector(".result");
  const degreeContainer = document.querySelector(".degree");
  resultContainer.innerHTML = "";
  let correctAnswersCount = 0;

  for (let i = 0; i < questionsAndAnswers.length; i++) {
    const currentQuestion = questionsAndAnswers[i];
    const resultElement = document.createElement("p");

    if (
      selectedAnswers[i] &&
      selectedAnswers[i].answer === currentQuestion.correctAnswer
    ) {
      resultElement.textContent = `Question ${i + 1}: Correct`;
      resultElement.classList.add("correct-answer");
      correctAnswersCount++;
    } else {
      resultElement.textContent = `Question ${i + 1}: Wrong`;
      resultElement.classList.add("wrong-answer");
    }
    resultContainer.appendChild(resultElement);
  }
  let studentDegree = document.createElement("span");
  studentDegree.classList.add("student-degree");
  studentDegree.innerHTML = `${correctAnswersCount} / `;

  let examDegree = document.createElement("span");
  examDegree.classList.add("exam-degree");
  examDegree.innerHTML = questionsAndAnswers.length;

  degreeContainer.appendChild(studentDegree);
  degreeContainer.appendChild(examDegree);
}
