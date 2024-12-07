// src/auth.js
import { auth, provider } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const signUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed up:', user);
        // You can also send user data to your backend if needed
    } catch (error) {
        console.error('Error signing up:', error);
        alert(error.message); // Display error message to user
    }
};

export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed in:', user);
        // Handle successful sign-in (e.g., redirect to dashboard)
    } catch (error) {
        console.error('Error signing in:', error);
        alert(error.message); // Display error message to user
    }
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User Info:', user);
        // Handle successful Google sign-in (e.g., redirect to dashboard)
    } catch (error) {
        console.error('Error signing in with Google:', error);
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        console.log('User signed out');
        // Handle successful logout (e.g., redirect to login page)
    } catch (error) {
        console.error('Error signing out:', error);
    }
};