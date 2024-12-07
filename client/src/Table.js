// src/components/CollapsibleTable.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

// Function to create data structure for the table
function createData(name, email, phone, summary, skills, workExperience) {
  return {
    name,
    email,
    phone,
    summary,
    skills,
    workExperience,
  };
}

// Row component for displaying individual employee data
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">Details</Typography>
              <Typography variant="body2">Summary: {row.summary}</Typography>
              <Typography variant="body2">Skills: {row.skills.join(', ')}</Typography>
              <Typography variant="body2">Work Experience:</Typography>
              {row.workExperience.map((work, idx) => (
                <Box key={idx} sx={{ marginLeft: 2 }}>
                  <Typography variant="body2"><strong>Company:</strong> {work.company}</Typography>
                  <Typography variant="body2"><strong>Job Title:</strong> {work.jobTitle}</Typography>
                  <Typography variant="body2"><strong>Date:</strong> {work.date}</Typography>
                  <Typography variant="body2"><strong>Descriptions:</strong> {work.descriptions.join(', ')}</Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    workExperience: PropTypes.arrayOf(
      PropTypes.shape({
        company: PropTypes.string.isRequired,
        jobTitle: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);

  // Function to fetch employee data
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resumes'); // Adjust endpoint as necessary
      const fetchedRows = response.data.map(resume => 
        createData(
          resume.name,
          resume.email,
          resume.phone || 'N/A',
          resume.summary || 'No summary available',
          resume.skills || [],
          resume.work_experience || []
        )
      );
      setRows(fetchedRows);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      alert('Failed to fetch employee data. Please try again.');
    }
  };

  useEffect(() => {
    fetchEmployeeData(); // Fetch data on component mount
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}