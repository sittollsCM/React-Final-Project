import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SurveyAPI from '../Components/SurveyAPI';

const SurveyListPage = ({ surveys }) => {
  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const surveysData = await SurveyAPI.getAllSurveys();
      setSurveys(surveysData);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  return (
    <div className="container">
      <h2>Survey List</h2>
      {surveys.length === 0 ? (
        <p>No surveys available. Create a new survey!</p>
      ) : (
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id}>
              <Link to={`/survey/${survey.id}`}>{survey.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyListPage;
