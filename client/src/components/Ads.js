import React from 'react';

const Ads = () => {
  return (
    <iframe
      title='the ad'
      src='//rcm-na.amazon-adsystem.com/e/cm?o=15&p=48&l=ur1&category=student&banner=0HCQMYZM6QTZ3ZA40082&f=ifr&linkID=8a22a5c2e837cd93800d4d0c55ce7e93&t=owlpiece-20&tracking_id=owlpiece-20'
      width='728'
      height='90'
      scrolling='no'
      border='0'
      marginWidth='0'
      className='ad'
      style={{
        border: 'none',
        backgroundColor: 'yellow',
        position: 'fixed',
        bottom: '0',
        left: '50%',
      }}
      frameBorder='0'></iframe>
  );
};

export default Ads;
