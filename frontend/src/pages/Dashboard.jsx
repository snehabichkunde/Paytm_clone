import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Please log in first");
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
                alert("Failed to load balance");
            }
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                {balance !== null ? (
                    <Balance value={balance} />
                ) : (
                    <div className="text-gray-500 font-semibold text-lg">Loading balance...</div>
                )}
                <Users />
            </div>
        </div>
    );
};
