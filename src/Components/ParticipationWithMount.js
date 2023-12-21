import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import ParticipationForm from './ParticipationForm';
import '../App.css';
import './Participation.css';

class Participation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      survey: null,
      submitted: false,
      responses: {},
    };
  }

  componentDidMount() {
    this.fetchSurvey();
  }

  componentDidUpdate(prevProps) {
    const { surveyId } = this.props.match.params;
    if (surveyId !== prevProps.match.params.surveyId) {
      this.fetchSurvey();
    }
  }

  fetchSurvey() {
    const { surveyId } = this.props.match.params;
    const savedSurveys = JSON.parse(localStorage.getItem('savedSurveys')) || [];
    const survey = savedSurveys.find((s) => s.title === decodeURIComponent(surveyId));

    this.setState({ survey });
  }

  handleSubmit = (responses) => {
    const { survey } = this.state;
    const attempts = JSON.parse(localStorage.getItem('attempts')) || [];
    const newAttempt = { surveyId: survey.title, responses };
    const updatedAttempts = [...attempts, newAttempt];
    localStorage.setItem('attempts', JSON.stringify(updatedAttempts));

    this.setState({ submitted: true });
  };

  render() {
    const { survey, submitted, responses } = this.state;

    return (
      <div className="participate-container">
        {survey ? (
          <div>
            <h2>{survey.title}</h2>
            {submitted ? (
              <p>Thank you for participating! You have already submitted your responses.</p>
            ) : (
              <ParticipationForm
                survey={survey}
                responses={responses}
                setResponses={(responses) => this.setState({ responses })}
                onSubmit={this.handleSubmit}
              />
            )}
          </div>
        ) : (
          <p>Survey not found.</p>
        )}
      </div>
    );
  }
}

export default Participation;
