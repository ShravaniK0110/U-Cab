import React, { useEffect, useState } from 'react';
import Anav from '../components/Anav';
import { Container, Table, Spinner, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchUsers();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <>
      <Anav />
      <Container className="mt-4">
        <h2 className="mb-4 fw-bold">Users</h2>
        {loading ? <div className="text-center"><Spinner animation="border" /></div> : (
          <Card className="shadow-sm card-custom border-0 overflow-hidden">
            <Table responsive hover className="mb-0">
              <thead>
                <tr className="bg-amber text-dark">
                  <th className="py-3 px-3">Sl/No</th>
                  <th className="py-3 px-3">UserId</th>
                  <th className="py-3 px-3">User Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3 text-center">Operation</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={u._id} className="align-middle">
                    <td className="px-3 fw-medium">{index + 1}</td>
                    <td className="px-3 text-muted small">{u._id}</td>
                    <td className="px-3 fw-bold">{u.name}</td>
                    <td className="px-3">{u.email}</td>
                    <td className="px-3 text-center">
                      <Link to={`/admin/users/edit/${u._id}`} className="text-primary me-3 text-decoration-none">
                        <i className="bi bi-pencil-square fs-5"></i>
                      </Link>
                      <span className="text-danger me-3" style={{cursor:'pointer'}} onClick={() => handleDelete(u._id)}>
                        <i className="bi bi-trash-fill fs-5"></i>
                      </span>
                      <Link to={`/admin/users/view/${u._id}`} className="btn btn-sm btn-dark-custom">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Users;