import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCars = async () => {
    return axios.get(`${API_URL}/cars`);
};

export const getUserCars = async () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/cars/user`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createCar = async (carData: any) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/cars`, carData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getCar = async (id: string) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateCar = async (id: string, carData: any) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/cars/${id}`, carData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteCar = async (id: string) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
