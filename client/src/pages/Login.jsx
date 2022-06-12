import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import 'styles/login.css';

function Login() {
  const [method_id, setMethod_id] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const requestOTP = async e => {
    e.preventDefault();
    try {
      if (!email) return;
      const response = await axios.post(
        'http://localhost:4000/api/v1/auth/send-email',
        { email },
        { withCredentials: true }
      );
      if (response.data.status_code === 200) {
        setMethod_id(response.data.email_id);
      } else {
        setErrorMsg(response.data.msg.error_message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async e => {
    e.preventDefault();
    try {
      if (!method_id || !code) return;
      await axios.post(
        'http://localhost:4000/api/v1/auth/verify-otp',
        { method_id, code },
        { withCredentials: true }
      );
      navigate('/notes');
    } catch (error) {
      setErrorMsg(error.message.msg.error_message);
    }
  };

  const getLoggedInStatus = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:4000/api/v1/auth/get-logged-in-status',
        { withCredentials: true }
      );
      setIsLoggedIn(response.data.isLoggedIn);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoggedInStatus();
  }, []);

  if (isLoading) {
    return (
      <main className="loading">
        <HourglassTopTwoToneIcon style={{ color: '#2c5784' }} />
      </main>
    );
  }

  if (isLoggedIn) {
    return (
      <main className="login-container">
        <h2>You are logged in 🤙🏼</h2>
      </main>
    );
  }

  return (
    <main className="login-container">
      {!method_id && (
        <form onSubmit={requestOTP}>
          <h2>Login</h2>
          <p>
            Please enter your email to get a<span> One Time Password</span>
          </p>
          <input
            type="email"
            id="email"
            name="email"
            autoFocus
            required
            value={email}
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
          <p className="error-message">{errorMsg ? errorMsg : ''}</p>
          <button type="submit">Request OTP</button>
        </form>
      )}
      {method_id && (
        <div>
          <form onSubmit={verifyOTP}>
            <h2>Enter your OTP</h2>
            <p>
              Check your email and use the{' '}
              <span className="bold">One Time Password</span> sent to you.
            </p>
            <input
              type="number"
              id="otp"
              name="otp"
              autoFocus
              required
              placeholder="one time password"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button type="submit">Verify OTP</button>
          </form>
        </div>
      )}
    </main>
  );
}

export default Login;
