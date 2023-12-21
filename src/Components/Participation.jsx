import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ParticipationForm from './ParticipationForm';
import '../App.css';
import './Participation.css';

const useSurvey = (surveyId) => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem('savedSurveys')) || [];
    const currentSurvey = savedSurveys.find((s) => s.title === decodeURIComponent(surveyId));

    setSurvey(currentSurvey);
  }, [surveyId]);

  return survey;
};

const Participation = () => {
  const { surveyId } = useParams();
  const survey = useSurvey(surveyId);

  const [submitted, setSubmitted] = React.useState(false);
  const [responses, setResponses] = React.useState({});

  const handleSubmit = (responses) => {
    const attempts = JSON.parse(localStorage.getItem('attempts')) || [];
    const newAttempt = { surveyId: survey.title, responses };
    const updatedAttempts = [...attempts, newAttempt];
    localStorage.setItem('attempts', JSON.stringify(updatedAttempts));

    setSubmitted(true);
  };

  return (
    <div className="participate-container">
      {survey ? (
        <div>
          <h2>{survey.title}</h2>
          {submitted ? (
            <p>Thank you for participating! You have already submitted your responses.</p>
          ) : (
            <ParticipationForm survey={survey} responses={responses} setResponses={setResponses} onSubmit={handleSubmit} />
          )}
        </div>
      ) : (
        <p>Survey not found.</p>
      )}
    </div>
  );
};

export default Participation;
