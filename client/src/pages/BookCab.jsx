import React, { useEffect, useState } from 'react';
import Unav from '../components/Unav';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookCab = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({ 
    pickupState: '', pickupCity: '', pickupText: '', 
    dropState: '', dropCity: '', dropText: '', 
    pickupDate: '', pickupTime: '', dropDate: '', dropTime: '' 
  });
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/cars/${id}`);
        setCar(res.data);
      } catch (err) { setError('Failed to load car details'); }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEstimate = () => {
    if (!formData.pickupCity || !formData.dropCity || !formData.pickupDate) return setError('Fill required fields');
    const fakeDistance = Math.floor(Math.random() * 26) + 5;
    setEstimatedFare(fakeDistance * car.pricePerKm);
    setError('');
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if(!estimatedFare) return setError('Please calculate fare first');
    
    try {
      const payload = {
        carId: id,
        pickup: `${formData.pickupText}, ${formData.pickupCity}, ${formData.pickupState}`,
        dropoff: `${formData.dropText}, ${formData.dropCity}, ${formData.dropState}`,
        date: formData.pickupDate,
        pickupTime: formData.pickupTime,
        dropDate: formData.dropDate,
        dropTime: formData.dropTime,
        distance: estimatedFare / car.pricePerKm,
        fare: estimatedFare
      };
      await axios.post('http://localhost:8000/api/bookings/', payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/mybookings');
    } catch (err) { setError(err.response?.data?.message || 'Booking failed'); }
  };

  return (
    <>
      <Unav />
      <Container className="mt-5 mb-5 d-flex justify-content-center">
        <Card style={{ width: '700px' }} className="card-custom p-4">
          <h2 className="text-center mb-4 fw-bold">Book a Ride</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleBook}>
            <h5 className="text-muted border-bottom pb-2 mb-3">Pickup Location</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select State</Form.Label>
                  <Form.Select name="pickupState" onChange={handleChange} required>
                    <option value="">Select State</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select City</Form.Label>
                  <Form.Select name="pickupCity" onChange={handleChange} required>
                    <option value="">Select City</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="New Delhi">New Delhi</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Control type="text" name="pickupText" placeholder="Specific pickup details" onChange={handleChange} required />
            </Form.Group>

            <h5 className="text-muted border-bottom pb-2 mb-3">Drop Location</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select State</Form.Label>
                  <Form.Select name="dropState" onChange={handleChange} required>
                    <option value="">Select State</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select City</Form.Label>
                  <Form.Select name="dropCity" onChange={handleChange} required>
                    <option value="">Select City</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="New Delhi">New Delhi</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Control type="text" name="dropText" placeholder="Specific drop details" onChange={handleChange} required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pickup Date</Form.Label>
                  <Form.Control type="date" name="pickupDate" required onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pickup Time</Form.Label>
                  <Form.Control type="time" name="pickupTime" required onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Drop Date</Form.Label>
                  <Form.Control type="date" name="dropDate" required onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Drop Time</Form.Label>
                  <Form.Control type="time" name="dropTime" required onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            {!estimatedFare ? (
              <Button className="btn-amber w-100 py-2 fs-5" onClick={handleEstimate}>Calculate Fare</Button>
            ) : (
              <>
                <Alert variant="warning" className="text-center fw-bold fs-5">Estimated Fare: Rs. {estimatedFare}</Alert>
                <Button className="btn-amber w-100 py-2 fs-5" type="submit">Book Ride</Button>
              </>
            )}
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default BookCab;