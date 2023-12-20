// SurveyFilter.js
import React, { useState } from 'react';

const SurveyFilter = ({ onFilter }) => {
  const [filterType, setFilterType] = useState('');

  const handleFilter = () => {
    onFilter(filterType);
  };

  return (
    <div className="survey-filter">
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="">Select Filter</option>
        <option value="open">Open Surveys</option>
        <option value="closed">Closed Surveys</option>
      </select>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default SurveyFilter;
