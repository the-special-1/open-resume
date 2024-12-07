// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { auth } from '../auth/firebase'; // Make sure this imports your firebase config

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const role = await getUserRole(user.uid); // Fetch user role from your database
                setUser({ ...user, role }); // Set user with role
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return { user };
};

// Example function to fetch user role (implement based on your database)
const getUserRole = async (uid) => {
    // Fetch user role from Firestore or your database
    // Return 'admin' or 'user'
};