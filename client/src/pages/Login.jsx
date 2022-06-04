import { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
  const [method_id, setMethod_id] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const requestOTP = async e => {
    e.preventDefault();
    try {
      if (!email) return;
      const response = await axios.post(
        'http://localhost:4000/send-email',
        { email },
        { withCredentials: true }
      );
      console.log(response.data);
      setMethod_id(response.data.email_id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const verifyOTP = async e => {
    e.preventDefault();
    try {
      if (!method_id || !code) return;
      const response = await axios.post(
        'http://localhost:4000/verify-otp',
        { method_id, code },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main className="login-container">
      {!method_id && (
        <form onSubmit={requestOTP}>
          <h2>Login or Sign-up</h2>
          <p>Please use your email to get OTP for login or sign-up</p>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit">Request OTP</button>
        </form>
      )}
      {method_id && (
        <div>
          <form onSubmit={verifyOTP}>
            <h2>Enter your OTP</h2>
            <p>Check your email and use the OTP sent to you.</p>
            <input
              type="number"
              id="otp"
              name="otp"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button type="submit">Verify OTP</button>
          </form>
          <button
            className="change-email"
            onClick={async () => {
              const response = await axios.post(
                'http://localhost:4000',
                {},
                { withCredentials: true }
              );
              console.log(response.data);
            }}
          >
            Change Email
          </button>
        </div>
      )}
    </main>
  );
}

export default Login;
