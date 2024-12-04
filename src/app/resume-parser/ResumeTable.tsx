import React, { Fragment, useState ,useEffect} from "react";
import type { Resume } from "lib/redux/types";
import { initialEducation, initialWorkExperience } from "lib/redux/resumeSlice";
import { deepClone } from "lib/deep-clone";
import { cx } from "lib/cx";
import axios from 'axios'; // Make sure axios is installed

const TableRowHeader = ({ children }: { children: React.ReactNode }) => (
  <tr className="divide-x bg-gray-50">
    <th className="px-3 py-2 font-semibold" scope="colgroup" colSpan={2}>
      {children}
    </th>
  </tr>
);

const TableRow = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | string[];
  className?: string | false;
}) => (
  <tr className={cx("divide-x", className)}>
    <th className="px-3 py-2 font-medium" scope="row">
      {label}
    </th>
    <td className="w-full px-3 py-2">
      {typeof value === "string"
        ? value
        : value.map((x, idx) => (
            <Fragment key={idx}>
              • {x}
              <br />
            </Fragment>
          ))}
    </td>
  </tr>
);

export const ResumeTable = ({ resume }: { resume: Resume }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [score, setScore] = useState(0); // State to store the score
  const [keywords, setKeywords] = useState<string[]>([]); // State to store fetched keywords

  // Function to fetch keywords from the joblist table
  const fetchKeywords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/skills'); // Adjust endpoint as necessary
      setKeywords(response.data); // Store fetched keywords in state
      console.log("Fetched Keywords:", response.data); // Debugging log
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };
  const educations =
    resume.educations.length === 0
      ? [deepClone(initialEducation)]
      : resume.educations;

  const workExperiences =
    resume.workExperiences.length === 0
      ? [deepClone(initialWorkExperience)]
      : resume.workExperiences;

  const skills = [...resume.skills.descriptions];

  const featuredSkills = resume.skills.featuredSkills
    .filter((item) => item.skill.trim())
    .map((item) => item.skill)
    .join(", ")
    .trim();

  if (featuredSkills) {
    skills.unshift(featuredSkills);
  }

  // Function to submit the resume data to the backend
  const submitResumeData = async () => {
    try {
      await axios.post('http://localhost:5000/api/resumes', {
        name: resume.profile.name,
        email: resume.profile.email,
        phone: resume.profile.phone,
        location: resume.profile.location,
        url: resume.profile.url,
        summary: resume.profile.summary,
        education: educations,
        work_experience: workExperiences,
        projects: resume.projects,
        skills
      });

      // After submitting, fetch the data from the database
      fetchData();

      // Open the modal to show results
      setModalIsOpen(true);
      
    } catch (error) {
      console.error('Error submitting resume:', error);
      // Handle error appropriately here
    }
  };

  // Function to fetch data from the database
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resumes'); // Adjust endpoint as necessary
      setFetchedData(response.data); // Store fetched data in state
      
    } catch (error) {
      console.error('Error fetching resumes:', error);
      // Handle error appropriately here
    }
  };

  const handleGoBack = () => {
    // Redirect to the React admin page
    window.location.href = 'http://localhost:3001'; // Change this to your actual admin page URL and port
  };

  // Function to calculate skill score based on keyword matching
  const calculateSkillScore = () => {
    let matchCount = 0;

    // Clean and normalize user's skills
    const userSkillsSet = new Set(
      resume.skills.descriptions.flatMap(skill => 
        skill.split(/[, ]+/).map(s => s.trim()) // Split by comma or space and trim whitespace
      ).filter(skill => skill.length > 0) // Remove empty strings
       .map(skill => skill.replace(/[^\x20-\x7E]/g, '')) // Remove non-printable characters
       .map(skill => skill.toLowerCase()) // Normalize case
    );

    console.log("User Skills:", Array.from(userSkillsSet)); // Debugging log

    // Check if any of the user's unique skills match the keywords
    userSkillsSet.forEach(skill => {
      console.log("Checking skill:", skill); // Debugging log
      if (keywords.includes(skill)) {
        matchCount += 1; // Increment match count for each unique keyword found
      }
    });

    // Calculate score as a percentage of matches against total keywords
    const totalKeywords = keywords.length;
    const calculatedScore = totalKeywords > 0 ? (matchCount / totalKeywords) * 100 : 0;

    console.log("Match Count:", matchCount); // Debugging log
    console.log("Calculated Score:", calculatedScore); // Debugging log

    setScore(calculatedScore); // Set total score to state
  };

  useEffect(() => {
    fetchKeywords(); // Fetch keywords when component mounts

    if (modalIsOpen) {
      calculateSkillScore(); // Calculate score when modal opens
    }
  }, [modalIsOpen]); // Run when modalIsOpen changes
 
  return (
    <div>
      <table className="mt-2 w-full border text-sm text-gray-900">
        <tbody className="divide-y text-left align-top">
          <TableRowHeader>Profile</TableRowHeader>
          <TableRow label="Name" value={resume.profile.name} />
          <TableRow label="Email" value={resume.profile.email} />
          <TableRow label="Phone" value={resume.profile.phone} />
          <TableRow label="Location" value={resume.profile.location} />
          <TableRow label="Link" value={resume.profile.url} />
          <TableRow label="Summary" value={resume.profile.summary} />
          <TableRowHeader>Education</TableRowHeader>
          {educations.map((education, idx) => (
            <Fragment key={idx}>
              <TableRow label="School" value={education.school} />
              <TableRow label="Degree" value={education.degree} />
              <TableRow label="GPA" value={education.gpa} />
              <TableRow label="Date" value={education.date} />
              <TableRow
                label="Descriptions"
                value={education.descriptions}
                className={
                  educations.length - 1 !== 0 &&
                  idx !== educations.length - 1 &&
                  "!border-b-4"
                }
              />
            </Fragment>
          ))}
          <TableRowHeader>Work Experience</TableRowHeader>
          {workExperiences.map((workExperience, idx) => (
            <Fragment key={idx}>
              <TableRow label="Company" value={workExperience.company} />
              <TableRow label="Job Title" value={workExperience.jobTitle} />
              <TableRow label="Date" value={workExperience.date} />
              <TableRow
                label="Descriptions"
                value={workExperience.descriptions}
                className={
                  workExperiences.length - 1 !== 0 &&
                  idx !== workExperiences.length - 1 &&
                  "!border-b-4"
                }
              />
            </Fragment>
          ))}
          
          {resume.projects.length > 0 && (
            <TableRowHeader>Projects</TableRowHeader>
          )}
          {resume.projects.map((project, idx) => (
            <Fragment key={idx}>
              <TableRow label="Project" value={project.project} />
              <TableRow label="Date" value={project.date} />
              <TableRow
                label="Descriptions"
                value={project.descriptions}
                className={
                  resume.projects.length - 1 !== 0 &&
                  idx !== resume.projects.length - 1 &&
                  "!border-b-4"
                }
              />
            </Fragment>
          ))}
          <TableRowHeader>Skills</TableRowHeader>
          {/* Displaying user skills */}
          <TableRow label="Descriptions" value={skills} />
        </tbody>
      </table>

      {/* Button to submit the data */}
      <button onClick={submitResumeData} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Save Resume Data
      </button>
      <button 
        onClick={handleGoBack} 
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Go Back to Admin Page
      </button>
      {/* Simple Modal for displaying fetched data */}
      {modalIsOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    {/* Adjust width using Tailwind CSS classes */}
    <div className="bg-white p-5 rounded shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto"> {/* Wider modal and scrollable */}
      <h2 className="text-lg font-bold">Fetched Resumes</h2>
      {fetchedData.length > 0 ? (
        fetchedData.map(resume => (
          <div key={resume.id} className="mb-4">
            <h4 className="font-semibold">{resume.name}</h4>
            {/* Add other fields as necessary */}
            <p>Email: {resume.email}</p>
            <p>skills: {resume.skills}</p>
            {/* Add more details as needed */}
          </div>
        ))
      ) : (
        <p>No resumes found.</p>
      )}

      {/* Check Results Button */}
      <button 
        onClick={() => {
          calculateSkillScore(); 
          alert(`Your skill match score is: ${score.toFixed(2)}%`); // Display score in an alert for now
        }} 
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Check Results
      </button>
    
      {/* Close button for modal */}
      <button onClick={() => setModalIsOpen(false)} className="mt-4 bg-red-500 text-white p-2 rounded">
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};