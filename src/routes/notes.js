const express = require('express');
const router = express.Router();

const Note = require('../models/Notes');

router.get('/', async (req, res) => {
  // res.send('API is working');
  const notes = await Note.find();
  // console.log(notes);
  res.json(notes);
});

router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

router.post('/', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json({
    status: 'Note saved!',
  });
});

router.put('/:id', async (req, res) => {
  // console.log(req.params);
  await Note.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Note updated',
  });
});

router.delete('/:id', async (req, res) => {
  // console.log(req.params.id);
  await Note.findByIdAndRemove(req.params.id);
  res.json({
    status: 'Note deleted',
  });
});

module.exports = router;
