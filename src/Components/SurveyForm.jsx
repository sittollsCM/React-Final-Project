import React, { useState, useEffect } from 'react';
import SurveyQuestion from './SurveyQuestion';
import '../App.css';

const SurveyForm = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
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
    const surveyData = { title: surveyTitle, questions };
    const savedSurveys = JSON.parse(localStorage.getItem('savedSurveys')) || [];
    const updatedSurveys = [...savedSurveys, surveyData];
    localStorage.setItem('savedSurveys', JSON.stringify(updatedSurveys));

    setSurveyTitle('');
    setQuestions([]);
    localStorage.removeItem('surveyData');
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
            key={question.id}
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
