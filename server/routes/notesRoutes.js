const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  createNote,
  updateNote,
  getNote,
  deleteNote,
} = require('../controllers/notesControllers');

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;
