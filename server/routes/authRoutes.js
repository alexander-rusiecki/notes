const express = require('express');
const router = express.Router();
const {
  sendEmail,
  verifyEmail,
  getLoggedInStatus,
  deleteToken,
} = require('../controllers/authControllers');

router.route('/send-email').post(sendEmail);
router.route('/verify-otp').post(verifyEmail);
router.route('/get-logged-in-status').get(getLoggedInStatus);
router.route('/logout').delete(deleteToken);

module.exports = router;
