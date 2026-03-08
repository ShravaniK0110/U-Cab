import React, { useEffect, useState } from 'react';
import Unav from '../components/Unav';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cabs = () => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/cars/');
        setCabs(res.data);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchCabs();
  }, []);

  const handleSort = () => {
    const sorted = [...cabs].sort((a, b) => a.pricePerKm - b.pricePerKm);
    setCabs(sorted);
  };

  const filteredCabs = cabs.filter(car => 
    car.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (searchType === '' || car.type.toLowerCase() === searchType.toLowerCase())
  );

  return (
    <>
      <Unav />
      <Container className="mt-4 mb-5">
        <h2 className="text-center mb-4 fw-bold">Available Cabs</h2>
        
        <Row className="mb-4 d-flex justify-content-center align-items-center">
          <Col md={3}>
            <Form.Control 
              type="text" 
              placeholder="Search by car name" 
              value={searchName} 
              onChange={e => setSearchName(e.target.value)} 
            />
          </Col>
          <Col md={3}>
            <Form.Control 
              type="text" 
              placeholder="Search by car type" 
              value={searchType} 
              onChange={e => setSearchType(e.target.value)} 
            />
          </Col>
          <Col md={3}>
            <Button className="btn-amber w-100" onClick={handleSort}>
              Sort Price: Low to High
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center mt-5"><Spinner animation="border" /></div>
        ) : filteredCabs.length === 0 ? (
          <div className="text-center text-muted mt-5 fs-5">No cabs available currently.</div>
        ) : (
          <Row>
            {filteredCabs.map(car => (
              <Col md={4} key={car._id} className="mb-4">
                <Card className="card-custom h-100 border-0 shadow-sm">
                  <Card.Img variant="top" src={`http://localhost:8000/${car.image}`} style={{ height: '220px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column">
                    <Row className="mb-2">
                      <Col><strong className="text-muted">Model:</strong> {car.name} {car.model}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col><strong>Type:</strong> {car.type}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col><strong>Car No:</strong> {car.plateNumber}</Col>
                    </Row>
                    <Row className="mb-2">
                      <Col><strong>Driver:</strong> {car.driverName || 'Not Assigned'}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col><strong>Fare:</strong> Rs. {car.pricePerKm} per km</Col>
                    </Row>
                    
                    <div className="mt-auto text-center border-top pt-3">
                      <Link to={`/bookcab/${car._id}`} className="text-decoration-underline text-amber fw-bold fs-5">
                        Book Cab
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Cabs;