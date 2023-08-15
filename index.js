const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");
const resultDiv = document.querySelector(".result");
const image = document.querySelector(".image");
const resultText = document.getElementById("acknowledgement");

//creating an array of questions objects
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest continent of the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Europe", correct: false},
            {text: "Australia", correct: true},
            {text: "Antartica", correct: false}
        ]
    },
    {
        question: "Hitler party which came into power in 1933 is known as",
        answers: [
            {text: "Labour Party", correct: false},
            {text: "Nazi Party", correct: true},
            {text: "Ku-Klux-Klan", correct: false},
            {text: "Democratic Party", correct: false}
        ]
    },
    {
        question: "The ozone layer restricts",
        answers: [
            {text: "Visible light", correct: false},
            {text: "Infrared radiation", correct: false},
            {text: "X-rays and gamma rays", correct: false},
            {text: "Ultraviolet radiation", correct: true}
        ]
    },
    {
        question: "Which one is the smallest ocean in the World?",
        answers: [
            {text: "Indian", correct: false},
            {text: "Pacific", correct: false},
            {text: "Atlantic", correct: false},
            {text: "Arctic", correct: true}
        ]
    }
];

let questionIndex = 0;
let score = 0;

function start(){
    questionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex+1;

    //adding the question number to the question
    questionEl.innerText = questionNo+". "+currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const buttonEl = document.createElement("button");
        buttonEl.classList.add("btn");
        buttonEl.innerText = answer.text;
        answerButtons.append(buttonEl);

        if (answer.correct) {
            buttonEl.dataset.correct = answer.correct;
        } else {
            buttonEl.dataset.correct = answer.correct;
        }
        buttonEl.addEventListener("click", (e) => {
            const selectedBtn = e.target;
            if (answer.correct) {
                resultText.textContent = "Correct";
                image.setAttribute("src", "icons8-tick-48.png");
                selectedBtn.classList.add("correct");
                score++;
            } else {
                resultText.textContent = "Wrong";
                image.setAttribute("src", "icons8-cross-48.png");
                selectedBtn.classList.add("wrong");
            }
            //disabling all other buttons after any one button is clicked so that one can not cheat
            Array.from(answerButtons.children).forEach(button=>{
                button.disabled=true;
            })
            resultDiv.style.display = "flex";
            nextButton.style.display = "block";
        });
    })
}

start();

//function to remove the previous set of answers options
function resetState(){
    nextButton.style.display = "none";
    resultDiv.style.display = "none";
    for(let i = answerButtons.children.length - 1; i >= 0; i--){
        answerButtons.removeChild(answerButtons.children[i]);
    }
}

function handleNext(){
    questionIndex++;
    if(questionIndex<questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionEl.innerText = `You scored ${score} out of ${questions.length} questions`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click",()=>{
    if(questionIndex<questions.length){
        handleNext();
    }
    else{
        start();
    }
});

