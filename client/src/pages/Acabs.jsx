import React, { useEffect, useState } from 'react';
import Anav from '../components/Anav';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Acabs = () => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');

  const fetchCabs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/cars/admin', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCabs(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchCabs(); }, []);

  const handleSort = () => {
    const sorted = [...cabs].sort((a, b) => a.pricePerKm - b.pricePerKm);
    setCabs(sorted);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this cab?')) {
      try {
        await axios.delete(`http://localhost:8000/api/cars/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchCabs();
      } catch (err) { console.error(err); }
    }
  };

  const filteredCabs = cabs.filter(car => 
    car.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (searchType === '' || car.type.toLowerCase() === searchType.toLowerCase())
  );

  return (
    <>
      <Anav />
      <Container className="mt-4 mb-5">
        <h2 className="mb-4 fw-bold text-center">Car List</h2>
        
        <Row className="mb-4 d-flex justify-content-center align-items-center">
          <Col md={3}>
            <Form.Control type="text" placeholder="Search by car name" value={searchName} onChange={e => setSearchName(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Control type="text" placeholder="Search by car type" value={searchType} onChange={e => setSearchType(e.target.value)} />
          </Col>
          <Col md={3}>
            <Button className="btn-amber w-100" onClick={handleSort}>Sort Price</Button>
          </Col>
        </Row>

        {loading ? <div className="text-center mt-5"><Spinner animation="border" /></div> : (
          <Row>
            {filteredCabs.map(car => (
              <Col md={3} key={car._id} className="mb-4">
                <Card className="shadow-sm card-custom h-100 border-0">
                  <Card.Img variant="top" src={`http://localhost:8000/${car.image}`} style={{ height: '180px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column p-3">
                    <Row className="mb-1"><Col><strong className="text-muted small">Driver:</strong> {car.driverName || 'N/A'}</Col></Row>
                    <Row className="mb-1"><Col><strong className="text-muted small">Model:</strong> {car.name} {car.model}</Col></Row>
                    <Row className="mb-1"><Col><strong className="text-muted small">Type:</strong> {car.type}</Col></Row>
                    <Row className="mb-1"><Col><strong className="text-muted small">Number:</strong> {car.plateNumber}</Col></Row>
                    <Row className="mb-3"><Col><strong className="text-muted small">Price:</strong> Rs. {car.pricePerKm}</Col></Row>
                    
                    <div className="mt-auto d-flex justify-content-between gap-2">
                      <Link to={`/admin/cabs/edit/${car._id}`} className="w-50">
                        <Button variant="dark" className="w-100 btn-dark-custom">Edit</Button>
                      </Link>
                      <Button variant="danger" className="w-50" onClick={() => handleDelete(car._id)}>Delete</Button>
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

export default Acabs;