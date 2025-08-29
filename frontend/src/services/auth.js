import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5001/api/auth/';

const login = async (rollNo, password) => {
    const response = await axios.post(API_URL + 'login', { rollNo, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        return jwtDecode(token).user;
    } catch (error) {
        // If token is invalid or expired
        return null;
    }
};

const authService = { login, logout, getCurrentUser };
export default authService;