import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    onLogout: (e: React.FormEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    return (
        <header className="bg-indigo-500 p-2 shadow-lg">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <h1 className="text-white text-xl md:text-2xl font-bold">
                    <b><a href='/home'>ALS Portal</a></b>
                </h1>
                <div className="flex">
                    <form onSubmit={onLogout}>
                        <button className="border-2 border-indigo-500 bg-indigo-500 text-white py-1 rounded-md hover:bg-transparent hover:text-gray-400 font-semibold">
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Header;
