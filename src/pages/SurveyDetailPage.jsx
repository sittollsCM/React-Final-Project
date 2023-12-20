// SurveyDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SurveyAPI from '../Components/SurveyAPI';

const SurveyDetailPage = ({ fetchSurveys }) => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [participantAnswers, setParticipantAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch survey details and participant answers when the component mounts
    fetchSurveyDetails();
    fetchParticipantAnswers();
  }, []);

  const fetchSurveyDetails = async () => {
    try {
      const surveyData = await SurveyAPI.getSurveyById(id);
      setSurvey(surveyData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching survey details:', error);
      setIsLoading(false);
    }
  };

  const fetchParticipantAnswers = async () => {
    try {
      const answersData = await SurveyAPI.getSurveyResponses(id);
      setParticipantAnswers(answersData);
    } catch (error) {
      console.error('Error fetching participant answers:', error);
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading survey details...</p>
      ) : survey ? (
        <>
          <h2>{survey.title}</h2>
          {/* Render other survey details as needed */}
        </>
      ) : (
        <p>Survey not found.</p>
      )}
    </div>
  );
};

export default SurveyDetailPage;
