import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#fffde7', minHeight: '100vh' }}>
      <Navbar className="bg-amber shadow-sm" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-dark">Ucab App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <NavDropdown title={<span className="fw-bold text-dark">Login</span>} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/login">User Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/login">Admin Login</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5 pt-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-5 mb-md-0">
            <h1 className="display-4 fw-bold text-dark mb-4">Your Ride, Your Way</h1>
            <p className="lead text-secondary mb-4 fs-4">
              Reliable. Fast. Affordable. Book cabs anytime, anywhere.
            </p>
            <Button variant="dark" size="lg" className="btn-dark-custom px-5 py-3 fs-5" as={Link} to="/register">
              Explore Services
            </Button>
          </Col>
          <Col md={6} className="text-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1048/1048314.png" 
              alt="Taxi" 
              className="img-fluid" 
              style={{ maxWidth: '80%', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} 
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;