const express = require('express');
const router = express.Router();
const Birthday = require('../models/Birthday');


router.post('/add', async (req, res) => {
  try {
    const { name, birthdate } = req.body;
    const newBirthday = new Birthday({ name, birthdate });
    await newBirthday.save();
    res.status(201).json(newBirthday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/closest', async (req, res) => {
  try {
    const today = new Date();
    const birthdays = await Birthday.find();
    const closest = birthdays.reduce((prev, curr) => {
      const prevDiff = Math.abs(new Date(prev.birthdate).getTime() - today.getTime());
      const currDiff = Math.abs(new Date(curr.birthdate).getTime() - today.getTime());
      return currDiff < prevDiff ? curr : prev;
    });
    res.json(closest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:name', async (req, res) => {
  try {
    const birthday = await Birthday.findOne({ name: req.params.name });
    if (!birthday) return res.status(404).json({ error: 'Person not found' });
    res.json(birthday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:name', async (req, res) => {
  try {
    const { birthdate } = req.body;
    const updatedBirthday = await Birthday.findOneAndUpdate(
      { name: req.params.name },
      { birthdate },
      { new: true }
    );
    if (!updatedBirthday) return res.status(404).json({ error: 'Person not found' });
    res.json(updatedBirthday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:name', async (req, res) => {
  try {
    const deletedBirthday = await Birthday.findOneAndDelete({ name: req.params.name });
    if (!deletedBirthday) return res.status(404).json({ error: 'Person not found' });
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
