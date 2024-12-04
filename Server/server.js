const express = require("express");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./config"); // Import the sequelize instance
const Vacancy = require("./models/Vacancy"); // Import the User model
const port = 5000;
const app= express();
const jobRoutes = require('./routes/Jobs');
const skillRoutes = require('./routes/skills'); // Import skill routes
app.use(cors());
app.use(bodyParser.json());

// Sync the database (create tables if they don't exist)
sequelize
  .sync()
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.error("Error creating database:", err));
  app.use(bodyParser.json()); // Middleware to parse JSON requests


  app.use('/api/jobs', jobRoutes);
  // Endpoint to post a resume
  app.post('/api/resumes', async (req, res) => {
      try {
          const { name, email, phone, location, url, summary, education, work_experience, projects, skills } = req.body;
  
          const newResume = await Vacancy.create({
              name,
              email,
              phone,
              location,
              url,
              summary,
              education,
              work_experience,
              projects,
              skills
          });
  
          res.status(201).send({ message: 'Resume posted successfully!', resumeId: newResume.id });
      } catch (error) {
          console.error('Error posting resume:', error);
          res.status(500).send({ error: 'Failed to post resume' });
      }
  });




  
  app.get('/api/resumes', async (req, res) => {
    try {
        const resumes = await Vacancy.findAll(); // Fetch all resumes from the database
        res.send(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).send({ error: 'Failed to fetch resumes' });
    }
});
app.use('/api/skills', skillRoutes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
