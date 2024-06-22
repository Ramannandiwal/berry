'use client'

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ChartUser from "../Component/ChartUser";



// Define User interface for TypeScript
interface User {
    name: string;
    email: string;
    Avatar: string;
}

// Home component as default export
export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    // Function to handle logout
    async function handleLogout() {
        try {
            await axios.get("/api/logout");
            toast.success("Logout successfully");
            router.push("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to logout");
        }
    }

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post("/api/me");
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to fetch user data");
            }
        };

        fetchUserData();
    }, []);

    // UseLayoutEffect to initialize the chart


    // Render JSX for the component
    return (
        <div className="h-screen w-screen flex flex-col">
            <Toaster />
            {user && (
                <div className="flex-grow flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <aside className="bg-gray-800 text-white w-full md:w-64 flex-shrink-0">
                        <div className="p-4">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="mt-2">Welcome, {user.name}!</p>
                        </div>
                        <nav className="mt-4">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                    <a href="#">Dashboard</a>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                    <a href="#">Profile</a>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                    <a href="#">Settings</a>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-1 rounded text-left focus:outline-none"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow bg-gray-100 p-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center">
                                    <div className="w-20 h-20 mr-4 rounded-full overflow-hidden relative">
                                        <Image src={user.Avatar} alt="Avatar Image" layout="fill" objectFit="cover" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold">{user.name}</h1>
                                        <p className="text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Section */}
                            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                               <ChartUser/>

                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}
