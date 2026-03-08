import React, { useEffect, useState } from 'react';
import Unav from '../components/Unav';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Uhome = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/bookings/my', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRecentBookings(res.data.slice(0, 3));
      } catch (err) { console.error(err); }
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Unav />
      <Container className="mt-5">
        <h2 className="mb-4">Hello, {user?.name}!</h2>
        
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <Card className="shadow-sm text-center h-100 card-custom border-0">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>Book a Cab</Card.Title>
                <Link to="/cabs"><Button className="mt-2 w-100 btn-dark-custom">Browse Cabs</Button></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm text-center h-100 card-custom border-0">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>My Bookings</Card.Title>
                <Link to="/mybookings"><Button variant="outline-dark" className="mt-2 w-100">View History</Button></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="shadow-sm text-center h-100 card-custom border-0">
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>Profile</Card.Title>
                <Button variant="outline-secondary" className="mt-2 w-100" disabled>Edit Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h4 className="mb-3">Recent Bookings</h4>
        {recentBookings.length === 0 ? <p className="text-muted">No recent bookings found.</p> : (
          <Row>
            {recentBookings.map(b => (
              <Col md={4} key={b._id} className="mb-3">
                <Card className="shadow-sm card-custom border-0">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <strong>{new Date(b.date).toLocaleDateString()}</strong>
                      <span className={`badge bg-${b.status === 'completed' ? 'success' : b.status === 'cancelled' ? 'danger' : 'warning'}`}>{b.status}</span>
                    </div>
                    <p className="mb-1 text-muted small">{b.pickup} to {b.dropoff}</p>
                    <h6 className="mt-2 text-amber fw-bold">Rs. {b.fare}</h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Uhome;