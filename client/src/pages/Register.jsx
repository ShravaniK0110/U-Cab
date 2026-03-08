import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/uhome');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#fffde7' }}>
      <Card style={{ width: '450px' }} className="p-4 shadow-sm border-0 rounded-4">
        <h2 className="text-center mb-4 fw-bold">Register</h2>
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
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Phone</Form.Label>
            <Form.Control type="text" name="phone" required onChange={handleChange} className="py-2" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Password</Form.Label>
            <Form.Control type="password" name="password" required onChange={handleChange} className="py-2" />
          </Form.Group>
          <Button variant="dark" type="submit" className="w-100 mb-4 py-2 btn-dark-custom fs-5 rounded-3">
            Signup
          </Button>
        </Form>
        <div className="text-center mb-2">
          <span className="text-muted d-block mb-3">Already have an account?</span>
          <Link to="/login">
            <Button className="w-100 py-2 btn-amber fw-bold rounded-3">Login</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Register;