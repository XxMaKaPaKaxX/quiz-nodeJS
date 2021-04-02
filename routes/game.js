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
}

module.exports = gameRoutes;