const questionDiv = document.getElementById('question');
const answersButtons = [...document.querySelectorAll('.answer-btn')];
const goodAnswersSpan = document.querySelector('#good-answers');
const gameBoardDiv = document.querySelector('#game-board');



const fillQuestionElements = ({question, answers, winner, loser}) => {
    if(winner === true) {
        gameBoardDiv.style.display = 'none';
        goodAnswersSpan.textContent = 'Wygrana! Ciesz się ze zwycięstwa!';
        return;
    } else if (loser === true) {
        gameBoardDiv.style.display = 'none';
        goodAnswersSpan.textContent = 'Przegrałes :( Może innym razem się uda...';
        return;
    }
    questionDiv.textContent = question;
    answers.forEach((element, index) => {
        answersButtons[index].textContent = element;
    });    
}

const getNextQuestion = () => {
    fetch('http://localhost:3001/question', {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(data => fillQuestionElements(data))
}

getNextQuestion();

const handleAnswerFeedback = (data) => {
    goodAnswersSpan.textContent = data.goodAnswers;
    getNextQuestion();
}

const sendAnswer = (answerIndex) => {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(res => res.json())
        .then(data => handleAnswerFeedback(data))
}

answersButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => sendAnswer(index))
})