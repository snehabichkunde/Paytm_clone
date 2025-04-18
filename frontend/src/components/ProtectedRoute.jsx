// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/signin" />;
    }

    return children;
};
