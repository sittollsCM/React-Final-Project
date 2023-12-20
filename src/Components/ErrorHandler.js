// src/components/ErrorHandler.js
import React, { useState } from 'react';

const ErrorHandler = ({ children }) => {
  const [error, setError] = useState(null);

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}
      {children({ handleError })}
    </div>
  );
};

export default ErrorHandler;
