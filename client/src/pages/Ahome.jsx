import React, { useEffect, useState } from 'react';
import Anav from '../components/Anav';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Ahome = () => {
  const [stats, setStats] = useState({ users: 0, cabs: 0, totalBookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, cabsRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/users/', { headers }),
          axios.get('http://localhost:8000/api/cars/admin', { headers }),
          axios.get('http://localhost:8000/api/bookings/', { headers })
        ]);

        setStats({
          users: usersRes.data.length,
          cabs: cabsRes.data.length,
          totalBookings: bookingsRes.data.length
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const chartData = [
    { name: 'Users', count: stats.users },
    { name: 'Cabs', count: stats.cabs },
    { name: 'Bookings', count: stats.totalBookings }
  ];

  return (
    <>
      <Anav />
      <Container className="mt-4 mb-5">
        <h2 className="mb-4 fw-bold">Dashboard</h2>
        
        {loading ? <div className="text-center mt-5"><Spinner animation="border" /></div> : (
          <>
            <Row className="mb-5">
              <Col md={4} className="mb-3">
                <Link to="/admin/users" className="text-decoration-none">
                  <Card className="text-center shadow-sm card-custom border-0" style={{ backgroundColor: '#f5a623' }}>
                    <Card.Body className="py-4">
                      <Card.Title className="text-dark fw-bold fs-1">{stats.users}</Card.Title>
                      <Card.Text className="text-dark fw-medium fs-5 text-uppercase">Users</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={4} className="mb-3">
                <Link to="/admin/cabs" className="text-decoration-none">
                  <Card className="text-center shadow-sm card-custom border-0" style={{ backgroundColor: '#f5a623' }}>
                    <Card.Body className="py-4">
                      <Card.Title className="text-dark fw-bold fs-1">{stats.cabs}</Card.Title>
                      <Card.Text className="text-dark fw-medium fs-5 text-uppercase">Cabs</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={4} className="mb-3">
                <Link to="/admin/bookings" className="text-decoration-none">
                  <Card className="text-center shadow-sm card-custom border-0" style={{ backgroundColor: '#f5a623' }}>
                    <Card.Body className="py-4">
                      <Card.Title className="text-dark fw-bold fs-1">{stats.totalBookings}</Card.Title>
                      <Card.Text className="text-dark fw-medium fs-5 text-uppercase">Bookings</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>

            <Card className="shadow-sm card-custom p-4 mt-4">
              <h4 className="mb-4 fw-bold">Platform Overview</h4>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="count" fill="#f5a623" radius={[4, 4, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </>
        )}
      </Container>
    </>
  );
};

export default Ahome;