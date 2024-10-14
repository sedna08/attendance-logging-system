'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarItem } from '@/components/Sidebar';
import {
    BookUser,
    BarChart3,
    LayoutDashboard,
    Settings,
} from "lucide-react";
import Header from '@/components/Headers';

export default function Home() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Logout Handler
    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/userService/logout`, {}, { withCredentials: true });
            console.log("Successfully Logout");
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header onLogout={handleLogout} />

            {/* Sidebar and Main Content Wrapper */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar>
                    <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert />
                    <SidebarItem icon={<BookUser size={20} />} text="Classes" />
                    <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" active />
                    <hr className="my-3" />
                    <SidebarItem icon={<Settings size={20} />} text="Settings" />
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className='flex justify-center items-center flex-col'>
                        <h1 className="text-xl md:text-2xl font-bold mb-4 mt-5">Welcome to the Dashboard</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
