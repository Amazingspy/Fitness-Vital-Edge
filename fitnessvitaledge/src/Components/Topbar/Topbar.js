import React from 'react';
import './Topbar.css';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import profileImg from '../../Assets/Avatar w. photo.png';
import { FaSearch } from 'react-icons/fa';

function Topbar() {
  return (
    <div className="topbar">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={4}>
            <h4 className="welcome-message">Welcome Back!</h4>
          </Col>

          <Col md={4}>
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
          <Col md={4} className="text-end">
            <img src={profileImg} alt="Profile" className="profile-img" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Topbar;
