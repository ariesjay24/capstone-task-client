import React from "react";
import { Container, Button } from "react-bootstrap";
import heroImage from "./../../assets/heroImage.jpg";

const Home = () => {
  const heroStyle = {
    background: `linear-gradient(rgba(0, 33, 81, 0.8), rgba(0, 33, 81, 0.8)), url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#012251",
    opacity: "0.8",
    color: "#fff",
    textAlign: "center",
    padding: "200px 0",
  };

  const buttonStyle = {
    backgroundColor: "#94DBEB",
    color: "#012251",
    border: "none",
    borderRadius: "20px",
    padding: "12px 20px",
    fontSize: "1.2rem",
  };

  const textStyle = {
    fontWeight: "bold",
    fontFamily: "'Slabo 13px', 'Lato', sans-serif",
  };

  return (
    <div style={heroStyle}>
      <Container>
        <h1 style={textStyle}>Master your tasks online</h1>
        <p style={textStyle}>
          Effortlessly manage your tasks with TaskMaster's online platform. Stay
          organized and focused on what matters most.
        </p>
        <Button style={buttonStyle}>Get Started</Button>
      </Container>
    </div>
  );
};

export default Home;
