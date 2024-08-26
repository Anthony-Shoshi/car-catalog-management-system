import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (userData: { username: string; email: string; password: string }) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const login = async (userData: { email: string; password: string }) => {
    return axios.post(`${API_URL}/auth/login`, userData);
};