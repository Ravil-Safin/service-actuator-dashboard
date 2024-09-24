// src/App.js
import React, { useState } from 'react';
import Dashboard from './Dashboard';

const App = () => {
  const [baseUrl, setBaseUrl] = useState('');

  const handleBaseUrlChange = (event) => {
    setBaseUrl(event.target.value);
  };

  return (
    <div>
      <h1>Service Dashboard</h1>
      <label htmlFor="base-url">Select Base URL:</label>
      <select id="base-url" value={baseUrl} onChange={handleBaseUrlChange}>
        <option value="">-- Select a URL --</option>
        <option value="https://first-env.com">First environment</option>
        <option value="https://second-env.com">Second environment</option>
      </select>
      {baseUrl && <Dashboard baseUrl={baseUrl} />}
    </div>
  );
};

export default App;
