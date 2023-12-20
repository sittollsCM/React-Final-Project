// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Survey App</h2>
      <p>
        This is a simple survey creation app. Get started by{' '}
        <Link to="/create">creating a survey</Link> or view existing surveys on
        the <Link to="/surveys">survey list</Link>.
      </p>
    </div>
  );
};

export default Home;
