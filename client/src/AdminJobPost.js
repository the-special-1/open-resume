// src/components/AdminJobPost.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AdminJobPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/jobs', {
        title,
        description,
        skillsRequired,
      });
      alert('Job posted successfully!');
      // Clear form fields after submission
      setTitle('');
      setDescription('');
      setSkillsRequired('');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Post a Job</h1>
      <div>
        <label>Job Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Skills Required:</label>
        <input 
          type="text" 
          value={skillsRequired} 
          onChange={(e) => setSkillsRequired(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Post Job</button>
    </form>
  );
};

export default AdminJobPost;