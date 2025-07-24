import { Link } from 'react-router-dom';
import { Button, Container, Carousel, Row, Col, Card, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// --- Home Component --- //
// Professional landing page for the FakeStore application with enhanced features
function Home() {
  const [stats, setStats] = useState({ totalProducts: 0, categories: 0, happyCustomers: 1250 });
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // --- Data Fetching --- //
  useEffect(() => {
    // Fetch some featured products for the carousel
    fetch('https://fakestoreapi.com/products?limit=3')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data))
      .catch(err => console.error('Error fetching featured products:', err));

    // Simulate fetching stats
    setStats({ totalProducts: 120, categories: 4, happyCustomers: 1250 });
  }, []);

  // --- Static Data --- //
  const features = [
    {
      icon: '🛡️',
      title: 'Secure Shopping',
      description: 'Your transactions are protected with bank-level security'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Free shipping on orders over $50 with 2-day delivery'
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: '30-day hassle-free returns on all items'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Round-the-clock customer service to help you'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Buyer',
      rating: 5,
      feedback: 'Outstanding quality and service! The products exceeded my expectations. Fast shipping and great customer support.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Premium Member',
      rating: 5,
      feedback: 'Been shopping here for 2 years. Consistently great products, competitive prices, and reliable delivery.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Wilson',
      role: 'Fashion Enthusiast',
      rating: 5,
      feedback: 'Love the variety and style! Found exactly what I was looking for. The quality is amazing for the price.',
      avatar: '👩‍🎨'
    }
  ];

  // --- Helper Functions --- //
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : '#e4e5e9', fontSize: '1.2rem' }}>
        ★
      </span>
    ));
  };

  // --- Render Method --- //
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="page-header">
        <Container>
          <h1 className="page-title">
            🛒 Welcome to FakeStore
          </h1>
          <p className="page-subtitle">
            Discover premium quality products at unbeatable prices
          </p>
          <div className="mt-4">
            <Button
              as={Link}
              to="/products"
              className="btn-professional me-3"
              size="lg"
            >
              Shop Now
            </Button>
            <Button
              as={Link}
              to="/add-product"
              className="btn-success-professional"
              size="lg"
            >
              Add Product
            </Button>
          </div>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="mb-5">
        <Row className="g-4">
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">{stats.totalProducts}+</div>
              <div className="stats-label">Products Available</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">{stats.categories}</div>
              <div className="stats-label">Categories</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stats-card">
              <div className="stats-number">{stats.happyCustomers}+</div>
              <div className="stats-label">Happy Customers</div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="mb-5">
        <h2 className="text-center mb-5 fw-bold">Why Choose FakeStore?</h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="professional-card h-100 text-center p-4">
                <div style={{ fontSize: '3rem' }} className="mb-3">
                  {feature.icon}
                </div>
                <Card.Body>
                  <Card.Title className="h5 fw-bold mb-3">
                    {feature.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <Container className="mb-5">
          <h2 className="text-center mb-5 fw-bold">Featured Products</h2>
          <Carousel fade interval={4000} className="professional-card">
            {featuredProducts.map((product, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '400px', background: '#f8f9fa' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ maxHeight: '350px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
                <Carousel.Caption className="bg-dark bg-opacity-75 rounded p-4">
                  <h3 className="h4">{product.title.substring(0, 50)}...</h3>
                  <p className="mb-2">{product.description.substring(0, 100)}...</p>
                  <Badge bg="success" className="fs-6 p-2">
                    ${product.price}
                  </Badge>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      )}

      {/* Customer Testimonials */}
      <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }} className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">What Our Customers Say</h2>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index}>
                <Card className="professional-card h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ fontSize: '4rem' }}>
                      {testimonial.avatar}
                    </div>
                    <div className="mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <Card.Text className="fst-italic mb-4 text-muted">
                      "{testimonial.feedback}"
                    </Card.Text>
                    <div>
                      <Card.Title className="h6 mb-1">
                        {testimonial.name}
                      </Card.Title>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Call to Action Section */}
      <Container className="text-center py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="fw-bold mb-4">Ready to Start Shopping?</h2>
            <p className="lead text-muted mb-4">
              Join thousands of satisfied customers who trust FakeStore for their shopping needs.
              Browse our extensive collection of high-quality products.
            </p>
            <div>
              <Button
                as={Link}
                to="/products"
                className="btn-professional me-3"
                size="lg"
              >
                Browse Products
              </Button>
              <Button
                as={Link}
                to="/add-product"
                className="btn-success-professional"
                size="lg"
              >
                Become a Seller
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;