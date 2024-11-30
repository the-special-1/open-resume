import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [jobs, setJobs] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [scores, setScores] = useState({});

    useEffect(() => {
        // Fetch jobs and resumes when the component mounts
        const fetchData = async () => {
            try {
                const jobsResponse = await axios.get('http://localhost:5000/api/jobs'); // Adjust endpoint as necessary
                const resumesResponse = await axios.get('http://localhost:5000/api/resumes'); // Adjust endpoint as necessary
                setJobs(jobsResponse.data);
                setResumes(resumesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const evaluateResumes = (job) => {
        const newScores = {};

        resumes.forEach((resume) => {
            // Implement your scoring logic here
            const score = calculateScore(resume, job.description); // Define this function
            newScores[resume.id] = score;
        });

        setScores(newScores);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <h3 className="mt-4">Job Descriptions</h3>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h4>{job.title}</h4>
                        <p>{job.description}</p>
                        <button onClick={() => evaluateResumes(job)}>Evaluate Resumes</button>
                        {scores && scores[job.id] && (
                            <p>Score: {scores[job.id]}</p>
                        )}
                    </li>
                ))}
            </ul>

            <h3 className="mt-4">Resumes</h3>
            <ul>
                {resumes.map((resume) => (
                    <li key={resume.id}>
                        <h4>{resume.name}</h4>
                        <p>Email: {resume.email}</p>
                        {/* Add more resume details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;