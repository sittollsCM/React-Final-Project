// ParticipationQuestion.jsx
import React from 'react';

const ParticipationQuestion = ({ question, responses, setResponses }) => {
  return (
    <div className="participation-question">
      <label className="participation-label">{question.text}</label>
      <br /> <br />
      {question.type === 'singleChoice' ? (
        <select
          value={responses[question.id] || ''}
          onChange={(e) =>
            setResponses((prev) => ({ ...prev, [question.id]: e.target.value }))
          }
          required
          className="form-select"
        >
          <option value="" disabled>
            Select an option
          </option>
          {question.answers.map((answer) => (
            <option key={answer.id} value={answer.text}>
              {answer.text}
            </option>
          ))}
        </select>
      ) : question.type === 'multipleChoice' ? (
        <div>
          {question.answers.map((answer) => (
            <div key={answer.id} className="form-check">
              <input
                type="checkbox"
                id={`answer_${question.id}_${answer.id}`}
                checked={responses[question.id]?.includes(answer.text) || false}
                onChange={(e) => {
                  const selectedResponses = responses[question.id] || [];
                  if (e.target.checked) {
                    selectedResponses.push(answer.text);
                  } else {
                    const index = selectedResponses.indexOf(answer.text);
                    if (index !== -1) {
                      selectedResponses.splice(index, 1);
                    }
                  }
                  setResponses((prev) => ({ ...prev, [question.id]: selectedResponses }));
                }}
                className="form-check-input"
              />
              <label
                htmlFor={`answer_${question.id}_${answer.id}`}
                className="form-check-label"
              >
                {answer.text}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <textarea
          value={responses[question.id] || ''}
          onChange={(e) =>
            setResponses((prev) => ({ ...prev, [question.id]: e.target.value }))
          }
          className="form-control"
          rows="3"
          placeholder="Your answer..."
        ></textarea>
      )}
    </div>
  );
};

export default ParticipationQuestion;
