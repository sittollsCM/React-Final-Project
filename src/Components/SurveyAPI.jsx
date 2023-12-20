const SurveyAPI = {
  getAllSurveys: async () => {
    try {
      const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
      return surveys;
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw error;
    }
  },

  saveSurvey: async (surveyData) => {
    try {
      const existingSurveys = JSON.parse(localStorage.getItem('surveys')) || [];

      existingSurveys.push(surveyData);

      localStorage.setItem('surveys', JSON.stringify(existingSurveys));

      console.log('Survey saved successfully:', surveyData);
    } catch (error) {
      console.error('Error saving survey:', error);
      throw error;
    }
  },
};

export default SurveyAPI;
