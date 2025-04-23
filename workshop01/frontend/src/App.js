import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [randomString, setRandomString] = useState('');
  const [error, setError] = useState('');

  const fetchRandomString = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/random-string`);
      setRandomString(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch random string');
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    fetchRandomString();
  }, []);

  return (
    <div className="app">
      <h1>Hi!</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <p className="random-string">{randomString}</p>
      )}
      <h1>Repository: <a href="https://github.com/Jiajin/containers-course" target="_blank">https://github.com/Jiajin/containers-course</a></h1>
    </div>
  );
}

export default App;