import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Spinner, Alert, Form, Badge, InputGroup } from 'react-bootstrap';
import axios from 'axios';

// --- ProductListing Component --- //
// Enhanced product listing with search, filter, and sort functionality
function ProductListing() {
  // --- State Management --- //
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [categories, setCategories] = useState([]);

  // --- Data Fetching --- //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);

        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Filtering and Sorting Logic --- //
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // --- Helper Functions --- //
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="d-flex align-items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-warning">★</span>
        ))}
        {hasHalfStar && <span className="text-warning">☆</span>}
        <small className="ms-1 text-muted">({rating})</small>
      </div>
    );
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      "men's clothing": "primary",
      "women's clothing": "info",
      "jewelery": "warning",
      "electronics": "success"
    };
    return colors[category] || "secondary";
  };

  // --- Loading State --- //
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="loading-spinner mb-3"></div>
          <h5 className="text-muted">Loading amazing products...</h5>
        </div>
      </Container>
    );
  }

  // --- Error State --- //
  if (errorMessage) {
    return (
      <Container className="mt-5">
        <div className="error-container">
          <div className="error-icon">😞</div>
          <h3>Oops! Something went wrong</h3>
          <Alert variant="danger" className="mt-3">{errorMessage}</Alert>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <Container>
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">
            Discover {products.length} amazing products across {categories.length} categories
          </p>
        </Container>
      </div>

      <Container>
        {/* Search and Filter Section */}
        <div className="search-filter-section mb-4">
          <Row className="g-3 align-items-end">
            <Col md={4}>
              <Form.Label className="form-label-professional">🔍 Search Products</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control-professional"
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <Form.Label className="form-label-professional">📂 Category</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-control-professional"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3}>
              <Form.Label className="form-label-professional">🔄 Sort By</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-control-professional"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating (Best First)</option>
              </Form.Select>
            </Col>

            <Col md={2}>
              <div className="text-center">
                <div className="fw-bold text-primary fs-4">{filteredProducts.length}</div>
                <small className="text-muted">Products Found</small>
              </div>
            </Col>
          </Row>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }}>🔍</div>
            <h4 className="mt-3">No products found</h4>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                <Card className="product-card h-100">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                    <Badge
                      bg={getCategoryBadgeColor(product.category)}
                      className="position-absolute top-0 start-0 m-2"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  <Card.Body className="d-flex flex-column p-3">
                    <Card.Title className="product-title h6">
                      {product.title.length > 50
                        ? `${product.title.substring(0, 50)}...`
                        : product.title
                      }
                    </Card.Title>

                    <div className="mb-2">
                      {renderStars(product.rating.rate)}
                      <small className="text-muted d-block">
                        {product.rating.count} reviews
                      </small>
                    </div>

                    <Card.Text className="text-muted small flex-grow-1">
                      {product.description.substring(0, 80)}...
                    </Card.Text>

                    <div className="mt-auto">
                      <div className="product-price mb-2">
                        ${product.price.toFixed(2)}
                      </div>
                      <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        className="btn-professional w-100"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default ProductListing;
