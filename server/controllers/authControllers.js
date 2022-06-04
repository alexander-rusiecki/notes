const stytchConnection = require('../connections/stytchConnection');
const client = stytchConnection();
require('dotenv').config();

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const params = { email };
    const response = await client.otps.email.loginOrCreate(params);
    res.json(response);
  } catch (error) {
    console.log(error);
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
    console.log(response);
    res.json({ user_id });
  } catch (error) {
    console.log(error);
  }
};

const deleteToken = async (req, res) => {
  try {
    const session_token = req.signedCookies['x-stytch-session-token'];
    const response = await client.sessions.revoke({ session_token });
    res.clearCookie('x-stytch-session-token');
    res.sendStatus(204).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail, verifyEmail, deleteToken };
