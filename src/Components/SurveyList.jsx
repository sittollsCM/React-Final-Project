import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem('savedSurveys')) || [];
    setSurveys(savedSurveys);
  }, []);

  const handleDeleteSurvey = (surveyId) => {
    const updatedSurveys = surveys.filter((survey) => survey.id !== surveyId);
    setSurveys(updatedSurveys);
    localStorage.setItem('savedSurveys', JSON.stringify(updatedSurveys));
  };

  return (
    <div className="survey-list-container">
      <h2>Survey List</h2>
      {surveys.length > 0 ? (
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id}>
              <span>{survey.title}</span>
              <div>
                <Link to={`/participate/${survey.id}`} className="participate-link">
                  Participate
                </Link>
                <button onClick={() => handleDeleteSurvey(survey.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No surveys available.</p>
      )}
    </div>
  );
};

export default SurveyList;
