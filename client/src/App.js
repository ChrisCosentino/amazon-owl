import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import Landing from './components/Landing';
import Navbar from './components/Navbar';

import './styles.css';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <NotificationContainer />
        {/* <Landing /> */}
      </Router>
    </div>
  );
};

export default App;
