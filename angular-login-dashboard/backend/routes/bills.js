const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

router.get('/', async (req, res) => {
  const items = await Bill.find().sort({ createdAt: 1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  const created = await Bill.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
