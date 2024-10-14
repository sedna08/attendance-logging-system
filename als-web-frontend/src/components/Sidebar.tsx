import React, { ReactNode, useState, createContext, useContext } from 'react';
import logo from '../img/logo.png';
import Image from 'next/image';
import { ChevronFirst, MoreVertical, ChevronLast } from "lucide-react";

// SidebarProps for the children prop
interface SidebarProps {
    children: ReactNode;
}

// SidebarItemsProps for the SidebarItem props
interface SidebarItems {
    icon: ReactNode;
    text: ReactNode;
    active?: boolean;
    alert?: boolean;
}

// Define a type for the context value
interface SidebarContextProps {
    expanded: boolean;
}

// Sidebar context creation with default values
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [expanded, setExpanded] = useState(true); // Default to expanded
    return (
        <aside
            className={`h-full bg-white border-r shadow-sm z-50 transition-all duration-300 ${expanded ? "w-64" : "w-16"}`}
        >
            <nav className="h-full flex flex-col">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Image
                        src={logo}
                        alt="Logo"
                        className={`transition-all duration-300 ${expanded ? "w-32" : "w-0"}`}
                    />
                    <button onClick={() => setExpanded(curr => !curr)} className='p-1 rounded-lg bg-gray-50 hover:bg-gray-100'>
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className='flex-1 px-3'>{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3 ">
                    <img src="https://ui-avatars.com/api/?name=John+Doe" alt="" className='w-10 h-10 rounded-md' />
                    <div className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        <div className='leading-4'>
                            <h4 className='font-semibold'>John Doe</h4>
                            <span className='text-xs text-gray-600'>johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export const SidebarItem: React.FC<SidebarItems> = ({ icon, text, active, alert }) => {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error('SidebarItem must be used within a Sidebar');
    }

    const { expanded } = context;

    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'
            }`}
        >
            {icon}
            {expanded && <span className="ml-3">{text}</span>}
            {alert && (
                <div className={`absolute w-2 h-2 rounded-full bg-indigo-400 ${expanded ? 'right-2' : 'right-8'}`} />
            )}

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    );
};
