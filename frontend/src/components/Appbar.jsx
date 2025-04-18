import { useEffect, useState } from "react";
import axios from "axios";



export const Appbar = () => {
    const [initial, setInitial] = useState("U");

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
            } catch (error) {
                console.error("Failed to load user info", error);
            }
        };

        fetchUser();
    }, []);


    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {initial}
                </div>
            </div>
        </div>
    </div>
}