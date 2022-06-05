const stytchConnection = require('../connections/stytchConnection');
const client = stytchConnection();

const verifyToken = async (req, res, next) => {
  try {
    const session_token = req.signedCookies['x-stytch-session-token'];
    const response = await client.sessions.authenticate({
      session_token: session_token,
    });
    req.user_id = response.session.user_id;
    next();
  } catch (error) {
    res.json({ msg: error });
  }
};

module.exports = verifyToken;
