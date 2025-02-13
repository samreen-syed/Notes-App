const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// Get all notes for a user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new note
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = new Note({
      userId: req.user.userId,
      title,
      description
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle note completion
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.completed = !note.completed;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a note
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title;
    note.description = description;
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single note
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 