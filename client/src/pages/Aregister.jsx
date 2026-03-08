import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Aregister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/admin/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      navigate('/admin/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#fffde7' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow-sm border-0 rounded-4">
        <h2 className="text-center mb-4 fw-bold">Admin Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Name</Form.Label>
            <Form.Control type="text" name="name" required onChange={handleChange} className="py-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Email address</Form.Label>
            <Form.Control type="email" name="email" required onChange={handleChange} className="py-2" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Password</Form.Label>
            <Form.Control type="password" name="password" required onChange={handleChange} className="py-2" />
          </Form.Group>
          <Button type="submit" className="w-100 mb-3 py-2 btn-dark-custom fs-5 rounded-3">
            Register
          </Button>
        </Form>
        <div className="text-center mb-2">
          <span className="text-muted d-block mb-3">Already an admin?</span>
          <Link to="/admin/login">
            <Button className="w-100 py-2 btn-amber fw-bold rounded-3">Login</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Aregister;