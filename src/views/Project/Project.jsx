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
import { Link } from "react-router-dom";
import { httpClient } from "./../../library/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Project.css";

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
    UserID: 1,
  });

  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchProjects();
  }, [sortBy, sortOrder]);

  const fetchProjects = async () => {
    try {
      const response = await httpClient().get("/projects", {
        params: { sortBy, sortOrder },
      });
      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.ProjectName.toLowerCase().includes(filterText.toLowerCase())
  );

  const createProject = async () => {
    try {
      const newProject = { ...projectData };

      const response = await httpClient().post("/projects", newProject);

      if (response.status === 201) {
        fetchProjects();
        setShowCreateModal(false);
        setProjectData({
          ProjectName: "",
          Description: "",
          StartDate: "",
          DueDate: "",
          UserID: 1,
        });
        toast.success("Project created successfully");
      } else {
        console.error("Project creation failed");
        toast.error("Error creating the project");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating the project");
    }
  };

  const editProject = async () => {
    if (selectedProject) {
      try {
        const response = await httpClient().put(
          `/projects/${selectedProject.id}`,
          projectData
        );

        if (response.status === 200) {
          fetchProjects();
          setShowEditModal(false);
          setSelectedProject(null);
          setProjectData({
            ProjectName: "",
            Description: "",
            StartDate: "",
            DueDate: "",
            UserID: 1,
          });
          toast.success("Project updated successfully");
        } else {
          console.error("Project update failed");
          toast.error("Error updating the project");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error updating the project");
      }
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const tasksResponse = await httpClient().get(
        `/projects/${projectId}/tasks`
      );
      const associatedTasks = tasksResponse.data.tasks;

      if (associatedTasks.length > 0) {
        if (
          window.confirm(
            "This project has associated tasks. Do you want to delete them as well?"
          )
        ) {
          for (const task of associatedTasks) {
            await httpClient().delete(`/tasks/${task.id}`);
          }
        } else {
          return;
        }
      }

      await httpClient().delete(`/projects/${projectId}`);
      fetchProjects();
      toast.success("Project deleted successfully");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await httpClient().delete(`/projects/${projectId}`);
        fetchProjects();
        toast.success("Project deleted successfully");
      } else {
        console.error(error);
        toast.error("Error deleting project");
      }
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("_");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const renderProjects = () => {
    return filteredProjects.map((project) => (
      <tr key={project.id}>
        <td>{project.id}</td>
        <td>{project.UserID}</td>
        <td>
          <Link to={`/projects/${project.id}/tasks`}>
            {project.ProjectName}
          </Link>
        </td>
        <td>{project.Description}</td>
        <td>{project.StartDate}</td>
        <td>{project.DueDate}</td>
        <td>
          <Button
            className="btn"
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
      <Form.Group controlId="formFilter">
        <Form.Label>Filter by Project Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter project name"
          value={filterText}
          onChange={handleFilterChange}
        />
      </Form.Group>
      <Form.Group controlId="formSort">
        <Form.Label>Sort By:</Form.Label>
        <Form.Control as="select" onChange={handleSortChange}>
          <option value="id_asc">Project ID (Ascending)</option>
          <option value="id_desc">Project ID (Descending)</option>
          <option value="name_asc">Project Name (Ascending)</option>
          <option value="name_desc">Project Name (Descending)</option>
        </Form.Control>
      </Form.Group>
      <Button
        className="mb-3 mt-3"
        variant="primary"
        onClick={() => setShowCreateModal(true)}
      >
        Create Project
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>User ID</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderProjects()}</tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6} lg={4}>
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
              <Col xs={12} md={6} lg={4}>
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
              <Col xs={12} md={6} lg={4}>
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
              <Col xs={12} md={6} lg={4}>
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

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={6} lg={4}>
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
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formUserId">
                  {" "}
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="UserId"
                    value={projectData.UserID}
                    onChange={handleProjectChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={4}>
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
              <Col xs={12} md={6} lg={4}>
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
              <Col xs={12} md={6} lg={4}>
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
      <ToastContainer />
    </Container>
  );
};

export default Project;
