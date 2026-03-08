import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/uhome');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#fffde7' }}>
      <Card style={{ width: '450px' }} className="p-4 shadow-sm border-0 rounded-4">
        <h2 className="text-center mb-4 fw-bold">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Email address</Form.Label>
            <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} className="py-2" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Password</Form.Label>
            <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} className="py-2" />
          </Form.Group>
          <Button type="submit" className="w-100 mb-3 py-2 btn-amber fs-5 rounded-3">
            Login
          </Button>
        </Form>
        <div className="text-center">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/register" className="text-decoration-none fw-bold text-dark">Signup</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;