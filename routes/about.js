
const express = require('express');
const router = express.Router();
const About = require('../models/About');


router.get('/', async (req, res) => {
  try {
    const aboutItems = await About.find();
    res.json(aboutItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', getAbout, (req, res) => {
  res.json(res.about);
});


router.post('/', async (req, res) => {
  const about = new About({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  });

  try {
    const newAbout = await about.save();
    res.status(201).json(newAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.patch('/:id', getAbout, async (req, res) => {
  if (req.body.title != null) {
    res.about.title = req.body.title;
  }
  if (req.body.description != null) {
    res.about.description = req.body.description;
  }
  if (req.body.imageUrl != null) {
    res.about.imageUrl = req.body.imageUrl;
  }

  try {
    const updatedAbout = await res.about.save();
    res.json(updatedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', getAbout, async (req, res) => {
  try {
    await res.about.remove();
    res.json({ message: 'Deleted About Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getAbout(req, res, next) {
  let about;
  try {
    about = await About.findById(req.params.id);
    if (about == null) {
      return res.status(404).json({ message: 'Cannot find about item' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.about = about;
  next();
}

module.exports = router;
