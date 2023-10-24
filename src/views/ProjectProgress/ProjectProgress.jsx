import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { httpClient } from "./../../library/http";

const ProjectProgress = () => {
  const [projectProgresses, setProjectProgresses] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [formData, setFormData] = useState({
    TaskID: "",
    ProgressPercentage: "",
    ProgressDescription: "",
    ProgressDate: "",
  });

  const showToastMessage = (message) => {
    toast(message);
  };

  useEffect(() => {
    fetchProjectProgresses();
  }, []);

  const fetchProjectProgresses = async () => {
    try {
      const response = await httpClient().get("/project-progress");
      setProjectProgresses(response.data.progress);
    } catch (error) {
      console.error("Error fetching project progresses:", error);
    }
  };

  const handleCreateProgress = async (data) => {
    try {
      const response = await httpClient().post("/project-progress", data);
      if (response.status === 201) {
        showToastMessage("Progress created successfully");
        fetchProjectProgresses();
      }
    } catch (error) {
      console.error("Error creating project progress:", error);
      showToastMessage("Failed to create progress");
    }
  };

  const handleUpdateProgress = async (data) => {
    try {
      const response = await httpClient().put(
        `/project-progress/${data.id}`,
        data
      );
      if (response.status === 200) {
        showToastMessage("Progress updated successfully");
        fetchProjectProgresses();
      }
    } catch (error) {
      console.error("Error updating project progress:", error);
      showToastMessage("Failed to update progress");
    }
  };

  const handleDeleteProgress = async (id) => {
    try {
      const response = await httpClient().delete(`/project-progress/${id}`);
      if (response.status === 200) {
        showToastMessage("Progress deleted successfully");
        fetchProjectProgresses();
      }
    } catch (error) {
      console.error("Error deleting project progress:", error);
      showToastMessage("Failed to delete progress");
    }
  };

  const selectProgress = (progress) => {
    setSelectedProgress(progress);
    setFormData(progress);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProgress) {
      handleUpdateProgress(formData);
    } else {
      handleCreateProgress(formData);
    }

    // Clear the form
    setFormData({
      TaskID: "",
      ProgressPercentage: "",
      ProgressDescription: "",
      ProgressDate: "",
    });
  };

  return (
    <Container className="project-progress-container">
      <h2 className="text-center mt-3">Task Progress Manager</h2>
      <Row className="justify-content-center">
        <Col xs={12} sm={6}>
          <Card>
            <Card.Body>
              <h3>{selectedProgress ? "Edit Progress" : "Create Progress"}</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Task ID:</Form.Label>
                  <Form.Control
                    type="text"
                    name="TaskID"
                    value={formData.TaskID}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Progress Percentage:</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProgressPercentage"
                    value={formData.ProgressPercentage}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Progress Description:</Form.Label>
                  <Form.Control
                    type="text"
                    name="ProgressDescription"
                    value={formData.ProgressDescription}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Progress Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="ProgressDate"
                    value={formData.ProgressDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button className="mt-3" type="submit">
                  {selectedProgress ? "Update" : "Create"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} sm={6}>
          <h2 className="text-center mt-3">Task Progress List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>TaskID</th>
                <th>Progress Percentage</th>
                <th>Progress Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectProgresses.map((progress) => (
                <tr key={progress.id}>
                  <td>{progress.TaskID}</td>
                  <td>{progress.ProgressPercentage}%</td>
                  <td>{progress.ProgressDate}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => selectProgress(progress)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProgress(progress.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <ToastContainer className="toast-container"></ToastContainer>
    </Container>
  );
};

export default ProjectProgress;
