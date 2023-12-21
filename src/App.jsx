import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateSurvey from './Components/CreateSurvey';
import SurveyList from './Components/SurveyList';
import Participation from './Components/Participation';
import ErrorBoundary from './context/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <div className="app-container">
            <nav>
              <ul>
                <li>
                  <Link to="/" className="active-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="active-link">
                    Create Survey
                  </Link>
                </li>
                <li>
                  <Link to="/surveys" className="active-link">
                    Survey List
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="routes-container">
              <Routes>
                <Route path="/create" element={<CreateSurvey />} />
                <Route path="/surveys" element={<SurveyList />} />
                <Route path="/participate/:surveyId" element={<Participation />} />
              </Routes>
            </div>
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
};

export default App;
