import React from 'react';
import SurveyAnswer from './SurveyAnswer';

const SurveyQuestion = ({ question = {}, onRemove, onUpdate }) => {
  const handleTextChange = (e) => {
    onUpdate({ ...question, text: e.target.value });
  };

  const handleTypeChange = (e) => {
    onUpdate({ ...question, type: e.target.value, answers: [] });
  };

  const addAnswer = () => {
    onUpdate({
      ...question,
      answers: [
        ...(question.answers || []),
        { id: (question.answers || []).length + 1, text: '' },
      ],
    });
  };

  const removeAnswer = (id) => {
    onUpdate({ ...question, answers: (question.answers || []).filter((answer) => answer.id !== id) });
  };

  const updateAnswer = (id, updatedAnswer) => {
    onUpdate({
      ...question,
      answers: (question.answers || []).map((answer) => (answer.id === id ? updatedAnswer : answer)),
    });
  };

  const renderAnswers = () => {
    if (question.answers && Array.isArray(question.answers)) {
      return question.answers.map((answer) => (
        <SurveyAnswer
          key={`answer-${answer.id}`}
          answer={answer}
          onRemove={() => removeAnswer(answer.id)}
          onUpdate={(updatedAnswer) => updateAnswer(answer.id, updatedAnswer)}
        />
      ));
    }
    return null;
  };

  return (
    <div>
      <label htmlFor={`question${question.id || ''}`}>Question {question.id || ''}</label>
      <button type="button" onClick={onRemove}>
        Remove Question
      </button>
      <input
        type="text"
        value={question.text || ''}
        onChange={handleTextChange}
        placeholder={`Enter question ${question.id || ''}`}
        required
      />

      <label htmlFor={`questionType${question.id || ''}`}>Question Type</label>
      <select value={question.type || ''} onChange={handleTypeChange}>
        <option value="singleChoice">Single Choice</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="openQuestion">Open Question</option>
      </select>

      <div>{renderAnswers()}</div>

      {question.type !== 'openQuestion' && (
        <button type="button" onClick={addAnswer}>
          Add Answer
        </button>
      )}
    </div>
  );
};

export default SurveyQuestion;
