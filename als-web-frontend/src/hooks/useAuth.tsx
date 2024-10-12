import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const useAuth = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // This should check the authentication status
                const response = await axios.get(`${apiUrl}/auth-check`, { withCredentials: true });
                if(response.status === 401) {
                    setIsAuthenticated(false); // User is not authenticated
                } else if(response.status === 200) {
                    setIsAuthenticated(true); // User is not authenticated
                }
                
            } catch (error) {
                console.error('User is not authenticated, redirecting to login...');
                setIsAuthenticated(false); // User is not authenticated
                router.push('/login'); // Redirect to login page
            } finally {
                setLoading(false); // Stop loading
            }
        };

        checkAuth();
    }, [router, apiUrl]);

    if (loading) return null; // Optionally show a loading spinner
    return isAuthenticated; // Return the authentication status
};
