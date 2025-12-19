const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");

// GET all schedules
router.get("/", async (req, res) => {
  try {
    const items = await Schedule.find().sort({ createdAt: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const created = await Schedule.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE (INI KUNCI FIX BUG KAMU)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Schedule.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ success: true, deletedId: deleted._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
