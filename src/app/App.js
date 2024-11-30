// app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResumeTable from './path/to/ResumeTable'; // Adjust the import path
import ResumeBuilder from './path/to/ResumeBuilder'; // Adjust the import path
import ResumeParser from './path/to/ResumeParser'; // Adjust the import path
// import AdminPage from './path/to/AdminPage'; // Adjust the import path

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ResumeBuilder} />
        <Route path="/resume-parser" component={ResumeParser} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/resume-table" component={ResumeTable} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
