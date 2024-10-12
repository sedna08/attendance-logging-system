'use client';
import axios from 'axios';
import { useState} from 'react';
import { useRouter } from 'next/navigation'
import useForm from '@/hooks/useForm';

interface signUpFormState {
    [key:string]: string,
}


export default function SignUp() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/users';
    const [serverSideError, setServerSideError] = useState('');
    const { values, handleChange, resetForm } = useForm({ 
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

        if (!values.id.trim()) {
            newErrors.id = 'required';
            valid = false;
        }
        if (!values.firstName.trim()) {
            newErrors.firstName = 'required';
            valid = false;
        }
        if (!values.lastName.trim()) {
            newErrors.lastName = 'required';
            valid = false;
        }
        if (!values.email.trim()) {
            newErrors.email = 'required';
            valid = false;
        } else if (!emailRegex.test(values.email)) {
            newErrors.email = 'invalid';
            valid = false;
        }
        if (!values.password.trim()) {
            newErrors.password = 'required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            createUser();
        } else {
            console.log('Form has errors, not submitting.');
        }
    };

    // create user
    const createUser = async () => {
        try {
            const response = await axios.post(`${apiUrl}/signup`, values);
            resetForm();
            setServerSideError('');
            router.push('/login');
        } catch(error) {
            let newErrors = {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            };
            if (axios.isAxiosError(error) && error.response) {
                if(error.response.status == 409 && error.response.data.toString().includes("Email")) {
                    newErrors.email = 'already exists'
                    setErrors(newErrors);
                } else if(error.response.status == 409 && error.response.data.toString().includes("ID")) {
                    newErrors.id = 'already exists'
                    setErrors(newErrors);
                }
            }
            setServerSideError('Error in creating user');
            console.error('Error in creating user:', error);
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
                            <label className="text-red-600"> {errors.id ?  `${errors.id}`: ''}</label>
                        </label>
                        <input 
                            placeholder="Enter ID Number"
                            name="id"
                            value={values.id}
                            onChange={handleChange}
                            //className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                        errors.id ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md`}
                        />

                        {/* First Name and Last Name Fields */}
                        <div className="flex justify-between items-center">
                            <div className="w-full">
                                <div className = "block w-full mr-2 text-base mt-3">
                                    First Name
                                    <label className="text-red-600">*</label>
                                    <label className="text-red-600"> {errors.firstName ?  `${errors.firstName}`: ''}</label>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className = "block w-full text-base mt-3">
                                    Last Name
                                    <label className="text-red-600">*</label>
                                    <label className="text-red-600"> {errors.lastName ?  `${errors.lastName}`: ''}</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ">
                            <input 
                                placeholder="Enter First Name"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                //className="border w-6/12 mr-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                                className={`border w-6/12 mr-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                            />
                            <input 
                                placeholder="Enter Last Name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
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
                            <label className="text-red-600"> {errors.email ?  `${errors.email}`: ''}</label>
                        </label>
                        <input 
                            placeholder="Enter Email"
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            //className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md`}

                        />

                        {/* Password Field */}
                        <label className = "block w-full text-base mt-3">
                            Password
                            <label className="text-red-600">*</label>
                            <label className="text-red-600"> {errors.password ?  `${errors.password}`: ''}</label>
                        </label>
                        <input 
                            placeholder="Enter Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
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
                        <div className = "flex justify-center mt-5">
                            <label className=" text-red-600"> {serverSideError ?  `${serverSideError}`: ''}</label>
                        </div>
                    </form>
                    
                </div>
            </main>
            
        </div>
    )
}