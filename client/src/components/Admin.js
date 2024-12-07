// src/components/AdminPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/users');
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:5000/auth/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user)); // Update local state
        } catch (err) {
            console.error('Error updating user role:', err);
            alert('Failed to update user role');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Admin Page</h1>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border">Name</th>
                        <th className="border">Email</th>
                        <th className="border">Role</th>
                        <th className="border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border">{user.name}</td>
                            <td className="border">{user.email}</td>
                            <td className="border">{user.role}</td>
                            <td className="border">
                                <select 
                                    value={user.role} 
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;