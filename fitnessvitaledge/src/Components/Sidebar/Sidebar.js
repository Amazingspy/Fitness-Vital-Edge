import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import dashIcon from '../../Assets/Dashbaord.png';
import mealIcon from '../../Assets/Diet Plan.png';
import progressIcon from '../../Assets/Progres.png';
import workoutIcon from '../../Assets/Workout.png';
import settingsIcon from '../../Assets/Vector.png';
import logoutIcon from '../../Assets/Logout.png';
import calendarIcon from '../../Assets/calendar-check (1).png';
import workoutplan from '../../Assets/Goal.png'
import training from '../../Assets/Schedule.png'
import calculator from '../../Assets/calories-calculator 1.png'

function Sidebar() {
  const menuLinks = [
    { to: '/', label: 'Home', icon: dashIcon, exact: true },
    { to: '/progress', label: 'Progress', icon: progressIcon },
  ];

  const footerLinks = [
    { to: '/settings', label: 'Settings', icon: settingsIcon },
    { to: '/logout', label: 'Logout', icon: logoutIcon },
  ];

  return (
    <div className="sidebar d-none d-lg-flex">
      <div className="sidebar-top">
        <div className="App-heading">
          Main trend
          {/* <img src={logo} alt="logo" className='logo-icon' /> */}
        </div>
      </div>

      <Nav className="menu flex-column">
        {menuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
            end={link.exact || false}
          >
            <img src={link.icon} alt={`${link.label} icon`} className="menu-icon" />
            <span className="nav-label">{link.label}</span>
          </NavLink>
        ))}


        <NavDropdown
          title={
            <span>
              <img src={mealIcon} alt="Meal Plan icon" className="menu-icon" />
              Meal Plan
            </span>
          }
          id="mealplan-dropdown"
          className="nav-link"
        >
          <NavDropdown.Item as={NavLink} to="/mealplan" className="mealdropdown">
            <img src={mealIcon} alt="Meal Plan" className="menu-icon" />
            Plan your Meal
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/mealplan/calendar">
            <img src={calendarIcon} alt="Calendar" className="menu-icon" />
            Calendar
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/mealplan/CalorieCalculator">
            <img src={calculator} alt="Calculator" className="menu-icon" />
            Calorie Calculator
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/mealplan/CalorieCalculator">
            <img src={mealIcon} alt="Meal Plan" className="menu-icon" />
            Meal Plan
          </NavDropdown.Item>
        </NavDropdown>


        <NavDropdown
          title={
            <span>
              <img src={workoutIcon} alt="Workout icon" className="menu-icon" />
              Workout
            </span>
          }
          id="workout-dropdown"
          className="nav-link"
        >
          <NavDropdown.Item as={NavLink} to="/workout" className="workoutdropdown">
            <img src={training} alt="Workout Plan" className="menu-icon" />
            Workout Plan
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/workout/WorkoutTraining">
            <img src={workoutplan} alt="Training" className="menu-icon" />
            Training
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>

      <div className="sidebar-footer">
        <Nav className="flex-column">
          {footerLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}
            >
              <img src={link.icon} alt={`${link.label} icon`} className="menu-icon" />
              <span className="nav-label">{link.label}</span>
            </NavLink>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
