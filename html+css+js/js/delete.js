document.addEventListener('DOMContentLoaded', function () {
    const savedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];

    renderAllSurveysToDelete(savedSurveys);

    function renderAllSurveysToDelete(surveys) {
        const deleteContainer = document.getElementById('deleteContainer');
        const noSurveysMessage = document.getElementById('noSurveysMessage');

        if (!deleteContainer || !noSurveysMessage) {
            console.error('Delete container or no surveys message not found!');
            return;
        }

        if (surveys.length === 0) {
            noSurveysMessage.textContent = 'No surveys found or there are no surveys yet.';
            return;
        }

        // Clear previous delete content
        deleteContainer.innerHTML = '';

        surveys.forEach((survey, surveyIndex) => {
            const surveyDeleteContainer = document.createElement('div');
            surveyDeleteContainer.className = 'survey-delete-container';

            const surveyTitle = document.createElement('h2');
            surveyTitle.textContent = `${surveyIndex + 1}. ${survey.title}`;
            surveyDeleteContainer.appendChild(surveyTitle);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Survey';
            deleteButton.className = 'btn btn-danger';
            deleteButton.addEventListener('click', function () {
                deleteSurvey(surveyIndex);
            });

            surveyDeleteContainer.appendChild(deleteButton);
            deleteContainer.appendChild(surveyDeleteContainer);
        });
    }

    function deleteSurvey(surveyIndex) {
        const allSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
        allSurveys.splice(surveyIndex, 1);
        localStorage.setItem('surveys', JSON.stringify(allSurveys));

        // Re-render the delete page after deletion
        renderAllSurveysToDelete(allSurveys);
    }
});
