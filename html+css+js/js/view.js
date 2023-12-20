document.addEventListener('DOMContentLoaded', function () {
    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    const surveysContainer = document.getElementById('surveysContainer');
    const noSurveysMessage = document.getElementById('noSurveysMessage');

    if (!surveysContainer || !noSurveysMessage) {
        console.error('Surveys container or no surveys message not found!');
        return;
    }

    if (savedSurveys.length === 0) {
        noSurveysMessage.textContent = 'No surveys found or there are no surveys yet.';
        return;
    }

    renderAllSurveys(savedSurveys);

    function renderAllSurveys(surveys) {
        surveys.forEach((survey, surveyIndex) => {
            const surveyContainer = document.createElement('div');
            surveyContainer.className = 'survey-container';

            const surveyTitle = document.createElement('h2');
            surveyTitle.textContent = `${surveyIndex + 1}. ${survey.title}`;
            surveyContainer.appendChild(surveyTitle);

            const numQuestions = document.createElement('p');
            numQuestions.textContent = `Number of Questions: ${survey.questions.length}`;
            surveyContainer.appendChild(numQuestions);

            const participateButton = document.createElement('a');
            participateButton.href = `participate.html?id=${survey.id}`; // Use the unique identifier
            participateButton.className = 'btn btn-primary';
            participateButton.textContent = 'Participate';
            surveyContainer.appendChild(participateButton);

            surveysContainer.appendChild(surveyContainer);
        });
    }
});
