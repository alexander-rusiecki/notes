const express = require('express');
const router = express.Router();
const {
  sendEmail,
  verifyEmail,
  deleteToken,
} = require('../controllers/authControllers');

router.route('/send-email').post(sendEmail);
router.route('/verify-otp').post(verifyEmail);
router.route('/logout').delete(deleteToken);

module.exports = router;
