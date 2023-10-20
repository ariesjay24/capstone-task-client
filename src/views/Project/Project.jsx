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

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectData, setProjectData] = useState({
    ProjectName: "",
    Description: "",
    StartDate: "",
    DueDate: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await httpClient().get("/projects");
      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const createProject = async () => {
    try {
      await httpClient().post("/projects", projectData);
      fetchProjects();
      setShowCreateModal(false);
      setProjectData({
        ProjectName: "",
        Description: "",
        StartDate: "",
        DueDate: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editProject = async () => {
    try {
      await httpClient().put(`/projects/${selectedProject.id}`, projectData);
      fetchProjects();
      setShowEditModal(false);
      setSelectedProject(null);
      setProjectData({
        ProjectName: "",
        Description: "",
        StartDate: "",
        DueDate: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await httpClient().delete(`/projects/${projectId}`);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const renderProjects = () => {
    return projects.map((project) => (
      <tr key={project.id}>
        <td>{project.ProjectName}</td>
        <td>{project.Description}</td>
        <td>{project.StartDate}</td>
        <td>{project.DueDate}</td>
        <td>
          <Button
            variant="info"
            onClick={() => {
              setSelectedProject(project);
              setProjectData({ ...project });
              setShowEditModal(true);
            }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => deleteProject(project.id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      <h1 className="my-4">Project Management</h1>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Create Project
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderProjects()}</tbody>
      </Table>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formProjectName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProjectName"
                    value={projectData.ProjectName}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="Description"
                    value={projectData.Description}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="StartDate"
                    value={projectData.StartDate}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formDueDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="DueDate"
                    value={projectData.DueDate}
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
          <Button variant="primary" onClick={createProject}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Project Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formProjectName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProjectName"
                    value={projectData.ProjectName}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="Description"
                    value={projectData.Description}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="StartDate"
                    value={projectData.StartDate}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formDueDate">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="DueDate"
                    value={projectData.DueDate}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Project;
