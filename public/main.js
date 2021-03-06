const questionDiv = document.getElementById('question');
const answersButtons = [...document.querySelectorAll('.answer-btn')];
const goodAnswersSpan = document.querySelector('#good-answers');
const gameBoardDiv = document.querySelector('#game-board');
const callToFriendBtn = document.querySelector('#callToFriend');
const halfOnHalfBtn = document.querySelector('#halfOnHalf');
const questionToCrowdBtn = document.querySelector('#questionToCrowd');
const tipDiv = document.querySelector('#tip');
const gameInfo = document.querySelector('#game-info');

const fillQuestionElements = ({question, answers, winner, loser}) => {
    if(winner === true) {
        gameBoardDiv.style.display = 'none';
        gameInfo.textContent = 'Wygrana! Ciesz się ze zwycięstwa!';
        return;
    } else if (loser === true) {
        gameBoardDiv.style.display = 'none';
        gameInfo.textContent = 'Przegrałes :( Może innym razem się uda...';
        return;
    }
    questionDiv.textContent = question;
    answers.forEach((element, index) => {
        answersButtons[index].textContent = element;
    });    
}

const getNextQuestion = () => {
    fetch('/question', {
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

const callToFriend = () => {
    const getTip = (data) => {
        tipDiv.textContent = data.text
    }
    fetch(`/help/friend`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => getTip(data));    
}

callToFriendBtn.addEventListener('click', callToFriend);

const getHalfOnHalfTip = () => {
    const getTip = (data) => {
        tipDiv.textContent = data.text
    }
    fetch(`/help/halfonhalf`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => getTip(data));
    
}
halfOnHalfBtn.addEventListener('click', getHalfOnHalfTip);

const handleUseCrowdHelp = (data) => {

    if (data.text) {
        tipDiv.textContent = data.text;
        return;
    }

    const {chart, answers} = data;
    const tempArr = [];
    
    answers.forEach((answer, index) => {
        tempArr.push(`${answer} - ${chart[index]}%`)
    })
    const text = `Wynik głosowania publiczności: ${tempArr.join(', ')};`;
    tipDiv.textContent = text;
}

const useCrowdHelp = () => {
    
    fetch(`/help/crowd`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => handleUseCrowdHelp(data));
    
}
questionToCrowdBtn.addEventListener('click', useCrowdHelp);

