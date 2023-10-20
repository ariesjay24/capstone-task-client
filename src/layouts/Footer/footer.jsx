import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <h5>Project Management App</h5>
            <p>&copy; 2023 Your Company</p>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
            <p>Contact us: 8-700</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
