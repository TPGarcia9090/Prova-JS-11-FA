const questions = [
    'Quem gritou "Independência ou Morte"?',
    "Qual é a capital da França?",
    "Qual é o maior planeta do nosso sistema solar?",
    "Qual é a atual capital do Brasil?"
];

const options = [
    ["Dom Pedro II", "Tiririca", "Dom Pedro I", "Zacarias"],
    ["Londres", "Paris", "Berlim", "Madrid"],
    ["Vênus", "Marte", "Júpiter", "Saturno"],
    ["Salvador", "Rio de Janeiro", "São Paulo", "Brasília"]
];

const correctAnswers = [2, 1, 2, 3];

let shuffledIndexes = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsButtons = document.querySelectorAll(".alternative");
const statusAnswer = document.getElementById("statusAnswer");
const reloadButton = document.getElementById("reload");
const quizPage = document.getElementById("quizPage");
const scorePage = document.getElementById("scorePage");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restart");

function shuffleQuestions() {
    shuffledIndexes = Array.from({ length: questions.length }, (_, i) => i);
    for (let i = shuffledIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndexes[i], shuffledIndexes[j]] = [shuffledIndexes[j], shuffledIndexes[i]];
    }
}

function loadQuestion() {
    const questionIndex = shuffledIndexes[currentQuestionIndex];
    questionElement.innerHTML = questions[questionIndex];
    optionsButtons.forEach((button, index) => {
        button.textContent = options[questionIndex][index];
        button.disabled = false;
    });
    statusAnswer.innerHTML = "";
    reloadButton.style.display = "none";
}

optionsButtons.forEach(button => {
    button.addEventListener("click", () => {
        checkAnswer(button.value);
        optionsButtons.forEach(btn => btn.disabled = true);
    });
});

function checkAnswer(answer) {
    const questionIndex = shuffledIndexes[currentQuestionIndex];
    answer = parseInt(answer);
    if (answer === correctAnswers[questionIndex]) {
        statusAnswer.style.color = "green";
        statusAnswer.innerHTML = "Acertou!!!";
        score++;
    } else {
        statusAnswer.style.color = "red";
        statusAnswer.innerHTML = `Errou! Resposta correta: ${options[questionIndex][correctAnswers[questionIndex]]}`;
    }
    reloadButton.style.display = "block";
}

reloadButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    quizPage.style.display = "none";
    scorePage.style.display = "block";
    finalScore.innerHTML = `Sua pontuação foi: ${score} de ${questions.length}!`;
}

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    shuffleQuestions();
    quizPage.style.display = "block";
    scorePage.style.display = "none";
    loadQuestion();
});

shuffleQuestions();
loadQuestion();