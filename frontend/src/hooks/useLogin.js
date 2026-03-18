import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials);
            login(response.token, response.user);
            navigate('/dashboard'); // Adjust redirect path as needed
        }
        catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
        finally {
            setLoading(false);
        }
    };
    return { handleLogin, loading, error };
};
