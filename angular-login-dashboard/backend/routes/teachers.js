const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

router.get('/', async (req, res) => {
  const items = await Teacher.find().sort({ createdAt: 1 });
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const t = await Teacher.findById(req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json(t);
});

router.post('/', async (req, res) => {
  try {
    console.log('POST /api/teachers body:', req.body);
    if (!req.body || !req.body.name || String(req.body.name).trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }
    const created = await Teacher.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    console.error('Error creating teacher:', err && err.stack ? err.stack : err);
    // send validation message when available
    const message = err && err.message ? err.message : 'Failed to create teacher';
    return res.status(500).json({ message });
  }
});

router.put('/:id', async (req, res) => {
  const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
