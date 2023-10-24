import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { httpClient } from "./../../library/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProjects = ({ userID }) => {
  const [userProjects, setUserProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectData, setProjectData] = useState({
    UserID: "",
    ProjectID: "",
  });

  useEffect(() => {
    fetchUserProjects(userID);
  }, [userID]);

  const fetchUserProjects = async (userID) => {
    try {
      const response = await httpClient().get(
        `/user-projects?UserID=${userID}`
      );
      setUserProjects(response.data.userProjects);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user projects");
    }
  };

  const createUserProject = async () => {
    try {
      await httpClient().post("/user-projects", projectData);

      fetchUserProjects();
      setShowCreateModal(false);
      setProjectData({
        UserID: "",
        ProjectID: "",
      });

      toast.success("User added to project successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error adding user to project");
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const renderUserProjects = () => {
    return userProjects.map((userProject) => (
      <tr key={userProject.id}>
        <td>{userProject.UserID}</td>
        <td>{userProject.ProjectID}</td>
      </tr>
    ));
  };

  return (
    <Container>
      <h1 className="my-4">User Project Management</h1>
      <Button
        className="mb-2"
        variant="primary"
        onClick={() => setShowCreateModal(true)}
      >
        Add User to Project
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Project ID</th>
          </tr>
        </thead>
        <tbody>{renderUserProjects()}</tbody>
      </Table>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User to Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formUserID">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="UserID"
                    value={projectData.UserID}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formProjectID">
                  <Form.Label>Project ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProjectID"
                    value={projectData.ProjectID}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createUserProject}>
            Add User to Project
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </Container>
  );
};

export default UserProjects;
