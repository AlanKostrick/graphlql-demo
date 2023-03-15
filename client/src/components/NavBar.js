import { NavLink } from 'react-router-dom';
import React from 'react';
import style from './NavBar.module.css';

const NavBar = () => (
    <header className={style.header}>
        <nav>
            <ul className={style.list}>
                <li>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? style.active : null
                    }>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/courses" className={({ isActive }) =>
                        isActive ? style.active : null
                    }>
                        Our Courses
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default NavBar;