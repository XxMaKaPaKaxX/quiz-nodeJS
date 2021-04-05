const gameRoutes = (app) => {
    let goodAnswers = 0;
    let callToFriendUsed = false;
    let questionToCrowdUsed = false;
    let halfOnHalfUsed = false;
    let isGameOver = false;

    const questions = [
        {
            question: 'Która substancja nie jest materiałem wybuchowym?',
            answers: ['Cyjanowodór', 'Karbonit', 'Dynamit', 'Nitrogliceryna'],
            correctAnswerIndex: 0, 
        },
        {
            question: 'Która z rzek Nie przepływa przez Amerykę Południową?',
            answers: ['Parana', 'Jurua', 'Orinoko', 'Amur'],
            correctAnswerIndex: 3, 
        },
        {
            question: 'Rzymski bóg, opiekun sztuki lekarskiej, to',
            answers: ['Asklepios', 'Virtus', 'Eskulap', 'Honor'],
            correctAnswerIndex: 2, 
        },
        {
            question: 'W którym roku Titanic zatonął na Oceanie Atlantyckim 15 kwietnia podczas dziewiczej podróży z Southampton?',
            answers: ['1912', '1905', '1876', '1937'],
            correctAnswerIndex: 0, 
        },
        {
            question: ' Jaką wizytówkę Al Capone stwierdził jego zawód?',
            answers: ['patolog', 'Adwokat', 'Księgowy', 'Sprzedawca używanych mebli'],
            correctAnswerIndex: 3, 
        },
    ];

    app.get('/question', (req, res) => {
        if (goodAnswers === questions.length) {
            res.json({
                winner: true
            })
        } else if (isGameOver) {
            res.json({
                loser: true
            })
        } else {
            const nextQuestion = questions[goodAnswers];
            const {question, answers} = nextQuestion;
            res.json({
                question,
                answers
            })
        }
    })

    app.post('/answer/:index', (req, res) => {

        if(isGameOver) res.json({
            loser: true
        })

        const indexOfSelectedAnswer = Number(req.params.index);
        const question = questions[goodAnswers];
        const isGoodAnswer = question.correctAnswerIndex === indexOfSelectedAnswer;

        if (isGoodAnswer) {
            goodAnswers += 1;
        } else {
            isGameOver = true;
        }     
        res.json({
            correct: isGoodAnswer,
            goodAnswers
        })

    })

    app.get(`/help/friend`, (req, res) => {
        if (callToFriendUsed) {
            return res.json({
                text: 'To koło ratunkowe było już wykorzystane.'
            });
        }
        const question = questions[goodAnswers];
        const doesFriendKnowAnswer = Math.random() > 0.3;

        res.json({
            text: doesFriendKnowAnswer 
                ? `Hmm... Wydaje mi się, że odpowiedź to ${question.answers[question.correctAnswerIndex]}` 
                : `Niestety nie znam odpowiedzi`
        })

        callToFriendUsed = true;
    })

    app.get(`/help/halfonhalf`, (req, res) => {
        if (halfOnHalfUsed) {
            return res.json({
                text: 'To koło ratunkowe było już wykorzystane.'
            });
        }
        
        const answersWithoutRightAnswer = questions[goodAnswers].answers.filter((answer, index) => index !== questions[goodAnswers].correctAnswerIndex);
        const randomIncorrectAnswerIndex = ~~((Math.random()) * answersWithoutRightAnswer.length);

        const coorectAnswer = questions[goodAnswers].answers[questions[goodAnswers].correctAnswerIndex];
        const incorrectAnswer = answersWithoutRightAnswer[randomIncorrectAnswerIndex];
        const answerForTip = Math.random() > 0.5 ? [coorectAnswer, incorrectAnswer] : [incorrectAnswer, coorectAnswer];

        res.json({
            text: `poprawna odpowiedź to ${answerForTip[0]} albo ${answerForTip[1]}`
        })

        halfOnHalfUsed = true;
    })
 
    app.get(`/help/crowd`, (req, res) => {
        if (questionToCrowdUsed) {
            return res.json({
                text: 'To koło ratunkowe było już wykorzystane.'
            });
        }

        const chart = [10, 20, 30, 40];
        
        for (let i = chart.length - 1; i> 0; i -= 1) {
            const change = ~~(Math.random() * 20 - 10);
            chart[i] += change;
            chart[i -1] -= change;            
        }

        const question = questions[goodAnswers];        
        const {correctAnswerIndex} = question;
        const tempVar = chart[correctAnswerIndex];
        chart[correctAnswerIndex] = chart[3]
        chart[3] = tempVar;

        res.json({
            chart
        })    
    })
}

module.exports = gameRoutes;