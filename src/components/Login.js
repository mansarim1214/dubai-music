import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const navigate = useNavigate();




  return (
    <div className='bg-custom'>
      <div className='container'>
        <h2>Login</h2>
        <form>
          <div className='form-group'>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control'
            />
          </div>
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          <button type="submit" className='btn btn-lg btn-dark'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
