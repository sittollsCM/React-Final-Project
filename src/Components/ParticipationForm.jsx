import React from 'react';
import ParticipationQuestion from './ParticipationQuestion';
import '../App.css';

const ParticipationForm = ({ survey, responses, setResponses, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(responses);
  };

  return (
    <form onSubmit={handleSubmit} className="participation-form">
      {survey.questions.map((question) => (
        <ParticipationQuestion key={question.id} question={question} responses={responses} setResponses={setResponses} />
      ))}
      <button type="submit" className="btn btn-primary">Submit Survey</button>
    </form>
  );
};

export default ParticipationForm;
