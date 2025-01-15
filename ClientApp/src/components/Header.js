import React from "react";
import { useAuth } from "./AuthContext";

const Header = ({ openAuthModal }) => {
    const { user, logout } = useAuth();

    return (
        <header>
            <div className="logo">MusicWeb</div>
            <nav>
                {}
            </nav>
            <div className="auth">
                {!user ? (
                    <button onClick={() => openAuthModal("login")}>Авторизация</button>
                ) : (
                    <div className="profile-menu">
                            <img className="avatar" src={user.profileImage || "https://localhost:7130/uploads/Profiles/default.png"} alt="Profile" />
                        <span>{user.name}</span>
                        <div className="dropdown">
                            <button onClick={logout}>Выйти</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;