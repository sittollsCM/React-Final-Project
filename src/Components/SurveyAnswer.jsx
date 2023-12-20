import React from 'react';

const SurveyAnswer = ({ answer = {}, onRemove, onUpdate }) => {
  const handleTextChange = (e) => {
    onUpdate({ ...answer, text: e.target.value });
  };

  return (
    <div>
      <label htmlFor={`answer${answer.id || ''}`}>Answer {answer.id || ''}</label>
      <button type="button" onClick={onRemove}>
        Remove Answer
      </button>
      <input
        type="text"
        value={answer.text || ''}
        onChange={handleTextChange}
        placeholder={`Enter answer ${answer.id || ''}`}
        required
      />
    </div>
  );
};

export default SurveyAnswer;
