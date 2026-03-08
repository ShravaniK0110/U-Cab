import React, { useEffect, useState } from 'react';
import Anav from '../components/Anav';
import { Container, Row, Col, Card, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/bookings/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBookings(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/bookings/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this booking?')) {
      try {
        await axios.delete(`http://localhost:8000/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchBookings();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <>
      <Anav />
      <Container className="mt-4 mb-5">
        <h2 className="mb-4 fw-bold">My Booking</h2>
        {loading ? <div className="text-center mt-5"><Spinner animation="border" /></div> : 
          bookings.length === 0 ? (
            <div className="text-center text-muted mt-5 fs-5">No bookings found.</div>
          ) : (
            <Row>
              {bookings.map(b => (
                <Col md={12} key={b._id} className="mb-4">
                  <Card className="card-custom p-3 border-0 shadow-sm position-relative">
                    <div 
                      className="position-absolute top-0 end-0 p-3 text-danger" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(b._id)}
                    >
                      <i className="bi bi-trash-fill fs-5"></i>
                    </div>
                    <Row className="mb-3 mt-2">
                      <Col md={2}>
                        <div className="text-muted small">Date</div>
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
                        <div className="text-muted small">Driver</div>
                        <div className="fw-bold">{b.carId?.driverName || 'Unassigned'}</div>
                      </Col>
                    </Row>
                    <hr className="my-2" />
                    <Row className="align-items-center">
                      <Col md={3}>
                        <div className="text-muted small">Car</div>
                        <div className="fw-bold">{b.carId?.name || 'Deleted'} ({b.carId?.type || 'N/A'})</div>
                      </Col>
                      <Col md={2}>
                        <div className="text-muted small">Car No</div>
                        <div className="fw-bold">{b.carId?.plateNumber || 'N/A'}</div>
                      </Col>
                      <Col md={2}>
                        <div className="text-muted small">Amount</div>
                        <div className="fw-bold text-success">Rs. {b.fare}</div>
                      </Col>
                      <Col md={2}>
                        <div className="text-muted small">Status</div>
                        <div className="fw-bold text-amber">{b.status === 'pending' ? 'On the Way' : b.status}</div>
                      </Col>
                      <Col md={3}>
                        <Form.Select size="sm" value={b.status} onChange={(e) => updateStatus(b._id, e.target.value)} className="w-100">
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </Form.Select>
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

export default Bookings;