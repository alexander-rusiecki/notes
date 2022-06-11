const stytchConnection = require('../connections/stytchConnection');
const client = stytchConnection();
require('dotenv').config();

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const params = { email };
    const response = await client.otps.email.send(params);
    res.json(response);
  } catch (error) {
    res.json({ msg: error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { method_id, code } = req.body;
    const response = await client.otps.authenticate({
      method_id,
      code,
      session_duration_minutes: 15 * 24 * 60,
    });
    const { session_token, user_id } = response;
    res.cookie('x-stytch-session-token', session_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    res.json({ user_id });
  } catch (error) {
    res.json({ msg: error });
  }
};

const getLoggedInStatus = (req, res) => {
  try {
    const session_token = req.signedCookies['x-stytch-session-token'];
    if (session_token) {
      res.json({ isLoggedIn: true });
    }
    res.json({ isLoggedIn: false });
  } catch (error) {
    res.json({ msg: error });
  }
};

const deleteToken = async (req, res) => {
  try {
    const session_token = req.signedCookies['x-stytch-session-token'];
    await client.sessions.revoke({ session_token });
    res.clearCookie('x-stytch-session-token');
    res.json({ msg: 'Token deleted' });
  } catch (error) {
    res.json({ msg: error });
  }
};

module.exports = { sendEmail, verifyEmail, deleteToken, getLoggedInStatus };
