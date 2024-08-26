'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCar } from '../../services/carService';
import { toast } from 'react-toastify';

const AddCar = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [hp, setHp] = useState<number>(0);
    const [color, setColor] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCar({ brand, model, hp, color });
            toast.success('Car added successfully');
            router.push('/');
        } catch (error) {
            toast.error('Failed to add car');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Car</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="brand">Brand</label>
                    <input
                        id="brand"
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="model">Model</label>
                    <input
                        id="model"
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="hp">HP</label>
                    <input
                        id="hp"
                        type="number"
                        placeholder="HP"
                        value={hp}
                        onChange={(e) => setHp(Number(e.target.value))}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="color">Color</label>
                    <input
                        id="color"
                        type="text"
                        placeholder="Color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default AddCar;
