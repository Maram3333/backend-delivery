
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');


router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', getReview, (req, res) => {
  res.json(res.review);
});


router.post('/', async (req, res) => {
  const review = new Review({
    name: req.body.name,
    review: req.body.review
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.patch('/:id', getReview, async (req, res) => {
  if (req.body.name != null) {
    res.review.name = req.body.name;
  }
  if (req.body.review != null) {
    res.review.review = req.body.review;
  }

  try {
    const updatedReview = await res.review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getReview, async (req, res) => {
  try {
    await res.review.remove();
    res.json({ message: 'Deleted Review' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getReview(req, res, next) {
  let review;
  try {
    review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: 'Cannot find review' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.review = review;
  next();
}

module.exports = router;
