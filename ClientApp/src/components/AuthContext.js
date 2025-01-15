import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token)
            setUser(null);
    }, []);

    const logout = async () => {
        try {
            console.log("Начало выхода...");
            localStorage.removeItem("token");
            setUser(null);
            console.log("Токен удалён, пользователь сброшен.");

            await axios.post("/api/User/logout");
            console.log("Сессия завершена на сервере.");
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);