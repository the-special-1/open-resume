// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AdminJobPost from './AdminJobPost'; // Your existing component for admin tasks
import Table from './Table'; // Your existing table component
import SignIn from './auth/Signin'; // Import the SignUp component if needed
import SignUp from './auth/signup'; // Import the SignIn component
import AdminPage from './components/Admin'; // Import the AdminPage 
const App = () => {
  return (
    <Router>
      <nav>
        {/* Navigation links */}
        <a href="/">Home</a>
        <a href="http://localhost:3000/resume-import">Resume Parser</a>
        <a href="http://localhost:3000/resume-builder">Resume Builder</a>
        <a href="/signup">Sign Up</a> {/* Link to Sign Up page */}
        <a href="/signin">Sign In</a> {/* Link to Sign In page */}
      </nav>
      <Routes>
        <Route path="/signup" element={<SignUp />} /> {/* Route for Sign Up */}
        <Route path="/signin" element={<SignIn />} /> {/* Route for Sign In */}
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<AdminJobPost />} /> {/* Admin route */}
        <Route path="/table" element={<Table />} /> {/* Admin route for Table */}
      </Routes>
    </Router>
  );
};

export default App;