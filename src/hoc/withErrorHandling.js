import React, { Component } from 'react';
import ErrorIndicator from '../errors/ErrorIndicator';

const withErrorHandling = (WrappedComponent) => {
  return class WithErrorHandling extends Component {
    state = {
      hasError: false,
    };

    componentDidCatch(error, errorInfo) {
      console.error('Error caught by withErrorHandling HOC:', error, errorInfo);
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return <ErrorIndicator />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorHandling;
