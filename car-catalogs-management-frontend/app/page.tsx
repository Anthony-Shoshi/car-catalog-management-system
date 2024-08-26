"use client";

import { useEffect, useState } from 'react';
import { getCars } from '../services/carService';
import { toast } from 'react-toastify';

const Home = () => {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await getCars();
        setCars(data);
      } catch (error) {
        toast.error('Failed to fetch cars');
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Cars</h1>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
