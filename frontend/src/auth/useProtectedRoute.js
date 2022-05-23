import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from './userAuthContext';

const useProtectedRoute = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
        navigate('/login');
        }
    }, [user, navigate]);

}