import React from 'react';

import Landing from './components/Landing';
import Navbar from './components/Navbar';

import './styles.css';

const App = () => {
  return (
    <div className='container'>
      <Navbar />
      <Landing />
    </div>
  );
};

export default App;
