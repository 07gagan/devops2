let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const timeEl = document.getElementById("time");

function startGame() {
  shuffle(questions);
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  let shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
  shuffledOptions.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectOption(option);
    optionsEl.appendChild(li);
  });
}

function resetState() {
  clearInterval(timer);
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  timeLeft = 15;
  timeEl.textContent = timeLeft;
}

function selectOption(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) score++;

  clearInterval(timer);
  currentQuestion++;
  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
};

function endGame() {
  document.getElementById("question-box").style.display = "none";
  scoreBox.classList.remove("hidden");
  scoreText.textContent = `${score} / ${questions.length}`;

  let high = localStorage.getItem("highScore") || 0;
  if (score > high) {
    localStorage.setItem("highScore", score);
    high = score;
  }
  highScoreEl.textContent = high;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        endGame();
      }
    }
  }, 1000);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

startGame();
