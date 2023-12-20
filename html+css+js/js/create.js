document.addEventListener('DOMContentLoaded', function () {
    const surveyForm = document.getElementById('surveyForm');

    surveyForm.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('add-question')) {
            addQuestion();
        }
    });

    surveyForm.addEventListener('change', function (event) {
        const target = event.target;
        if (target.name.startsWith('questionType')) {
            const answersContainer = target.closest('.question-container').querySelector('.answers-container');
            answersContainer.innerHTML = '';

            if (target.value !== 'openQuestion') {
                addAnswerField(target);
            }
        }
    });

    surveyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveSurvey();
    });

    function addQuestion() {
        const questionsContainer = document.getElementById('questionsContainer');
        const questionNumber = questionsContainer.children.length + 1;

        const newQuestionContainer = document.createElement('div');
        newQuestionContainer.className = 'question-container mb-3';

        const label = document.createElement('label');
        label.htmlFor = `question${questionNumber}`;
        label.className = 'form-label';
        label.textContent = `Question ${questionNumber}`;

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'btn btn-danger btn-sm remove-question';
        removeButton.textContent = 'Remove Question';
        removeButton.addEventListener('click', function () {
            removeQuestion(removeButton);
        });

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.name = 'question';
        input.placeholder = `Enter question ${questionNumber}`;
        input.required = true;

        const questionTypeLabel = document.createElement('label');
        questionTypeLabel.htmlFor = `questionType${questionNumber}`;
        questionTypeLabel.className = 'form-label mt-2';
        questionTypeLabel.textContent = 'Question Type';

        const questionTypeSelect = document.createElement('select');
        questionTypeSelect.className = 'form-select';
        questionTypeSelect.name = `questionType${questionNumber}`;

        const singleChoiceOption = createOption('singleChoice', 'Single Choice');
        const multipleChoiceOption = createOption('multipleChoice', 'Multiple Choice');
        const openQuestionOption = createOption('openQuestion', 'Open Question');

        questionTypeSelect.appendChild(singleChoiceOption);
        questionTypeSelect.appendChild(multipleChoiceOption);
        questionTypeSelect.appendChild(openQuestionOption);

        const answersContainer = document.createElement('div');
        answersContainer.className = 'answers-container mt-2';

        if (!questionTypeSelect.value === 'openQuestion') {
            addAnswerField(answersContainer);
        }

        const addAnswerButton = document.createElement('button');
        addAnswerButton.type = 'button';
        addAnswerButton.className = 'btn btn-success btn-sm add-answer';
        addAnswerButton.textContent = 'Add Answer';
        addAnswerButton.addEventListener('click', function () {
            addAnswerField(addAnswerButton);
        });

        newQuestionContainer.appendChild(label);
        newQuestionContainer.appendChild(removeButton);
        newQuestionContainer.appendChild(input);
        newQuestionContainer.appendChild(questionTypeLabel);
        newQuestionContainer.appendChild(questionTypeSelect);
        newQuestionContainer.appendChild(answersContainer);
        newQuestionContainer.appendChild(addAnswerButton);

        resetFields(newQuestionContainer);

        questionsContainer.appendChild(newQuestionContainer);
    }

    function removeQuestion(button) {
        const questionContainer = button.closest('.question-container');
        if (questionContainer) {
            const questionsContainer = document.getElementById('questionsContainer');
            if (questionsContainer && questionsContainer.contains(questionContainer)) {
                questionsContainer.removeChild(questionContainer);
                updateQuestionNumbers();
            }
        }
    }

    function addAnswerField(target) {
        const questionContainer = target.closest('.question-container');
        let answersContainer;

        if (questionContainer) {
            try {
                answersContainer = questionContainer.querySelector('.answers-container');
            } catch (error) {
                answersContainer = document.createElement('div');
                answersContainer.className = 'answers-container mt-2';
                questionContainer.appendChild(answersContainer);
            }

            const questionTypeSelect = questionContainer.querySelector('[name^="questionType"]');
            if (questionTypeSelect && !questionTypeSelect.value.startsWith('openQuestion')) {
                const answerContainers = answersContainer.querySelectorAll('.answer-container');
                const answerNumber = answerContainers.length + 1;

                const answerContainer = document.createElement('div');
                answerContainer.className = 'answer-container mb-2';

                const label = document.createElement('label');
                label.htmlFor = `answer${answerNumber}`;
                label.className = 'form-label';
                label.textContent = `Answer ${answerNumber}`;

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
                input.name = 'answer';
                input.placeholder = `Enter answer ${answerNumber}`;
                input.required = true;

                const removeButton = document.createElement('button');
                removeButton.type = 'button';
                removeButton.className = 'btn btn-danger btn-sm remove-answer';
                removeButton.textContent = 'Remove Answer';
                removeButton.addEventListener('click', function () {
                    removeAnswer(removeButton);
                });

                answerContainer.appendChild(label);
                answerContainer.appendChild(input);
                answerContainer.appendChild(removeButton);

                answersContainer.appendChild(answerContainer);
            }
        }
    }

    function removeAnswer(button) {
        const questionContainer = button.closest('.question-container');
        const answersContainer = questionContainer.querySelector('.answers-container');
        const answerContainer = button.closest('.answer-container');
        if (answerContainer) {
            answerContainer.remove();
            updateAnswerNumbers(answersContainer);
        }
    }

    function createOption(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        return option;
    }

    function resetFields(container) {
        const fields = container.querySelectorAll('input[type="text"]');
        fields.forEach((field) => (field.value = ''));
    }

    function updateQuestionNumbers() {
        const questionsContainer = document.getElementById('questionsContainer');
        const questionContainers = questionsContainer.querySelectorAll('.question-container');
        questionContainers.forEach((container, index) => {
            const label = container.querySelector('.form-label');
            if (label) {
                label.textContent = `Question ${index + 1}`;
            }
        });
    }

    function updateAnswerNumbers(answersContainer) {
        const answerContainers = answersContainer.querySelectorAll('.answer-container');
        answerContainers.forEach((container, index) => {
            const label = container.querySelector('.form-label');
            if (label) {
                label.textContent = `Answer ${index + 1}`;
            }
        });
    }

    function saveSurvey() {
        const surveyData = {
            id: generateUniqueId(),
            title: document.getElementById('surveyTitle').value,
            questions: []
        };

        const questionContainers = document.querySelectorAll('.question-container');

        questionContainers.forEach((container, index) => {
            const question = {
                questionText: container.querySelector('input[name="question"]').value,
                questionType: container.querySelector('select[name^="questionType"]').value,
                answers: []
            };

            const answerContainers = container.querySelectorAll('.answer-container');

            answerContainers.forEach((answerContainer, answerIndex) => {
                const answerText = answerContainer.querySelector('input[name="answer"]').value;
                question.answers.push({ answerText, answerIndex });
            });

            surveyData.questions.push(question);
        });

        const existingSurveys = JSON.parse(localStorage.getItem('surveys')) || [];

        existingSurveys.push(surveyData);

        localStorage.setItem('surveys', JSON.stringify(existingSurveys));

        alert('Survey submitted successfully!');
        
        window.location.href = 'ThankYou.html';
    }

    function generateUniqueId() {
        return Math.random().toString(36).substring(7);
    }
});
