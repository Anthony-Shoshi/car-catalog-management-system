'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();

        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold hover:text-gray-400">
                    Car Catalogs
                </Link>
                <div className="space-x-4">
                    <Link
                        href="/"
                        className="hover:text-gray-400 transition-colors duration-300"
                    >
                        Home
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/add-car"
                                className="hover:text-gray-400 transition-colors duration-300"
                            >
                                Add Car
                            </Link>
                            <Link
                                href="/my-cars"
                                className="hover:text-gray-400 transition-colors duration-300"
                            >
                                My Cars
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="hover:text-gray-400 transition-colors duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="hover:text-gray-400 transition-colors duration-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
