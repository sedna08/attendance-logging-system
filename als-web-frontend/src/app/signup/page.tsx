'use client';
import Head from 'next/head';
import axios from 'axios';
import { User } from '../../lib/interfaces'
// import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { useState } from 'react';

interface signUpFormState {
    [key:string]: string,
}


export default function SignUp() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/users/';
    const [newUser, setNewUser] = useState({id: '',firstName:'', lastName: '', email: '', password: ''});

    // Define form state
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

     // Form validation function
    const validateForm = () => {
        let valid = true;
        let newErrors = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };

        if (!formData.id.trim()) {
            newErrors.id = 'ID is required';
            valid = false;
        }
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
            valid = false;
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            // Process form submission
            console.log('Form is valid, submitting data:', formData);
        } else {
            console.log('Form has errors, not submitting.');
        }
    };

    // create user
    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/signup`, newUser);
            setNewUser({id: '',firstName:'', lastName: '', email: '', password: ''});
        } catch(error) {
            console.error('Error creating user:', error);
        }
    }

    return (
        <div>
            <main className="flex justify-center items-center h-screen bg-indigo-600">
                <div className="w-auto p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user"></i> Sign Up</h1>
                    <hr className = "mt-3"></hr>
                    <form onSubmit={handleSubmit} className ="mt-3 mb-3">
                        {/* ID Field */}
                        <label className = "block w-full text-base mt-3">
                            ID Number
                            <label className="text-red-600">*</label>
                        </label>
                        <input 
                            placeholder="Enter ID Number"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            //className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                        errors.id ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md`}
                        />

                        {/* First Name and Last Name Fields */}
                        <div className="flex justify-between items-center">
                            <div className="w-full">
                                <label className = "block w-full mr-2 text-base mt-3">
                                    First Name
                                    <label className="text-red-600">*</label>
                                </label>
                            </div>
                            <div className="w-full">
                                <label className = "block w-full text-base mt-3">
                                    Last Name
                                    <label className="text-red-600">*</label>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ">
                            <input 
                                placeholder="Enter First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                //className="border w-6/12 mr-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                                className={`border w-6/12 mr-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                            />
                            <input 
                                placeholder="Enter Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                //className="border w-6/12 ml-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                                className={`border w-6/12 mr-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                            />
                        </div>
                        {/* Email Field */}
                        <label className = "block w-full text-base mt-3">
                            Email
                            <label className="text-red-600">*</label>
                            <label className="text-red-600"> {errors.email === 'Email is invalid' ?  'Incorrect Email Format': ''}</label>
                        </label>
                        <input 
                            placeholder="Enter Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            //className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md`}

                        />

                        {/* Password Field */}
                        <label className = "block w-full text-base mt-3">
                            Password
                            <label className="text-red-600">*</label>
                        </label>
                        <input 
                            placeholder="Enter Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            //className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md`}
                        />
                        <div className = "mt-3 flex justify-between items-center">
                            <div>
                                <a href="/login" className="text-sm text-indigo-700 font-semibold">Already have an account? Log in here</a>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button 
                                type="submit" 
                                className = "border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            >
                            Sign up
                            </button>
                        </div>
                        
                    </form>
                    
                </div>
            </main>
            
        </div>
    )
}