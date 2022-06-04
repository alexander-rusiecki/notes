const express = require('express');
const router = express.Router();
const { getAllNotes } = require('../controllers/notesControllers');

router.route('/dashboard').get(getAllNotes);

module.exports = router;
