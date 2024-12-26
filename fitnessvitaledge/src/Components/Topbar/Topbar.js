import React, { useState } from 'react';
import './Topbar.css';
import { Container, Row, Col, Form, InputGroup, Offcanvas, Nav } from 'react-bootstrap';
import profileImg from '../../Assets/Avatar w. photo.png';
import { FaSearch } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import dashIcon from '../../Assets/Dashbaord.png';
import mealIcon from '../../Assets/Diet Plan.png';
import progressIcon from '../../Assets/Progres.png';
import workoutIcon from '../../Assets/Workout.png';
import settingsIcon from '../../Assets/Vector.png';
import logoutIcon from '../../Assets/Logout.png';

function Topbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);

  const menuLinks = [
    { to: '/', label: 'Home', icon: dashIcon },
    { to: '/mealplan', label: 'Meal Plan', icon: mealIcon },
    { to: '/progress', label: 'Progress', icon: progressIcon },
    { to: '/workout', label: 'Workout', icon: workoutIcon },
  ];

  const footerLinks = [
    { to: '/settings', label: 'Settings', icon: settingsIcon },
    { to: '/logout', label: 'Logout', icon: logoutIcon },
  ];

  return (
    <>
      <div className="topbar">
        <Container fluid>
          <Row className="align-items-center justify-content-between">
            {/* Sidebar Toggle Button for Mobile */}
            <Col xs="auto" className="d-lg-none">
              <button className="menu-btn" onClick={handleOffcanvasToggle}>
                <FiMenu />
              </button>
            </Col>

            <Col xs={12} md={4} className="text-center text-md-start order-1 order-md-1 welcome">
              <h4 className="welcome-message">Welcome Back!</h4>
            </Col>

            {/* Search Bar */}
            <Col xs={8} md={4} className="order-2 order-md-2">
              <Form>
                <InputGroup>
                  <InputGroup.Text className="search-icon">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    className="search-input"
                  />
                </InputGroup>
              </Form>
            </Col>



            {/* Profile Image */}
            <Col xs="auto" md={4} className="text-end order-3 order-md-3">
              <img src={profileImg} alt="Profile" className="profile-img" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Offcanvas Sidebar for Mobile */}
      <Offcanvas show={showOffcanvas} onHide={handleOffcanvasToggle} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Main Trend</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {menuLinks.map((link, index) => (
              <Nav.Link key={index} href={link.to} className="nav-link">
                <img src={link.icon} alt={`${link.label} icon`} className="menu-icon" />
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <hr />
          <Nav className="flex-column">
            {footerLinks.map((link, index) => (
              <Nav.Link key={index} href={link.to} className="nav-link">
                <img src={link.icon} alt={`${link.label} icon`} className="menu-icon" />
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Topbar;
