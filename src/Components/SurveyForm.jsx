// SurveyForm.jsx
import React, { useState, useEffect } from 'react';
import SurveyQuestion from './SurveyQuestion';
import '../App.css';

const SurveyForm = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Load survey data from local storage on component mount
    const savedSurveyData = JSON.parse(localStorage.getItem('surveyData')) || {};
    setSurveyTitle(savedSurveyData.title || '');
    setQuestions(savedSurveyData.questions || []);
  }, []);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: prevQuestions.length + 1, text: '', type: 'singleChoice', answers: [] },
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  };

  const updateQuestion = (id, updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => (question.id === id ? updatedQuestion : question))
    );
  };

  const saveSurvey = () => {
    // Save survey data to local storage
    const surveyData = { title: surveyTitle, questions };
    localStorage.setItem('surveyData', JSON.stringify(surveyData));
    console.log('Survey Data:', surveyData);
  };

  return (
    <form onSubmit={saveSurvey}>
      <div>
        <label htmlFor="surveyTitle">Survey Title</label>
        <input
          type="text"
          id="surveyTitle"
          placeholder="Enter survey title"
          value={surveyTitle}
          onChange={(e) => setSurveyTitle(e.target.value)}
          required
        />
      </div>

      <div>
        {questions.map((question) => (
          <SurveyQuestion
            key={`question-${question.id}`} // Use a combination of 'question' and id for a unique key
            question={question}
            onRemove={() => removeQuestion(question.id)}
            onUpdate={(updatedQuestion) => updateQuestion(question.id, updatedQuestion)}
          />
        ))}
      </div>

      <button type="button" onClick={addQuestion}>
        Add Question
      </button>

      <div>
        <button type="submit">Submit Survey</button>
      </div>
    </form>
  );
};

export default SurveyForm;
