import React, { useState } from 'react';
import SurveyForm from '../Components/SurveyForm';
import SurveyAPI from '../Components/SurveyAPI';
import "./Create.css"

const Create = ({ fetchSurveys }) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSurvey = async (surveyData) => {
    try {
      setIsCreating(true);
      await SurveyAPI.createSurvey(surveyData);
      fetchSurveys();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating survey:', error);
      setIsCreating(false);
    }
  };

  return (
    <div className="create-container">
      <h2>Create a Survey</h2>
      <SurveyForm onSubmit={handleCreateSurvey} isSubmitting={isCreating} />
    </div>
  );
};

export default Create;
