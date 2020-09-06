import React from 'react';

const Ads = () => {
  const style = {
    border: 'none',
  };
  return (
    <div
      style={{
        position: 'fixed',
        width: '728',
        height: '90',
        bottom: '0',
        left: '0',
        backgroundColor: 'red',
      }}>
      <iframe
        src='//rcm-na.amazon-adsystem.com/e/cm?o=15&p=48&l=ur1&category=amazonhomepage&f=ifr&linkID=507fd0cebea662d7ca6170114384246b&t=owlpiece-20&tracking_id=owlpiece-20'
        width='728'
        height='90'
        scrolling='no'
        border='0'
        marginWidth='0'
        style={style}
        frameBorder='0'></iframe>
    </div>
  );
};

export default Ads;
