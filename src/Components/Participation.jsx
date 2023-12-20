import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const ParticipateSurvey = () => {
  const { surveyId } = useParams();
  const savedSurveys = JSON.parse(localStorage.getItem('savedSurveys')) || [];
  const survey = savedSurveys.find((s) => s.title === decodeURIComponent(surveyId));

  return (
    <div className="participate-container">
      {survey ? (
        <div>
          <h2>{survey.title}</h2>
          {}
        </div>
      ) : (
        <p>Survey not found.</p>
      )}
    </div>
  );
};

export default ParticipateSurvey;
