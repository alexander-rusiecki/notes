const stytch = require('stytch');
require('dotenv').config();

const stytchConnection = () => {
  return new stytch.Client({
    project_id: process.env.PROJECT_ID,
    secret: process.env.PROJECT_SECRET,
    env: stytch.envs.test,
  });
};

module.exports = stytchConnection;
