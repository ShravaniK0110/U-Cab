import React, { useEffect, useState } from 'react';
import Anav from '../components/Anav';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Acabedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', model: '', plateNumber: '', seats: '', type: 'Mini', pricePerKm: '', isAvailable: true, driverName: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/cars/${id}`);
        const c = res.data;
        setFormData({
          name: c.name, model: c.model, plateNumber: c.plateNumber,
          seats: c.seats, type: c.type, pricePerKm: c.pricePerKm, isAvailable: c.isAvailable, driverName: c.driverName || ''
        });
      } catch (err) { console.error(err); }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await axios.put(`http://localhost:8000/api/cars/${id}`, data, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/admin/cabs');
    } catch (err) { setError(err.response?.data?.message || 'Error updating cab'); }
  };

  return (
    <>
      <Anav />
      <Container className="d-flex justify-content-center mt-5 mb-5">
        <Card style={{ width: '600px' }} className="p-4 shadow-sm card-custom border-0">
          <h3 className="mb-4 text-center fw-bold">Edit Car Data</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Driver Name</Form.Label>
              <Form.Control type="text" name="driverName" value={formData.driverName} onChange={handleChange} required className="py-2" />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required className="py-2" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car Model</Form.Label>
                  <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required className="py-2" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car No (Plate)</Form.Label>
                  <Form.Control type="text" name="plateNumber" value={formData.plateNumber} onChange={handleChange} required className="py-2" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Seats</Form.Label>
                  <Form.Control type="number" name="seats" value={formData.seats} onChange={handleChange} required className="py-2" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Car Type</Form.Label>
                  <Form.Select name="type" value={formData.type} onChange={handleChange} className="py-2">
                    <option value="Mini">Mini</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Premium">Premium</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per KM (Rs.)</Form.Label>
                  <Form.Control type="number" name="pricePerKm" value={formData.pricePerKm} onChange={handleChange} required className="py-2" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Update Image (Optional)</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} className="py-2" />
            </Form.Group>

            <Button type="submit" className="w-100 btn-amber py-2 fs-5 rounded-3">Update</Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Acabedit;