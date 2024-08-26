'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCar, updateCar } from '@/services/carService';

const UpdateCar = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [hp, setHp] = useState<number | ''>('');
    const [color, setColor] = useState('');
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await getCar(id.toString());
                setBrand(data.brand);
                setModel(data.model);
                setHp(data.hp);
                setColor(data.color);
            } catch (error) {
                toast.error('Failed to fetch car details');
            }
        };

        if (id) {
            fetchCar();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateCar(id as string, { brand, model, hp, color });
            toast.success('Car updated successfully');
            router.push('/my-cars');
        } catch (error) {
            toast.error('Failed to update car');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Update Car</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="number"
                    placeholder="HP"
                    value={hp}
                    onChange={(e) => setHp(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Update Car
                </button>
            </form>
        </div>
    );
};

export default UpdateCar;
