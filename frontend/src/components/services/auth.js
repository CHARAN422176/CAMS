import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://cams-nf34.onrender.com/api/auth/';

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
    const token = localStorage.getItem('token');
    if (!token) return null;
    return jwtDecode(token).user;
};

const authService = { login, logout, getCurrentUser };
export default authService;