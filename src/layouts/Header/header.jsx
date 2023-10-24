import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import tasklogo from "./../../assets/tasklogo.png";

const Header = () => {
  const [active, setActive] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHomeVisible, setIsHomeVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthenticationStatus();
    window.addEventListener("storage", checkAuthenticationStatus);
    return () => {
      window.removeEventListener("storage", checkAuthenticationStatus);
    };
  }, []);

  function checkAuthenticationStatus() {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }

  function logout() {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    setIsHomeVisible(true);
    navigate("/");
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const navbarStyle = {
    backgroundColor: "#001137",
  };

  const linkStyle = {
    color: "white",
  };

  const toggleStyle = {
    backgroundColor: "#FFCAE6",
  };

  const logoStyle = {
    marginRight: "3px",
  };

  const handleLoginClick = () => {
    setIsHomeVisible(true);
  };

  const handleRegisterClick = () => {
    setIsHomeVisible(true);
  };

  return (
    <Navbar style={navbarStyle} expand="lg" className="container-fluid">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
          <img
            src={tasklogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={logoStyle}
          />
          TaskMaster
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={toggleStyle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            activeKey={active}
            onSelect={(selected) => setActive(selected)}
          >
            {isHomeVisible && (
              <Nav.Link as={Link} to="/" style={linkStyle}>
                Home
              </Nav.Link>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/projects" style={linkStyle}>
                  Projects
                </Nav.Link>
                <Nav.Link as={Link} to="/tasks" style={linkStyle}>
                  Tasks
                </Nav.Link>
                <Nav.Link as={Link} to="/project-progress" style={linkStyle}>
                  Task Progress
                </Nav.Link>
                <Nav.Link as={Link} to="/user-project" style={linkStyle}>
                  Project Users
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="logReg">
            {isAuthenticated ? (
              <Nav.Link onClick={logout} style={linkStyle}>
                Logout ({user.FirstName} {user.LastName})
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={linkStyle}
                  onClick={handleLoginClick}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  style={linkStyle}
                  onClick={handleRegisterClick}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
