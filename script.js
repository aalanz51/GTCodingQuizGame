

var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

var questionsEl = document.querySelector(".all-question");
let questionEl = document.querySelector("#question");
let questionCount = 0;


let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


const questions = [ 
    {
        question: "What can an array be?",
        answers: ["1. Numbers", "2. Letters", "3. Both", "4. Neither"],
        correctAnswer: "2"
    },
    {
        question: " _______ is language used for more functional operations.",
        answers: ["1. Javascript", "2. HTML", "3. CSS", "4. Python"],
        correctAnswer: "0"
    },
    {
        question: "A booleans true or false?",
        answers: ["1. True", "2. False", "3. Neither", "4. Trick Question"],
        correctAnswer: "3"
    },
    {
        question: "What does a for loop do?",
        answers: ["1. Deconstructs code", "2. Cycles through data", "3. Acts as a server", "4. Requests and submits"],
        correctAnswer: "1"
    },
    {
        question: "We use ________ as a conatiner for functions.",
        answers: ["1. Parenthesis", "2. Quotations", "3. Curly brackets", "4. Semi-colons"],
        correctAnswer: "2"
    }
];

const begin = document.querySelector("#begin");

const challengeBegins = document.querySelector("#challenge-begins");

function beginQuiz() {
    challengeBegins.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        answer1.textContent = questions[id].answers[0];
        answer2.textContent = questions[id].answers[1];
        answer3.textContent = questions[id].answers[2];
        answer4.textContent = questions[id].answers[3];
    }
}

const ansBtn = document.querySelectorAll("button.answer-btn")

const answer1 = document.querySelector("#answer-1");
const answer2 = document.querySelector("#answer-2");
const answer3 = document.querySelector("#answer-3");
const answer4 = document.querySelector("#answer-4");

const correctWrong = document.querySelector("#right-wrong");

function checkAnswer(event) {
    event.preventDefault();

   
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);


    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Right!";
    } 
   
   
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

const finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");


const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

begin.addEventListener("click", beginQuiz);

ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    challengeBegins.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);

viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("No high scores at this time!");
    }
});

