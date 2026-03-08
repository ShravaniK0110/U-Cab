import React, { useEffect, useState } from 'react';
import Anav from '../components/Anav';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/users/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const user = res.data.find(u => u._id === id);
        if (user) setFormData({ name: user.name, email: user.email, phone: user.phone || '' });
      } catch (err) { console.error(err); }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/admin/users');
    } catch (err) { setError(err.response?.data?.message || 'Error updating user'); }
  };

  return (
    <>
      <Anav />
      <Container className="d-flex justify-content-center mt-5">
        <Card style={{ width: '500px' }} className="p-4 shadow-sm card-custom border-0">
          <h3 className="mb-4">Edit User</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="py-2" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="py-2" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="py-2" />
            </Form.Group>
            <Button type="submit" className="w-100 btn-amber py-2 fs-5">Save Changes</Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default UserEdit;