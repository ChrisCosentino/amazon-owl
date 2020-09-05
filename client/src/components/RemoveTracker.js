import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RemoveTracker = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await axios.delete(`/api/tracker/${match.params.trackerId}`);
        setLoading(false);
        setSuccess(true);
      } catch (err) {
        setLoading(false);
        setSuccess(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className='rm-container'>Loading</div>;
  }

  return (
    <div className='rm-container'>
      {success ? (
        <div className='rm'>
          Your tracker has been successfully removed
          <Link className='btn back' to='/'>
            Back to Home
          </Link>
        </div>
      ) : (
        <div className='rm'>
          There has been an error removing your tracker. Please try again
          <Link className='btn back' to='/'>
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default RemoveTracker;
