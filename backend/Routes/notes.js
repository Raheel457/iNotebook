const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../Models/Notes");
const router = express.Router();

// Route: 1 Get notes from user at /fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// Route: 2 Create/Add notes at /addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 7 }),
  ],
  async (req, res) => {
    try {
      // Destructuring req body.
      const { title, description, tag } = req.body;
      // Return bad request on error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation error");
        return res.status(400).json({ errors: errors.array() });
      }
      // Saving notes if there is no error
      const note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Some error Happened");
    }
  }
);

// Route: 3 Update already existing note at /updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //  Making an object of note which needs to updated
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Finding the note from db which needs to updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ Status: "Note Updated", note });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some error Happened");
  }
});

// Route: 4 Delete already existing note at /deletenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Finding the note from db which needs to updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Status: "Note Deleted", note });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Some error Happened");
  }
});
module.exports = router;
