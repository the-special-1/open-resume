// src/App.js
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
// import Home from './components/Home'; // Your home component
// import About from './components/About'; // Another component if needed
import AdminJobPost from './AdminJobPost';
const App = () => {
  return (
    <Router>
      <nav>
        {/* <Link to="/">Home</Link>
        <Link to="/about">About</Link> */}
        <a href="http://localhost:3000/resume-import">Resume Import</a> {/* Link to Next.js route */}
        <a href="http://localhost:3000/resume-parser">Resume Parser</a> {/* Link to Next.js route */}
        <a href="http://localhost:3000/resume-builder">Resume builder</a> {/* Link to Next.js route */}
      </nav>
      <AdminJobPost/>
    </Router>
  );
};

export default App;