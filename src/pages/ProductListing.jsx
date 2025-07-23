import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

// --- ProductListing Component --- //
// This component fetches and displays a list of all products from the API.
// It handles loading and error states and presents the products in a responsive grid.
function ProductListing() {
  // --- State Management --- //
  // Holds the array of products fetched from the API.
  const [products, setProducts] = useState([]);
  // Tracks the loading state while fetching data.
  const [loading, setLoading] = useState(true);
  // Stores error messages for user feedback.
  const [errorMessage, setErrorMessage] = useState('');

  // --- Data Fetching --- //
  // Fetches the list of products when the component mounts.
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  // --- Render Method --- //
  // Displays a spinner while the products are loading.
  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Displays an error message if fetching fails.
  if (errorMessage) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{errorMessage}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 fade-in">
      <h2 className="text-center mb-5">Our Products</h2>

      {/* --- Products Grid --- */}
      {/* ================================================================= */}
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="product-card h-100">
              <Card.Img variant="top" src={product.image} alt={product.title} className="product-card-img" />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">{product.title}</Card.Title>
                <Card.Text className="card-text mt-auto">${product.price.toFixed(2)}</Card.Text>
                <Button variant="primary" as={Link} to={`/products/${product.id}`} className="mt-2">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductListing;
