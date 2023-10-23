import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import tasklogo from "./../../assets/tasklogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="sticky-footer mt-3">
      <Container>
        <Row>
          {/* First Row: Quick Links */}
          <Col xs={12} md={4} className="text-md-start">
            <h3>Quick Links</h3>
            <ul className="quick-links">
              <li>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/projects">
                  Projects
                </Nav.Link>
              </li>
              <Nav.Link as={Link} to="/tasks">
                Tasks
              </Nav.Link>
            </ul>
          </Col>

          {/* Second Row: Contact Information */}
          <Col xs={12} md={4} className="text-center">
            <div className="contact-info">
              <h4>Contact Us:</h4>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> Email:
                taskmaster@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} /> Phone: 09123456789
              </p>
              <p>
                <FontAwesomeIcon icon={faMapMarkedAlt} /> Address: Manila City
              </p>
            </div>
          </Col>

          {/* Third Row: Logo and Title */}
          <Col xs={12} md={4} className="text-center">
            <div className="mt-3">
              <img src={tasklogo} alt="Logo" className="logo" />
              <h5>Project Management App</h5>
              <p>&copy; 2023 TaskMaster</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
