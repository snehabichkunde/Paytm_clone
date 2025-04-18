import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const [initial, setInitial] = useState("U");
    const [name, setName] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const firstName = response.data.firstName || "User";
                setInitial(firstName[0].toUpperCase());
                setName(firstName);
            } catch (error) {
                console.error("Failed to load user info", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <div className="shadow h-16 px-6 flex items-center justify-between bg-white">
            <div className="text-xl font-medium text-gray-800">
                PayTM App
            </div>
            <div className="flex items-center gap-4">
                <div className="text-gray-600 text-sm">
                    Hi, {name}
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-semibold text-md">
                    {initial}
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
