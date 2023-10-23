import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Toast,
  Row,
  Col,
} from "react-bootstrap";
import { httpClient } from "./../../library/http";
import "./Task.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskData, setTaskData] = useState({
    TaskName: "",
    Description: "",
    Priority: 1,
    Status: "Not Started",
    StartDate: "",
    DueDate: "",
    ProjectID: "",
    UserID: "",
    Type: "",
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await httpClient().get("/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      const response = await httpClient().post("/tasks", taskData);
      if (response.status === 201) {
        fetchTasks();
        setShowCreateModal(false);
        setTaskData({
          TaskName: "",
          Description: "",
          Priority: 1,
          Status: "Not Started",
          StartDate: "",
          DueDate: "",
          ProjectID: "",
          UserID: "",
          Type: "",
        });
        setToastMessage("Task created successfully");
      } else {
        console.error("Task creation failed");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;

    if (name === "StartDate" || name === "DueDate") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setTaskData({ ...taskData, [name]: formattedDate });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setTaskData(task);
    setShowEditModal(true);
  };

  const handleEditTask = async () => {
    try {
      await httpClient().put(`/tasks/${selectedTask.id}`, taskData);
      fetchTasks();
      setShowEditModal(false);
      setToastMessage("Task updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await httpClient().delete(`/tasks/${taskId}`);
      fetchTasks();
      setToastMessage("Task deleted successfully");
    } catch (error) {
      console.error(error);
      setToastMessage("Failed to delete the task");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
  };

  const sortTasks = (field) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setTasks(sortedTasks);
  };

  const filterAndSortTasks = () => {
    // Apply filtering first
    const filteredTasks =
      filterStatus === "All"
        ? tasks
        : tasks.filter((task) => task.Status === filterStatus);

    // Apply sorting
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.StartDate > b.StartDate ? 1 : -1;
      } else {
        return a.StartDate < b.StartDate ? 1 : -1;
      }
    });

    return sortedTasks;
  };

  const filteredAndSortedTasks = filterAndSortTasks();

  const renderTasks = () => {
    return filteredAndSortedTasks.map((task) => (
      <tr key={task.id}>
        <td>{task.ProjectID}</td>
        <td>{task.UserID}</td>
        <td>{task.TaskName}</td>
        <td>{task.Description}</td>
        <td>{task.Priority}</td>
        <td>{task.Status}</td>
        <td>
          <Button variant="info" onClick={() => handleEditClick(task)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      <h1 className="my-4">Task Management</h1>
      <div className="d-flex justify-content-between align-items-center my-3">
        <div className="d-flex align-items-center">
          <label className="mr-2">Sort by Start Date:</label>

          <Button
            variant="outline-primary"
            onClick={() => sortTasks("StartDate")}
          >
            Ascending
          </Button>
          <Button
            variant="outline-primary"
            className="ml-2"
            onClick={() => sortTasks("StartDate")}
          >
            Descending
          </Button>
        </div>

        <div className="d-flex align-items-center">
          <label className="mr-2">Filter by Status:</label>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </div>
      </div>

      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Create Task
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ProjectID</th>
            <th>UserID</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTasks()}</tbody>
      </Table>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="TaskName"
                  value={taskData.TaskName}
                  onChange={handleTaskChange}
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
                  value={taskData.Description}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="number"
                  name="Priority"
                  value={taskData.Priority}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="Status"
                  value={taskData.Status}
                  onChange={handleTaskChange}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
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
                  value={taskData.StartDate}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="DueDate"
                  value={taskData.DueDate}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formProjectID">
                <Form.Label>Project ID</Form.Label>
                <Form.Control
                  type="text"
                  name="ProjectID"
                  value={taskData.ProjectID}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formUserID">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="UserID"
                  value={taskData.UserID}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formFile">
                <Form.Label>Attachment</Form.Label>
                <Form.Control
                  type="file"
                  name="Attachment"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="Type"
                  value={taskData.Type}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="TaskName"
                  value={taskData.TaskName}
                  onChange={handleTaskChange}
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
                  value={taskData.Description}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="number"
                  name="Priority"
                  value={taskData.Priority}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="Status"
                  value={taskData.Status}
                  onChange={handleTaskChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
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
                  value={taskData.StartDate}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="DueDate"
                  value={taskData.DueDate}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formProjectID">
                <Form.Label>Project ID</Form.Label>
                <Form.Control
                  type="text"
                  name="ProjectID"
                  value={taskData.ProjectID}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formUserID">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="UserID"
                  value={taskData.UserID}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="Type"
                  value={taskData.Type}
                  onChange={handleTaskChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formFile">
                <Form.Label>Attachment</Form.Label>
                <Form.Control
                  type="file"
                  name="Attachment"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditTask}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={toastMessage !== ""}
        onClose={() => setToastMessage("")}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default TaskManager;
