import React, { useState } from 'react';
import axios from 'axios';

const Landing = () => {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const [email, setEmail] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/tracker', {
        url: search,
        email: email,
      });
      console.log(res.data);
    } catch (err) {
      console.log('error posting');
    }
  };

  return (
    <div className='landing-container'>
      <h1 className='title'>Track your items.</h1>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className='text-input-container'>
          <input
            className='text-input'
            type='text'
            placeholder='Enter the amazon url'
            onChange={handleSearch}
            value={search}
          />
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12 8.88916C13.6569 8.88916 15 10.2323 15 11.8892C15 13.1954 14.1652 14.3066 13 14.7185V19.8892H11V14.7185C9.83481 14.3066 9 13.1954 9 11.8892C9 10.2323 10.3431 8.88916 12 8.88916ZM12 10.8892C12.5523 10.8892 13 11.3369 13 11.8892C13 12.4414 12.5523 12.8892 12 12.8892C11.4477 12.8892 11 12.4414 11 11.8892C11 11.3369 11.4477 10.8892 12 10.8892Z'
              fill='currentColor'
            />
            <path
              d='M7.05019 6.93938C5.78348 8.20612 5 9.9561 5 11.8891C5 14.0666 5.99426 16.0119 7.55355 17.2957L8.97712 15.8721C7.7757 14.9589 7 13.5146 7 11.8891C7 10.5084 7.55962 9.25841 8.46441 8.35359L7.05019 6.93938Z'
              fill='currentColor'
            />
            <path
              d='M15.5355 8.35348C16.4403 9.25831 17 10.5083 17 11.8891C17 13.5146 16.2243 14.959 15.0228 15.8722L16.4463 17.2958C18.0057 16.012 19 14.0666 19 11.8891C19 9.95604 18.2165 8.20602 16.9497 6.93927L15.5355 8.35348Z'
              fill='currentColor'
            />
            <path
              d='M1 11.8891C1 8.85152 2.23119 6.10155 4.22176 4.11095L5.63598 5.52516C4.00733 7.15383 3 9.40381 3 11.8891C3 14.3743 4.00733 16.6243 5.63597 18.2529L4.22175 19.6672C2.23119 17.6766 1 14.9266 1 11.8891Z'
              fill='currentColor'
            />
            <path
              d='M19.7781 19.6673C21.7688 17.6767 23 14.9266 23 11.8891C23 8.85147 21.7688 6.10145 19.7781 4.11084L18.3639 5.52505C19.9926 7.15374 21 9.40376 21 11.8891C21 14.3744 19.9926 16.6244 18.3639 18.2531L19.7781 19.6673Z'
              fill='currentColor'
            />
          </svg>
        </div>
        <div className='text-input-container'>
          <input
            className='text-input'
            type='text'
            placeholder='Enter your email'
            onChange={handleEmail}
            value={email}
          />
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M17 9H7V7H17V9Z' fill='currentColor' />
            <path d='M7 13H17V11H7V13Z' fill='currentColor' />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2 18V2H22V18H16V22H14C11.7909 22 10 20.2091 10 18H2ZM12 16V18C12 19.1046 12.8954 20 14 20V16H20V4H4V16H12Z'
              fill='currentColor'
            />
          </svg>
        </div>
        <button className='btn' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Landing;
