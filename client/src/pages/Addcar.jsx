import React, { useState } from 'react';
import Anav from '../components/Anav';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addcar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', model: '', plateNumber: '', seats: '', type: 'Mini', pricePerKm: '', driverName: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setError('Please upload an image for the car');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('image', image);

    try {
      await axios.post('http://localhost:8000/api/cars/', data, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/admin/cabs');
    } catch (err) { setError(err.response?.data?.message || 'Error adding cab'); }
  };

  return (
    <>
      <Anav />
      <Container className="d-flex justify-content-center mt-5 mb-5">
        <Card style={{ width: '600px' }} className="p-4 shadow-sm card-custom border-0">
          <h3 className="mb-4 text-center fw-bold">Add Car</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Driver Name</Form.Label>
              <Form.Control type="text" name="driverName" className="py-2" required onChange={handleChange} />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car Name</Form.Label>
                  <Form.Control type="text" name="name" className="py-2" required onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car Model</Form.Label>
                  <Form.Control type="text" name="model" className="py-2" required onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car No (Plate)</Form.Label>
                  <Form.Control type="text" name="plateNumber" className="py-2" required onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Seats</Form.Label>
                  <Form.Control type="number" name="seats" className="py-2" required onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car Type</Form.Label>
                  <Form.Select name="type" className="py-2" onChange={handleChange}>
                    <option value="Mini">Mini</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Premium">Premium</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (per km)</Form.Label>
                  <Form.Control type="number" name="pricePerKm" className="py-2" required onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Car Image</Form.Label>
              <Form.Control type="file" accept="image/*" className="py-2" required onChange={handleFileChange} />
            </Form.Group>

            <Button type="submit" className="w-100 py-2 btn-amber fs-5 rounded-3">Submit</Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Addcar;