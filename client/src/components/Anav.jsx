import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Anav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <Navbar className="bg-amber shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/admin/home" className="fw-bold text-dark fs-4">UCab App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/admin/home" className="nav-link-custom mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin/users" className="nav-link-custom mx-2">Users</Nav.Link>
            <Nav.Link as={Link} to="/admin/cabs" className="nav-link-custom mx-2">Cabs</Nav.Link>
            <Nav.Link as={Link} to="/admin/cabs/add" className="nav-link-custom mx-2">AddCab</Nav.Link>
            
            <Button variant="dark" className="btn-dark-custom px-4 ms-3" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Anav;