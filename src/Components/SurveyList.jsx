import React, { useEffect, useState } from 'react';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Retrieve survey data from local storage
    const storedSurveys = JSON.parse(localStorage.getItem('surveys')) || [];
    setSurveys(storedSurveys);
  }, []);

  return (
    <div className="survey-list-container">
      <h2>Survey List</h2>
      <ul>
        {surveys.map((survey, index) => (
          <li key={index}>
            <strong>{survey.title}</strong>
            <p>Questions: {survey.questions.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;
