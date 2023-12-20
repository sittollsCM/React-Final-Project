// SurveyAPI.jsx
const SurveyAPI = {
  getAllSurveys: async () => {
    try {
      // Retrieve surveys from local storage
      const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
      return surveys;
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw error;
    }
  },

  saveSurvey: async (surveyData) => {
    try {
      // Retrieve existing surveys from local storage
      const existingSurveys = JSON.parse(localStorage.getItem('surveys')) || [];

      // Add the new survey data to the array
      existingSurveys.push(surveyData);

      // Save the updated array back to local storage
      localStorage.setItem('surveys', JSON.stringify(existingSurveys));

      console.log('Survey saved successfully:', surveyData);
    } catch (error) {
      console.error('Error saving survey:', error);
      throw error;
    }
  },
};

export default SurveyAPI;
