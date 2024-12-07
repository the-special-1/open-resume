// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/auth/register', { name, email, password });
            console.log('User registered:', response.data);
            alert("Registration successful! Please log in."); // Notify user
            navigate('/signin'); // Redirect to Sign In page
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.response.data.error); // Display error message to user
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    required 
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={() => window.open('http://localhost:5000/auth/google', '_self')} className="bg-blue-500 text-white p-2 rounded">
                Sign in with Google
            </button>
        </div>
    );
};

export default SignUp;