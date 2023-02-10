const express = require('express');
const router = express.Router();
const fetchUser = require('./../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require('./../models/Notes');
const { route } = require('./auth');

// Finding all notes of a particular user - "/api/notes/fetchAllNotes"
router.get('/fetchAllNotes', fetchUser, async(req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Adding note for a particular user - "/api/notes/addNote"
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        // error checking
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({ title, description, tag, user: req.user.id });
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Update a note put - "/api/notes/updateNote"

router.put('/updateNote/:id', fetchUser, async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        let newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // updating the note
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Authorized to do");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
})

// Delete a note by its ID using delete - '/api/notes/deleteNote/:id'

router.delete('/deleteNote/:id', fetchUser, async(req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Note not found") }
        // not allow to delete others notes
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Authorized to do this");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;