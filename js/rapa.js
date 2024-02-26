let currentQuestion = 0; // تعيين السؤال الحالي
const totalQuestions = 3; // عدد الأسئلة الكلي
let answers = []; // مصفوفة لتخزين الإجابات
let timeInterval; // متغير لتخزين المؤقت
let timeLeft; // تخزين الوقت المتبقي

// عرض السؤال الأول
function nextQuestion() {
  displayQuestion(); // عرض السؤال الحالي
}

// إضافة زر السابق
const backButton = document.getElementById("back");
backButton.addEventListener("click", () => {
  currentQuestion--; // العودة إلى السؤال السابق
  displayQuestion();
});

// إضافة زر التالي
const nextButton = document.getElementById("next");
nextButton.addEventListener("click", () => {
  if (currentQuestion === totalQuestions - 1) {
    // في حال كان السؤال الأخير
    nextButton.style.display = "none"; // إخفاء زر التالي
    document.getElementById("submit").style.display = "inline-block"; // عرض زر التسليم
  }
  currentQuestion++; // الانتقال إلى السؤال التالي
  displayQuestion();
});

// إضافة زر التسليم
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  clearInterval(timeInterval); // توقف الوقت عند الضغط على زر التسليم
  finishExam();
});

// عرض السؤال الحالي
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.querySelector(".choices");
  questionElement.textContent = questions[currentQuestion].question; // عرض السؤال

  // مسح الخيارات السابقة
  choicesElement.innerHTML = "";

  // عرض الخيارات
  questions[currentQuestion].choices.forEach((choice, index) => {
    const choiceElement = document.createElement("div");
    choiceElement.className = "choice";
    choiceElement.textContent = choice;
    choiceElement.addEventListener("click", () => {
      selectAnswer(index);
    });
    choicesElement.appendChild(choiceElement);
  });
}

// اختيار الإجابة
function selectAnswer(index) {
  answers[currentQuestion] = index; // حفظ الإجابة المختارة
}

// بدء الوقت
function startTimer() {
  timeLeft = 300; // 5 دقائق بالثواني
  displayTime(); // عرض الوقت الأولي

  timeInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timeInterval);
      finishExam();
    } else {
      displayTime();
    }
  }, 1000);
}

// عرض الوقت المتبقي
function displayTime() {
  const remainingTimeElement = document.getElementById("remaining-time");
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  remainingTimeElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// تنفيذ الامتحان
function startExam() {
  startTimer(); // بدء الوقت
  nextQuestion(); // عرض السؤال الأول
}

// إكمال الامتحان
function finishExam() {
  clearInterval(timeInterval); // توقف الوقت بعد الانتهاء من الامتحان
  let score = 0;
  answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      score++;
    }
  });
  const resultElement = document.getElementById("result");
  resultElement.textContent = `نتيجتك: ${score} من ${totalQuestions}`;
  resultElement.style.display = "block";
}

// أسئلة الامتحان
const questions = [
  {
    question: "ما هو عاصمة فرنسا؟",
    choices: ["لندن", "باريس", "برلين"],
    correctAnswer: 1
  },
  {
    question: "ما هو لون السماء؟",
    choices: ["أحمر", "أصفر", "أزرق"],
    correctAnswer: 2
  },
  {
    question: "ما هو عدد أيام الأسبوع؟",
    choices: ["5", "6", "7"],
    correctAnswer: 2
  },
];

// تنفيذ الامتحان عند تحميل الصفحة
window.onload = startExam;

// عدد الثواني في الامتحان
var totalSeconds = 5 * 60;
var secondsElapsed = 0;

function startExam() {
  // إظهار الوقت الباقي
  displayTime(totalSeconds - secondsElapsed);

  // تحديث الوقت كل ثانية
  var timer = setInterval(function() {
    secondsElapsed++;
    var remainingTime = totalSeconds - secondsElapsed;
    displayTime(remainingTime);
    if (remainingTime <= 0) {
      clearInterval(timer);
      submitExam();
    }
  }, 1000);
}

function displayTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  document.getElementById("time").innerHTML = "الوقت المتبقي: " + minutes + ":" + remainingSeconds;
}

function submitExam() {
  // احتساب نتيجة الامتحان
  var score = calculateScore();
  // عرض نتيجة الامتحان
  document.getElementById("result").style.display = "block";
  document.getElementById("result").innerHTML = "نتيجتك: " + score + " من 5";
}

function calculateScore() {
  // هنا يمكنك احتساب نتيجة الامتحان بناءً على إجابات الطالب
  // لهذا المثال، سنعين نتيجة عشوائية
  return Math.floor(Math.random() * 6); // النتيجة تتراوح بين 0 و 5
}


// اختيار الإجابة
function selectAnswer(index) {
  answers[currentQuestion] = index; // حفظ الإجابة المختارة
  saveAnswersToLocalStorage(); // حفظ الإجابات في Local Storage
}

// حفظ الإجابات في Local Storage
function saveAnswersToLocalStorage() {
  localStorage.setItem('answers', JSON.stringify(answers));
}


