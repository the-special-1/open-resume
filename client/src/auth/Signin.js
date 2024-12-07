// src/components/SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            console.log('User signed in:', response.data);
            alert("Login successful!");

            // Check user role and redirect accordingly
            if (response.data.role === 'admin') {
                navigate('/admin'); // Redirect to admin page
            } else {
                navigate('/'); // Redirect to home page for normal users
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(error.response.data.error); // Display error message to user
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Sign In</button>
            </form>
            <button onClick={() => window.open('http://localhost:5000/auth/google', '_self')} className="bg-blue-500 text-white p-2 rounded">
                Sign in with Google
            </button>
        </div>
    );
};

export default SignIn;