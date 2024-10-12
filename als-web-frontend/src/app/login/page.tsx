'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useForm from '@/hooks/useForm';

export default function Login() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [serverSideError, setServerSideError] = useState('');
    const [loading, setLoading] = useState(false);
    const { values, handleChange, resetForm } = useForm({ 
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form validation function
    const validateForm = () => {
        let valid = true;
        let newErrors = {
            email: '',
            password: '',
        };

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
            userLogin();
        } else {
            console.log('Form has errors, not submitting.');
        }
    };

    // Create user
    const userLogin = async () => {
        setLoading(true); // Set loading state
        try {
            const response = await axios.post(`${apiUrl}/login`, values, { withCredentials: true });
            resetForm();
            setServerSideError('');
            // You can show a success message here if desired
            console.log("Successful Login");
            router.push('/home'); // Redirect after successful login
        } catch (error) {
            let newErrors = {
                email: '',
                password: '',
            };
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    const message = error.response.data; // Assuming server sends a message
                    if (message.includes("password")) {
                        newErrors.password = 'incorrect';
                    } else if (message.includes("email")) {
                        newErrors.email = 'not found';
                    }
                } 
            } else {
                setServerSideError('Error Logging In');
            }
            setErrors(newErrors);
            setServerSideError('Error Logging In');
            console.error('Error Logging In:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <main className="flex justify-center items-center h-screen bg-indigo-600">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user"></i> Login</h1>
                    <hr className="mt-3"></hr>
                    <form onSubmit={handleSubmit} className="mt-3">
                        <label className="flex w-full text-base justify-between mt-2">
                            <label>Email</label>
                            <label className="text-red-600"> {errors.email ? `${errors.email}`: ''}</label>
                        </label>
                        <input 
                            placeholder="Enter Email..."
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                        <label className="flex w-full text-base justify-between mt-2">
                            <label>Password</label>
                            <label className="text-red-600"> {errors.password ? `${errors.password}`: ''}</label>
                        </label>
                        
                        <input 
                            placeholder="Enter Password..."
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                        <div className="mt-3 flex justify-between items-center">
                            <div>
                                <a href="#" className="text-sm text-indigo-700 font-semibold">Forgot Password?</a>
                            </div>
                            <div>
                                <a href="/signup" className="text-sm text-indigo-700 font-semibold">Sign up</a>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button 
                                type="submit" 
                                className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Logging In...' : 'Login'} {/* Show loading state */}
                            </button>
                        </div>
                        <div className="flex justify-center mt-5">
                            <label className="text-red-600"> {serverSideError ? `${serverSideError}`: ''}</label>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
