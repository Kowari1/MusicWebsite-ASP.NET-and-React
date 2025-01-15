import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "./axiosSetup";

const AuthModal = ({ type, onClose, switchTo }) => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "", nickname: "", profileImage: null });

    const handleOverlayClick = (e) => {
        if (e.target.className === "modal") {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (type === "login") {
                console.log(formData);
                const { data } = await axios.post('/api/User/login', formData);
                console.log(console.log(data));
                localStorage.setItem("authToken", data.token);
                localStorage.getItem("authToken")
                login({ ...data.user, token: data.token });
                onClose();
            } else if (type === "register") {
                const dataToSend = new FormData();
                dataToSend.append("email", formData.email);
                dataToSend.append("password", formData.password);
                dataToSend.append("nickname", formData.nickname);
                if (formData.profileImage) {
                    dataToSend.append("profileImage", formData.profileImage);
                }
                console.log(dataToSend);
                await axios.post('/api/User/register', dataToSend);
                switchTo("login");
            }
        } catch (error) {
            console.error("Ошибка:", error.response?.data || error.message);
        }
    };

    return (
        <div className="modal" onClick={handleOverlayClick}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <h2>{type === "login" ? "Авторизация" : "Регистрация"}</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                {type === "register" && (
                    <>
                        <input
                            type="text"
                            placeholder="Никнейм"
                            value={formData.nickname}
                            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
                        />
                    </>
                )}
                <button type="submit">{type === "login" ? "Войти" : "Зарегистрироваться"}</button>
                {type === "login" ? (
                    <p onClick={() => switchTo("register")}>Нет аккаунта? Зарегистрируйтесь</p>
                ) : (
                    <p onClick={() => switchTo("login")}>Уже есть аккаунт? Войдите</p>
                )}
            </form>
        </div>
    );
};

export default AuthModal;