import React, { useState } from 'react';
import Modal from 'react-modal';

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <nav className='navbar'>
      <div className='logo'>
        <svg
          width='42'
          height='42'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M13 9H17V15H13V9Z' fill='#dbdb00' fillOpacity='0.5' />
          <path d='M7 6H11V18H7V6Z' fill='#0f9d58' />
        </svg>
        <h1 className='logo-title'>Amazon Owl</h1>
      </div>
      <div className='nav-link' onClick={handleModal}>
        How it works.
      </div>
      <Modal
        isOpen={openModal}
        style={{ border: 'none', borderRadius: '0px' }}
        ariaHideApp={false}>
        <div className='close' onClick={handleModal}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z'
              fill='currentColor'
            />
          </svg>
        </div>

        <div className='modal-text'>
          <h1 className='modal-title'>How it works.</h1>
          <div>
            Our website is used to keep track of product prices on Amazon so you
            don't have to!
            <ul className='list'>
              <li>Once you find a product on Amazon, copy it's URL</li>
              <li>Paste the URL into the required field</li>
              <li>
                Enter your Email in order for us to notify you (Don't worry you
                can opt out at any time)
              </li>
              <li>Click Submit</li>
            </ul>
            That's it! Now there is no need to check the product everyday, we
            will do that for you. You will get an email when the price has gone
            down.
            <h1 className='modal-title'>Get in touch.</h1>
            <div>
              If you need assistance, have any questions about the product or
              myself, my email is:{' '}
              <a
                className='contact-link'
                href='mailto:chriscosentino@hotmail.com'>
                chriscosentino@hotmail.com
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
