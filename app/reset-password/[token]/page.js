// app/reset-password/[token]/page.js
'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';  // Import the useParams hook
import { resetPassword } from '@/app/action/ResetAction';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Access token from the URL using useParams() hook
    const { token } = useParams();  // This will extract the token from the URL path

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError(''); // Clear any previous error messages

        // Call the server action to reset the password
        try {
            console.log(token);  // You can use the token here
            
            const res = await resetPassword({ password, token });

            if (res.success) {
                setMessage('Password has been reset successfully');
                router.push('/login'); // Redirect to login page after reset
            } else {
                setMessage('');
                setError('Error resetting password');
            }
        } catch (error) {
            setMessage('');
            setError('Something went wrong');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    className="form-control mb-2"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <br />
                <input
                    type="password"
                    value={confirmPassword}
                    className="form-control mb-2"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                />
                <br />
                <button type="submit" className="btn btn-success">Reset Password</button>
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};
