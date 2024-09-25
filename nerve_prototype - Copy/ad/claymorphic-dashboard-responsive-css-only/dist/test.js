//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What is the philosophy behind anti-doping?",
        options: ["restrict pharmaceutical industry's access to athletes", "hold athletes to a higher standard than non athletes", "protect spirit of sport", "promote discipline"],
        correct: "protect spirit of sport",
    },
    {
        id: "1",
        question: "What is the purpoe of world anti doping code?",
        options: ["protect fundamental right of athletes to participate in doping free sports", "promote health,fairness,eqaulity for athletes", "ensure harmonious and effective anti doping program at international level", "all of the above"],
        correct: "all of the above",
    },
    {
        id: "2",
        question: "what is prohibited list?",
        options: ["list of doctors prohibited to work with athletes due to doping sanctions", "list of substances that are prohibited in and out of competitions", "list of athletes who have been banned due to doping sanctions", "list of coaches not allowed to work with athletes due to doping sanctions"],
        correct: "list of substances that are prohibited in and out of competitions",
    },
    {
        id: "3",
        question: "what are side effects of using anabolic steroids?",
        options: ["liver failure", " heart failure", "violent mood swings", "all of above"],
        correct: "all of above",
    },
    {
        id: "4",
        question: "what does TUE stand for?",
        options: ["Term Update Exemption", "Therapeutic use exemption", "therapeutic use enhancement", "technical use exchange"],
        correct: "Therapeutic use exemption",
    },
    {
        id: "5",
        question: "how can athlete with a medical condition decide whther or not to take medicines?",
        options: ["should determine need for medication and seek a TUE", "prescribed by the doctor", "can take any medication without rrstriction", "using google"],
        correct: "should determine need for medication and seek a TUE",
    }, {
        id: "6",
        question: "who is responsible for substances found in athletes body?",
        options: ["athlete", "doctor", "coach", "provider of substance"],
        correct: "athlete",
    },
    {
        id: "7",
        question: "when must an athlete ne notifies for doping test?",
        options: ["1 month prior", "24hr prior", "7 days prior", "6 months prior"],
        correct: "1 month prior",
    },
    {
        id: "8",
        question: "what are athletes rights when a positve test is returned?",
        options: ["right to have sample B analysed", "right to copies of laboratory documentation package", "right to attend opening and analysis of B sample", "can raise an appeal but not access laboratory's documentation"],
        correct: "can raise an appeal but not access laboratory's documentation",
    },
    {
        id: "9",
        question: "when can an athlete refuse a doping test?",
        options: ["family commitments", "busy schedules", "academic obligations", "can never refuse a doping test"],
        correct: "can never refuse a doping test",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};