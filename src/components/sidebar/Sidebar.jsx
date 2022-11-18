import React from 'react';
import { NavLink } from 'react-router-dom';
import DashbardIcon from '../../assets/dashboard_icon.svg';
import AddIcon from '../../assets/add_icon.svg';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <aside className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    <p>Hey user</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <img src={DashbardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="add project icon" />
                                <span>New project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};