import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Unav = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar className="bg-amber shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/uhome" className="fw-bold text-dark fs-4">Ucab App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/uhome" className="nav-link-custom mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/cabs" className="nav-link-custom mx-2">Book Cab</Nav.Link>
            <Nav.Link as={Link} to="/mybookings" className="nav-link-custom mx-2">My Booking</Nav.Link>
            
            <span className="fw-bold mx-3">({user.name})</span>
            <Button variant="dark" className="btn-dark-custom px-4" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unav;