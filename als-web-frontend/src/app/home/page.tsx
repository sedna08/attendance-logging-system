'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // LogOut Handler

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Call the logout API to clear the cookie
            await axios.post(`${apiUrl}/logout`);
            console.log("Successfully Logout")
            // Redirect to login after successful logout
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const isAuthenticated = useAuth();
    console.log(`authenticated? : ${isAuthenticated}`)

     // While authentication status is loading or user is not authenticated
    if (!isAuthenticated) {
        return <div>Loading...</div>; // Optional loading spinner
    }
    return (
        <div>
        Home Page
        <br/>
        <form onSubmit = {handleLogout}>
            <button  className = "border-2 border-indigo-700 bg-indigo-700 text-white py-1 rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">
            Logout
            </button>
        </form>
        </div>
    )
}
