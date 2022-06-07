import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
  const [method_id, setMethod_id] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef(null);
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

  useEffect(() => {
    inputRef.current.focus();
  }, [method_id]);

  return (
    <main className="login-container">
      {!method_id && (
        <form onSubmit={requestOTP}>
          <h2>Login</h2>
          <p>
            Please enter your email to get a<span> One Time Password</span> to
            login
          </p>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="email"
            ref={inputRef}
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
              value={code}
              ref={inputRef}
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
