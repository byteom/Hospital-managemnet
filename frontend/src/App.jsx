import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card, Modal, Spinner, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    image: "",
    specialty: "",
    rating: "",
  });
  const [editHospitalId, setEditHospitalId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch all hospitals on component mount
  useEffect(() => {
    fetchAllHospitals();
  }, []);

  // Fetch all hospitals
  const fetchAllHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/v1/hospitals");
      setHospitals(response.data);
    } catch (err) {
      showToastMessage("Error fetching hospitals");
    } finally {
      setLoading(false);
    }
  };

  // Fetch hospitals by city
  const fetchHospitalsByCity = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/hospitals?city=${city}`);
      setHospitals(response.data);
    } catch (err) {
      showToastMessage("Error fetching hospitals by city");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editHospitalId) {
        // Update hospital
        await axios.put(`http://localhost:5000/api/v1/hospitals/update?id=${editHospitalId}`, formData);
        showToastMessage("Hospital updated successfully!");
      } else {
        // Create hospital
        await axios.post("http://localhost:5000/api/v1/hospitals/create", formData);
        showToastMessage("Hospital created successfully!");
      }
      setFormData({ name: "", city: "", image: "", specialty: "", rating: "" }); // Reset form
      setEditHospitalId(null); // Reset edit mode
      fetchAllHospitals(); // Refresh hospital list
    } catch (err) {
      showToastMessage("Error saving hospital");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (hospital) => {
    setFormData({
      name: hospital.name,
      city: hospital.city,
      image: hospital.image,
      specialty: hospital.specialty,
      rating: hospital.rating,
    });
    setEditHospitalId(hospital._id);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/v1/hospitals/delete?id=${id}`);
      showToastMessage("Hospital deleted successfully!");
      fetchAllHospitals(); // Refresh hospital list
    } catch (err) {
      showToastMessage("Error deleting hospital");
    } finally {
      setLoading(false);
    }
  };

  // Show toast message
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Hospital Management System</h1>

      {/* Hospital Form */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  name="specialty"
                  placeholder="Specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md={1}>
                <Form.Control
                  type="number"
                  name="rating"
                  placeholder="Rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md={1}>
                <Button type="submit" variant="primary" disabled={loading}>
                  {editHospitalId ? "Update" : "Create"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Search Hospitals by City */}
      <Card className="mb-4">
        <Card.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter Complete city Name"
              onChange={(e) => fetchHospitalsByCity(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* List of All Hospitals */}
      <Row>
        {loading ? (
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        ) : (
          hospitals.map((hospital) => (
            <Col key={hospital._id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={hospital.image} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{hospital.name}</Card.Title>
                  <Card.Text>
                    <strong>City:</strong> {hospital.city}<br />
                    <strong>Specialty:</strong> {hospital.specialty}<br />
                    <strong>Rating:</strong> {hospital.rating}
                  </Card.Text>
                  <Button variant="warning" onClick={() => handleEdit(hospital)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(hospital._id)} className="ms-2">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default App;
