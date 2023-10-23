import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import "./Home.css";
import serviceImage1 from "./../../assets/serviceImage1.jpg";
import serviceImage2 from "./../../assets/serviceImage2.jpg";
import serviceImage3 from "./../../assets/serviceImage3.jpg";

import aboutImage from "./../../assets/aboutImage.jpg";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <div className="hero">
        <Container className="hero-container">
          <h1 className="text-style">Master your tasks online</h1>
          <p className="text-style">
            Effortlessly manage your tasks with TaskMaster's online platform.
            Stay organized and focused on what matters most.
          </p>
          <Button className="btn">Get Started</Button>
        </Container>
      </div>

      {/* introduction */}

      <div className="intro">
        <Container className="text-center my-5">
          <p className="responsive-paragraph">
            Introducing TaskMaster, the leading online task management solution
            based in the Philippines. We empower businesses to streamline their
            workflow and boost productivity with our intuitive platform. With
            TaskMaster, you can effortlessly assign, track, and collaborate on
            tasks, ensuring seamless communication and efficient project
            management. Say goodbye to scattered emails and missed deadlines –
            TaskMaster provides a centralized hub for all your tasks, keeping
            everyone on the same page. Experience the power of efficient task
            management with TaskMaster and take your business to new heights.
          </p>
        </Container>
      </div>

      {/* about */}

      <div className="about">
        <Container className="about-us">
          <Row>
            <Col xs={12} md={6}>
              <div className="image-container">
                <img
                  src={aboutImage}
                  alt="About Us"
                  className="about-us-image"
                />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="text-container">
                <h2 className="about-text">About Us</h2>
                <p className="about-paragraph">
                  TaskMaster is a leading provider of online task management
                  solutions based in the Philippines. We specialize in helping
                  businesses streamline their workflow and increase
                  productivity.
                </p>
                <p className="about-paragraph">
                  Our team of experienced professionals is dedicated to
                  delivering top-quality services to our clients. With our
                  user-friendly platform, customizable task lists, and real-time
                  collaboration features, we make it easy for teams to stay
                  organized and on track.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* services */}

      <div className="service">
        <Container className="services-section">
          <h2 className="section-title">Our Services</h2>
          <Row>
            <Col md={4} sm={12} className="service-col">
              <div className="service-card">
                <img
                  src={serviceImage1}
                  alt="Service 1"
                  className="service-image"
                />
                <div className="service-text">
                  <h3>Efficient Task Management</h3>
                  <p>
                    Efficiently manage tasks online for improved productivity
                    and collaboration.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4} sm={12} className="service-col">
              <div className="service-card">
                <img
                  src={serviceImage2}
                  alt="Service 2"
                  className="service-image"
                />
                <div className="service-text">
                  <h3>Project Progress Tracking</h3>
                  <p>
                    Track and monitor project progress seamlessly with our
                    online task management platform.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={4} sm={12} className="service-col">
              <div className="service-card">
                <img
                  src={serviceImage3}
                  alt="Service 3"
                  className="service-image"
                />
                <div className="service-text">
                  <h3>Team Collaboration</h3>
                  <p>
                    Easily collaborate with your team members on tasks and
                    projects for better results.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* contacts */}

      <div className="contacts">
        <Container className="contact-section">
          <Row>
            <Col md={6}>
              <Form className="contact-form">
                <Form.Group controlId="formName">
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Your Name"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    className="mb-3"
                    type="email"
                    placeholder="Your Email"
                  />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Control
                    className="mb-3"
                    type="tel"
                    placeholder="Your Phone Number"
                  />
                </Form.Group>
                <Form.Group controlId="formCompany">
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Your Company"
                  />
                </Form.Group>
                <Form.Group controlId="formMessage">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                  />
                </Form.Group>
                <Button
                  className="contact-btn mt-3"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md={6}>
              <div className="contact-info">
                <h2>Contact Us Today</h2>
                <p>
                  Fill out the form below to get in touch with us and learn how
                  our online task management platform can help streamline your
                  business operations.
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?14.599512!2d120.984222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca117b2ec3c7%3A0x718d856f9874400a!2sManila%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1602862025305!5m2!1sen!2sph"
                  width="100%"
                  height="300"
                  title="Map"
                  frameBorder="0"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
