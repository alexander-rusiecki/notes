const express = require('express');
const router = express.Router();
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesControllers');

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').put(updateNote).delete(deleteNote);
// router.route('/create').post(createNote);
// router.route('/update:id').put(updateNote);
// router.route('/delete:id').delete(updateNote);

module.exports = router;
