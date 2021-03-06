import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import Landing from './components/Landing';
import Navbar from './components/Navbar';
import RemoveTracker from './components/RemoveTracker';

import './styles.css';
import Ads from './components/Ads';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route path='/rm/:trackerId' component={RemoveTracker} />
        <NotificationContainer />
        <Ads />
        {/* <Landing /> */}
      </Router>
    </div>
  );
};

export default App;
