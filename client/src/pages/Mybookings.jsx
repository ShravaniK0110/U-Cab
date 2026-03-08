import React, { useEffect, useState } from 'react';
import Unav from '../components/Unav';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Mybookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/bookings/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBookings(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <>
      <Unav />
      <Container className="mt-4 mb-5">
        <h2 className="mb-4 fw-bold">My Bookings</h2>
        {loading ? <div className="text-center mt-5"><Spinner animation="border" /></div> : 
          bookings.length === 0 ? (
            <div className="text-center mt-5">
              <h4 className="text-muted mb-3">No bookings yet</h4>
              <Link to="/cabs"><Button className="btn-amber">Book a Cab</Button></Link>
            </div>
          ) : (
            <Row>
              {bookings.map(b => (
                <Col md={12} key={b._id} className="mb-4">
                  <Card className="card-custom p-3 border-0 shadow-sm">
                    <Row className="mb-3">
                      <Col md={2}>
                        <div className="text-muted small">Cab Booked Date</div>
                        <div className="fw-bold">{new Date(b.createdAt).toLocaleDateString()}</div>
                      </Col>
                      <Col md={3}>
                        <div className="text-muted small">Trip</div>
                        <div className="fw-bold">{b.pickup.split(',')[1] || 'City'} to {b.dropoff.split(',')[1] || 'City'}</div>
                      </Col>
                      <Col md={3}>
                        <div className="text-muted small">Pickup Date & Time</div>
                        <div className="fw-bold">{new Date(b.date).toLocaleDateString()} {b.pickupTime || ''}</div>
                      </Col>
                      <Col md={2}>
                        <div className="text-muted small">Drop Date & Time</div>
                        <div className="fw-bold">{b.dropDate ? new Date(b.dropDate).toLocaleDateString() : 'N/A'} {b.dropTime || ''}</div>
                      </Col>
                      <Col md={2}>
                        <div className="text-muted small">Driver name</div>
                        <div className="fw-bold">{b.carId?.driverName || 'Unassigned'}</div>
                      </Col>
                    </Row>
                    <hr className="my-2" />
                    <Row className="align-items-center">
                      <Col md={2}>
                        <div className="text-muted small">Car name</div>
                        <div className="fw-bold">{b.carId?.name || 'Deleted'}</div>
                      </Col>
                      <Col md={2}>
                        <div className="text-muted small">Car Type</div>
                        <div className="fw-bold">{b.carId?.type || 'N/A'}</div>
                      </Col>
                      <Col md={3}>
                        <div className="text-muted small">Car No</div>
                        <div className="fw-bold">{b.carId?.plateNumber || 'N/A'}</div>
                      </Col>
                      <Col md={2}>
                        <div className="text-muted small">Amount Paid</div>
                        <div className="fw-bold text-success">Rs. {b.fare}</div>
                      </Col>
                      <Col md={3} className="text-end">
                        <div className="fw-bold text-amber fs-5">{b.status === 'pending' ? 'On the Way' : b.status}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          )
        }
      </Container>
    </>
  );
};

export default Mybookings;