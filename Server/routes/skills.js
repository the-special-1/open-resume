// routes/skills.js
const express = require('express');
const router = express.Router();
const Joblist = require('../models/Job'); // Adjust this import based on your structure

// GET /api/skills - Retrieve all skills required from joblist
router.get('/', async (req, res) => {
  try {
    const jobs = await Joblist.findAll(); // Fetch all jobs from the joblist table
    const skills = jobs.map(job => job.skillsRequired.split(',').map(skill => skill.trim().toLowerCase())); // Extract skills and normalize them
    const uniqueSkills = [...new Set(skills.flat())]; // Flatten and get unique skills
    res.status(200).json(uniqueSkills); // Send unique skills as response
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

module.exports = router;