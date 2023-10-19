import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import tasklogo from "./../../assets/tasklogo.png";

const header = () => {
  const [active, setActive] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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

  return (
    <Navbar style={navbarStyle} expand="lg">
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
            <Nav.Link as={Link} to="/" style={linkStyle}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" style={linkStyle}>
              Dashboard
            </Nav.Link>
          </Nav>
          <Nav className="logReg">
            {isAuthenticated ? (
              <Nav.Link onClick={logout} style={linkStyle}>
                Logout ({user.FirstName} {user.LastName})
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={linkStyle}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={linkStyle}>
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

export default header;
