import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSurvey } from './SurveyAPI';

const SurveyDetail = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const surveyData = await getSurvey(id);
        setSurvey(surveyData);
      } catch (error) {
        console.error('Error fetching survey details:', error);
      }
    };

    fetchSurvey();
  }, [id]);

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div className="survey-detail-container">
      <h2>{survey.title}</h2>
      <h3>Questions:</h3>
      <ul>
        {survey.questions.map((question, index) => (
          <li key={index}>{question.questionText}</li>
        ))}
      </ul>
      {}
    </div>
  );
};

export default SurveyDetail;
