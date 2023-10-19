import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div
      className="app-container"
      style={{ backgroundColor: "#022D64", color: "white" }}
    >
      <Container className="dashboard-container">
        <h1 className="dashboard-heading">Dashboard Overview</h1>

        <Row>
          <Col sm={4}>
            <Card className="overview-card">
              <Card.Body>
                <h5 className="overview-title">Projects</h5>
                <h2 className="overview-value">5</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card className="overview-card">
              <Card.Body>
                <h5 className="overview-title">Tasks</h5>
                <h2 className="overview-value">20</h2>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card className="overview-card">
              <Card.Body>
                <h5 className="overview-title">
                  Project and Task Collaborator
                </h5>
                <h2 className="overview-value">10</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Card className="info-card">
              <Card.Body>
                <h5 className="info-title">Completed Projects</h5>
                <ul className="info-list">
                  <li>Project A</li>
                  <li>Project B</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6}>
            <Card className="info-card">
              <Card.Body>
                <h5 className="info-title">Overdue Tasks</h5>
                <ul className="info-list">
                  <li>Task 1</li>
                  <li>Task 2</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
