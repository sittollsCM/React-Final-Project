import React, { Component } from 'react';

const withLogging = (WrappedComponent) => {
  return class WithLogging extends Component {
    componentDidMount() {
      console.log(`Component ${WrappedComponent.name} is mounted.`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLogging;
