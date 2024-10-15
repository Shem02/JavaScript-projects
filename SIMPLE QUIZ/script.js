const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:'shark', correct: false},
            {text:'blue whale', correct: true},
            {text:'Elephant', correct: false},
            {text:'Giraffe', correct: false}
        ] 
    }, 
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text:'Vatican City', correct: true},
            {text:'Bhutan', correct: false},
            {text:'Nepal', correct: false},
            {text:'Sri Lanka', correct: false}
        ] 
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text:'Kalahari', correct: false},
            {text:'Gobi', correct: false},
            {text:'Sahara', correct: false},
            {text:'Antarctica', correct: true}
        ] 
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text:'Asia', correct: false},
            {text:'Australia', correct: true},
            {text:'Arctic', correct: false},
            {text:'Africa', correct: false}
        ] 
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons'); // Fixed the variable name
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; 
    score = 0;
    nextButton.style.display = 'none'; // Initially hide the NEXT button
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn'); // Use 'btn' class for styling
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer); // Corrected function name
    });
}

function resetState() {
    nextButton.style.display = 'none'; // Ensure NEXT button is hidden initially
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        score++; // Increase score if the answer is correct
        selectedBtn.classList.add('correct'); // Mark as correct
        score++;
    } else {
        selectedBtn.classList.add('incorrect'); // Mark as incorrect
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==='true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    
    // Show NEXT button after an answer is selected
    nextButton.style.display = 'block'; 
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert(`Quiz completed! Your score: ${score} out of ${questions.length}`);
        // Optionally reset the quiz
        startQuiz();
    }
});

startQuiz(); // Start the quiz
