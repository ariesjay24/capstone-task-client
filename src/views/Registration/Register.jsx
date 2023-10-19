import React, { useState } from "react";
import { Container, Card, Form, Button, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import http from "./../../library/http";

const Register = () => {
  const api = http();
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    FirstName: "",
    LastName: "",
    Password: "",
    Password_confirmation: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Validation state for each input field
  const [validation, setValidation] = useState({
    Username: null,
    Email: null,
    FirstName: null,
    LastName: null,
    Password: null,
    Password_confirmation: null,
  });

  async function submit(e) {
    e.preventDefault();

    // Check if all fields are valid
    if (Object.values(validation).every((isValid) => isValid === "valid")) {
      try {
        const response = await api.post("/register", formData);
        console.log(response);

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.dispatchEvent(new Event("storage"));
        navigate("/");
      } catch (e) {
        console.log(e.response.data.message);
        setToastMessage("Registration failed. Please check your information.");
        setShowToast(true);
      }
    } else {
      setToastMessage("Please correct the errors in the form.");
      setShowToast(true);
    }
  }

  const toggleToast = () => setShowToast(!showToast);

  // Validation function for each input
  const handleValidation = (e) => {
    const { name, value } = e.target;

    // Implement your own validation logic here
    let isValid = "valid";

    // Check if the input is empty
    if (value.trim() === "") {
      isValid = "error";
    }

    setValidation({ ...validation, [name]: isValid });
  };

  return (
    <div
      className="app-container"
      style={{ backgroundColor: "#022D64", color: "white" }}
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card style={{ width: "500px", padding: "20px", marginBottom: "20px" }}>
          <Form onSubmit={submit}>
            <h2 className="text-center">Register</h2>
            <Form.Group className="mb-1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={formData.Username}
                onChange={(e) => {
                  setFormData({ ...formData, Username: e.target.value });
                  handleValidation(e);
                }}
                isInvalid={validation.Username === "error"}
                isValid={validation.Username === "valid"}
              />
              <Form.Control.Feedback type="invalid">
                {validation.Username === "error"
                  ? "Please enter a valid username."
                  : "This field is required."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={formData.Email}
                onChange={(e) => {
                  setFormData({ ...formData, Email: e.target.value });
                  handleValidation(e);
                }}
                isInvalid={validation.Email === "error"}
                isValid={validation.Email === "valid"}
              />
              <Form.Control.Feedback type="invalid">
                {validation.Email === "error"
                  ? "Please enter a valid email address."
                  : "This field is required."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={(e) => {
                  setFormData({ ...formData, FirstName: e.target.value });
                  handleValidation(e);
                }}
                isInvalid={validation.FirstName === "error"}
                isValid={validation.FirstName === "valid"}
              />
              <Form.Control.Feedback type="invalid">
                {validation.FirstName === "error"
                  ? "Please enter your first name."
                  : "This field is required."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={(e) => {
                  setFormData({ ...formData, LastName: e.target.value });
                  handleValidation(e);
                }}
                isInvalid={validation.LastName === "error"}
                isValid={validation.LastName === "valid"}
              />
              <Form.Control.Feedback type="invalid">
                {validation.LastName === "error"
                  ? "Please enter your last name."
                  : "This field is required."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                value={formData.Password}
                onChange={(e) => {
                  setFormData({ ...formData, Password: e.target.value });
                  handleValidation(e);
                }}
                isInvalid={validation.Password === "error"}
                isValid={validation.Password === "valid"}
              />
              <Form.Control.Feedback type="invalid">
                {validation.Password === "error"
                  ? "Please enter a valid password."
                  : "This field is required."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="Password_confirmation"
                value={formData.Password_confirmation}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    Password_confirmation: e.target.value,
                  });
                  handleValidation(e);
                }}
                isInvalid={validation.Password_confirmation === "error"}
                isValid={validation.Password_confirmation === "valid"}
              />
              <Form.Control.Feedback type="invalid">
                {validation.Password_confirmation === "error"
                  ? "Please confirm your password."
                  : "This field is required."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1 text-center">
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form.Group>
          </Form>
          <p className="text-center mt-1">
            Already have an account? <Link to="/login">Please login</Link>
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
        delay={3000} // Adjust the duration the toast is visible
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

export default Register;
