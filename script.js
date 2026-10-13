console.log(questions);

let score = 0;
let currentQuestion = 0;


const feedback = document.getElementById("feedback");
const counter = document.getElementById("counter");
const questionElement = document.getElementById("question");
const progressBar =
    document.getElementById("progress-bar");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

function displayQuestion() {
    const progress =
    ((currentQuestion) / questions.length) * 100;

progressBar.style.width =
    `${progress}%`;

    feedback.classList.remove(
        "correct",
        "incorrect",
        "show-feedback"
    );

    feedback.style.display = "none";

    counter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent =
        questions[currentQuestion].question;

    let shuffledOptions =
        [...questions[currentQuestion].options];

    shuffledOptions.sort(() => Math.random() - 0.5);

    answer1.textContent = shuffledOptions[0];
    answer2.textContent = shuffledOptions[1];
    answer3.textContent = shuffledOptions[2];
    answer4.textContent = shuffledOptions[3];

    answer1.disabled = false;
    answer2.disabled = false;
    answer3.disabled = false;
    answer4.disabled = false;
}

function checkAnswer(selectedAnswer) {

    answer1.disabled = true;
    answer2.disabled = true;
    answer3.disabled = true;
    answer4.disabled = true;

    const correctAnswer =
        questions[currentQuestion].answer;

    const explanation =
        questions[currentQuestion].explanation;

    feedback.style.display = "block";

    if (selectedAnswer.trim() === correctAnswer.trim()) {

        score++;

        feedback.classList.add(
            "correct",
            "show-feedback"
        );

        feedback.innerHTML = `
            ✅ Correct!<br><br>
            ${explanation}
        `;

    } else {

        feedback.classList.add(
            "incorrect",
            "show-feedback"
        );

        feedback.innerHTML = `
            ❌ Incorrect!<br><br>
            The correct answer was:
            <strong>${correctAnswer}</strong><br><br>
            ${explanation}
        `;
    }

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            displayQuestion();

        } else {

            showResults();

        }

    }, 3000);
}

function showResults() {

    counter.textContent = "";

    questionElement.innerHTML =
        "🎉 Quiz Complete!";

    feedback.style.display = "block";

    feedback.classList.remove("incorrect");
    feedback.classList.add("correct", "show-feedback");

    const percentage =
        Math.round(
            (score / questions.length) * 100
        );

    feedback.innerHTML = `
        <h2>Final Score</h2>
        <p>${score} / ${questions.length}</p>
        <p>${percentage}%</p>
    `;

    answer1.style.display = "none";
    answer2.style.display = "none";
    answer3.style.display = "none";
    answer4.style.display = "none";
}

answer1.addEventListener("click", () =>
    checkAnswer(answer1.textContent)
);

answer2.addEventListener("click", () =>
    checkAnswer(answer2.textContent)
);

answer3.addEventListener("click", () =>
    checkAnswer(answer3.textContent)
);

answer4.addEventListener("click", () =>
    checkAnswer(answer4.textContent)
);

questions.sort(() => Math.random() - 0.5);

displayQuestion();
answer1.disabled = false;
answer2.disabled = false;
answer3.disabled = false;
answer4.disabled = false;

console.log("Buttons enabled");