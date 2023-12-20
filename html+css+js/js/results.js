document.addEventListener('DOMContentLoaded', function () {
    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];

    renderAllSurveysResults(savedSurveys);

    function renderAllSurveysResults(surveys) {
        const resultsContainer = document.getElementById('resultsContainer');
        const noSurveysMessage = document.getElementById('noSurveysMessage');

        if (!resultsContainer || !noSurveysMessage) {
            console.error('Results container or no surveys message not found!');
            return;
        }

        if (surveys.length === 0) {
            noSurveysMessage.textContent = 'No surveys found or there are no surveys yet.';
            return;
        }

        resultsContainer.innerHTML = '';

        surveys.forEach((survey, surveyIndex) => {
            const surveyResultsContainer = document.createElement('div');
            surveyResultsContainer.className = 'survey-results-container';

            const surveyTitle = document.createElement('h2');
            surveyTitle.textContent = `${surveyIndex + 1}. ${survey.title}`;
            surveyResultsContainer.appendChild(surveyTitle);

            survey.questions.forEach((question, questionIndex) => {
                const questionContainer = document.createElement('div');
                questionContainer.className = 'question-container';

                const questionText = document.createElement('h3');
                questionText.textContent = `${questionIndex + 1}. ${question.questionText}`;
                questionContainer.appendChild(questionText);

                if (question.questionType === 'openQuestion') {
                    const openAnswers = getOpenAnswers(question, surveys);
                    openAnswers.forEach((answer) => {
                        const openAnswerResult = document.createElement('p');
                        openAnswerResult.textContent = `Answer: ${answer.answerText}`;
                        questionContainer.appendChild(openAnswerResult);
                    });
                } else if (question.questionType === 'singleChoice' || question.questionType === 'multipleChoice') {
                    const answerCounts = getAnswerCounts(question, surveys);

                    for (const [answerText, count] of Object.entries(answerCounts)) {
                        const answerResult = document.createElement('p');
                        const percentage = ((count / survey.participantAnswers.length) * 100).toFixed(2);
                        answerResult.textContent = `${answerText}: ${count} (${percentage}%)`;

                        questionContainer.appendChild(answerResult);
                    }
                }

                surveyResultsContainer.appendChild(questionContainer);
            });

            resultsContainer.appendChild(surveyResultsContainer);
        });
    }

    function getOpenAnswers(question, surveys) {
        const openAnswers = [];

        surveys.forEach((survey) => {
            const matchingQuestion = survey.questions.find((q) => q.questionText === question.questionText);

            if (matchingQuestion && matchingQuestion.answers) {
                const matchingAnswer = matchingQuestion.answers.find((a) => a.answerIndex !== undefined);

                if (matchingAnswer) {
                    openAnswers.push(matchingAnswer);
                }
            }
        });

        return openAnswers;
    }

    function getAnswerCounts(question, surveys) {
        const answerCounts = {};

        surveys.forEach((survey) => {
            const matchingQuestion = survey.questions.find((q) => q.questionText === question.questionText);

            if (matchingQuestion && matchingQuestion.answers) {
                matchingQuestion.answers.forEach((answer) => {
                    const answerText = answer.answerText;

                    if (!answerCounts[answerText]) {
                        answerCounts[answerText] = 1;
                    } else {
                        answerCounts[answerText]++;
                    }
                });
            } else if (matchingQuestion && !matchingQuestion.answers) {
                const answerText = 'Open Question';
                if (!answerCounts[answerText]) {
                    answerCounts[answerText] = 1;
                } else {
                    answerCounts[answerText]++;
                }
            }
        });

        return answerCounts;
    }
});
