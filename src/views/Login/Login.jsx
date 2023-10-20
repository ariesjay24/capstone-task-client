import React, { useState } from "react";
import { Container, Card, Form, Button, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { httpClient } from "../../library/http";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const api = httpClient();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const body = {
        Username,
        Password,
      };

      const user = await api.post("/login", body);
      console.log(user);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", JSON.stringify(user.data.user));

      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (e) {
      console.log(e.response.data.message);
      setToastMessage("Login failed. Please check your credentials.");
      setShowToast(true);
    }
  }

  const toggleToast = () => setShowToast(!showToast);

  return (
    <div
      className="app-container"
      style={{ backgroundColor: "#022D64", color: "white" }}
    >
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card style={{ width: "25rem", padding: "20px" }}>
          <Form onSubmit={submit}>
            <h2 className="text-center">Login</h2>
            <Form.Group className="mb-1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1 text-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
          <p className="text-center mt-1">
            Don't have an account? <Link to="/register">Please register</Link>
          </p>
        </Card>
      </Container>

      <Toast
        show={showToast}
        onClose={toggleToast}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "red",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Login;
