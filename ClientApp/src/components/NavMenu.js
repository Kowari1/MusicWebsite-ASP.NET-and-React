import React, { useState } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./NavMenu.css";

const NavMenu = ({ onOpenAuthModal }) => {
    const { user, logout } = useAuth();
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <NavbarBrand tag={Link} to="/">MusicWebsiteReact</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        {user ? (
                            <>
                                <NavItem className="d-flex align-items-center">
                                    <img
                                        src={user.profileImage || "/default-profile.png"}
                                        alt="Profile"
                                        className="profile-icon"
                                    />
                                    <span className="text-dark ms-2">{user.name}</span>
                                </NavItem>
                                <NavItem>
                                    <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem className="d-flex align-items-center">
                                    <img
                                        src="/default-profile.png"
                                        alt="Default Profile"
                                        className="profile-icon"
                                    />
                                </NavItem>
                                <NavItem>
                                    <button
                                        className="btn btn-link nav-link"
                                        onClick={() => onOpenAuthModal("login")}
                                    >
                                        Авторизация
                                    </button>
                                </NavItem>
                            </>
                        )}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default NavMenu;