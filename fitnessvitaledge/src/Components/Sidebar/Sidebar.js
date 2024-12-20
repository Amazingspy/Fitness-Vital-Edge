import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import dashIcon from '../../Assets/Dashbaord.png'
import mealIcon from '../../Assets/Diet Plan.png'
import progressIcon from '../../Assets/Progres.png'
import workoutIcon from '../../Assets/Workout.png'
import settingsIcon from '../../Assets/Vector.png'
import logoutIcon from '../../Assets/Logout.png'

function Sidebar() {
  const menuLinks = [
    { to: '/', label: 'Home', icon:dashIcon ,exact: true },
    { to: '/mealplan', label: 'Meal Plan', icon: mealIcon},
    { to: '/progress', label: 'Progress', icon: progressIcon},
    { to: '/workout', label: 'Workout', icon: workoutIcon},
  ];

  const footerLinks = [
    { to: '/settings', label: 'Settings', icon: settingsIcon},
    { to: '/logout', label: 'Logout', icon: logoutIcon},
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className='App-heading'>Main Trend</div>
      </div>

      <Nav className="menu flex-column">
        {menuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
            end={link.exact || false}
          >

            <img src={link.icon} alt={`${link.label} icon`} className='menu-icon' />
            <span className='nav-label'>{link.label}</span>
            {/* {link.label} */}
          </NavLink>
        ))}
      </Nav>

      <div className="sidebar-footer">
        <Nav className="flex-column">
          {footerLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
            >
            <img src={link.icon} alt={`${link.label} icon`} className='menu-icon' />
            <span className='nav-label'>{link.label}</span>
            </NavLink>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
