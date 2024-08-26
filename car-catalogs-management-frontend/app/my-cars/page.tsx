'use client';

import { useEffect, useState } from 'react';
import { getUserCars, deleteCar } from '../../services/carService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const MyCars = () => {
    const [cars, setCars] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data } = await getUserCars();
                setCars(data);
            } catch (error) {
                toast.error('Failed to fetch your cars');
            }
        };
        fetchCars();
    }, []);

    const handleDelete = async (carId: string) => {
        try {
            await deleteCar(carId);
            setCars(cars.filter(car => car._id !== carId));
            toast.success('Car deleted successfully');
        } catch (error) {
            toast.error('Failed to delete car');
        }
    };

    const handleUpdate = (carId: string) => {
        router.push(`/update-car/${carId}`);
    };


    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">My Cars</h1>
            {cars.length === 0 ? (
                <p className="text-center text-gray-500">No cars available. Add some cars to see them here.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map(car => (
                        <div key={car._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{car.brand} {car.model}</h2>
                                <p className="text-gray-700 mb-1"><strong>HP:</strong> {car.hp}</p>
                                <p className="text-gray-700 mb-1"><strong>Color:</strong> {car.color}</p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => handleUpdate(car._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(car._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCars;
