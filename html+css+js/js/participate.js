document.addEventListener('DOMContentLoaded', function () {
    const surveyId = getSurveyIdFromURL();

    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    const currentSurvey = savedSurveys.find(survey => survey.id == surveyId);

    if (currentSurvey) {
        renderSurveyQuestions(currentSurvey);
    } else {
        console.error('Survey not found!');
    }

    function renderSurveyQuestions(survey) {
        const participateContainer = document.querySelector('.container');

        survey.questions.forEach((question, index) => {
            const questionContainer = document.createElement('div');
            questionContainer.className = 'question-container';

            const questionText = document.createElement('h2');
            questionText.textContent = `${index + 1}. ${question.questionText}`;

            questionContainer.appendChild(questionText);

            if (question.questionType === 'openQuestion') {
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.className = 'form-control open-answer';
                inputField.name = `answer${index + 1}`;
                inputField.placeholder = 'Your Answer';

                questionContainer.appendChild(inputField);
            } else {
                question.answers.forEach((answer) => {
                    const radioContainer = document.createElement('label');
                    radioContainer.className = 'radio-container';

                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = `answer${index + 1}`;
                    radioInput.value = answer.answerText;

                    const radioLabel = document.createElement('span');
                    radioLabel.textContent = answer.answerText;

                    radioContainer.appendChild(radioInput);
                    radioContainer.appendChild(radioLabel);

                    questionContainer.appendChild(radioContainer);
                });
            }

            participateContainer.appendChild(questionContainer);
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.className = 'btn btn-primary';
        submitButton.textContent = 'Submit Answers';
        submitButton.addEventListener('click', function () {
            submitAnswers(survey);
        });

        participateContainer.appendChild(submitButton);
    }

    function submitAnswers(survey) {
        const participantAnswers = [];

        survey.questions.forEach((question, index) => {
            const answerField = document.querySelector(`[name="answer${index + 1}"]`);

            if (answerField) {
                participantAnswers.push({
                    questionText: question.questionText,
                    answerText: answerField.value
                });
            }
        });

        const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];

        const existingSurveyIndex = savedSurveys.findIndex(s => s.id == survey.id);

        if (existingSurveyIndex !== -1) {
            if (!savedSurveys[existingSurveyIndex].participantAnswers) {
                savedSurveys[existingSurveyIndex].participantAnswers = [];
            }
            savedSurveys[existingSurveyIndex].participantAnswers = savedSurveys[existingSurveyIndex].participantAnswers.concat(participantAnswers);
        } else {
            savedSurveys.push({
                ...survey,
                participantAnswers: participantAnswers
            });
        }

        localStorage.setItem('surveys', JSON.stringify(savedSurveys));

        window.location.href = 'index.html';

        console.log('Participant Answers:', participantAnswers);
        alert('Answers submitted successfully!');
    }

    function getSurveyIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
});
