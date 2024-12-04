// routes/jobs.js
const express = require('express');
const router = express.Router();
const Joblist = require('../models/Job'); // Import the Job model

// POST /api/jobs - Create a new job listing
router.post('/', async (req, res) => {
  const { title, description, skillsRequired } = req.body;

  try {
    const newJob = await Joblist.create({
      title,
      description,
      skillsRequired,
    });
    return res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({ error: 'Failed to create job' });
  }
});

module.exports = router;