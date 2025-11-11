import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Spinner, Alert, Form, Badge, InputGroup } from 'react-bootstrap';
import axios from 'axios';

// --- ProductListing Component --- //
// ULTRA-ENHANCED with advanced filtering, cart, and multiple view modes
function ProductListing() {
  // --- State Management --- //
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

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

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (ratingFilter > 0) {
      filtered = filtered.filter(product => product.rating.rate >= ratingFilter);
    }

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
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, ratingFilter]);

  // --- Cart Functions --- //
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

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

  const getMaxPrice = () => {
    return products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000;
  };

  // --- Loading State --- //
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <h5 className="text-muted mt-3">Loading amazing products...</h5>
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
          <h1 className="page-title">🛍️ Our Products</h1>
          <p className="page-subtitle">
            Discover {products.length} amazing products across {categories.length} categories
          </p>
        </Container>
      </div>

      <Container>
        {/* Top Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#3b82f6' }}>
            📊 {filteredProducts.length} Products Found
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button 
              variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              ≡ List
            </Button>
          </div>
        </div>

        <Row className="g-4">
          {/* Sidebar Filters */}
          <Col lg={3}>
            <div className="search-filter-section" style={{ position: 'sticky', top: '100px' }}>
              <h5 className="mb-3" style={{ fontWeight: '700' }}>🔍 Filters</h5>
              
              {/* Search */}
              <div className="mb-4">
                <Form.Label className="form-label-professional mb-2">Search</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control-professional"
                  />
                </InputGroup>
              </div>

              {/* Category */}
              <div className="mb-4">
                <Form.Label className="form-label-professional mb-2">📂 Category</Form.Label>
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
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <Form.Label className="form-label-professional mb-2">💰 Price Range</Form.Label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Form.Control
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Math.max(0, parseInt(e.target.value) || 0), priceRange[1]])}
                    placeholder="Min"
                    className="form-control-professional"
                    style={{ fontSize: '0.9rem' }}
                  />
                  <Form.Control
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Math.min(getMaxPrice(), parseInt(e.target.value) || getMaxPrice())])}
                    placeholder="Max"
                    className="form-control-professional"
                    style={{ fontSize: '0.9rem' }}
                  />
                </div>
                <small style={{ color: '#64748b' }}>${priceRange[0]} - ${priceRange[1]}</small>
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <Form.Label className="form-label-professional mb-2">⭐ Minimum Rating</Form.Label>
                <Form.Select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                  className="form-control-professional"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4★ & Up</option>
                  <option value="3">3★ & Up</option>
                  <option value="2">2★ & Up</option>
                  <option value="1">1★ & Up</option>
                </Form.Select>
              </div>

              {/* Sort */}
              <div className="mb-4">
                <Form.Label className="form-label-professional mb-2">🔄 Sort By</Form.Label>
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
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('name');
                  setPriceRange([0, getMaxPrice()]);
                  setRatingFilter(0);
                }}
                style={{ fontWeight: '600' }}
              >
                🔄 Clear All
              </Button>
            </div>
          </Col>

          {/* Products Section */}
          <Col lg={9}>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-5" style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '16px', padding: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <h4 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>No products found</h4>
                <p className="text-muted mb-3">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('name');
                    setPriceRange([0, getMaxPrice()]);
                    setRatingFilter(0);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <Row className={viewMode === 'grid' ? 'g-4' : 'g-2'}>
                {filteredProducts.map((product) => (
                  <Col key={product.id} {...(viewMode === 'grid' ? { sm: 12, md: 6, lg: 4 } : { sm: 12 })} className="mb-3">
                    <Card className="product-card h-100" style={{ maxHeight: viewMode === 'list' ? '150px' : 'auto' }}>
                      <div className="position-relative" style={{ height: viewMode === 'list' ? '150px' : '200px', overflow: 'hidden' }}>
                        <Card.Img
                          variant="top"
                          src={product.image}
                          alt={product.title}
                          className="product-image"
                          style={{ height: '100%' }}
                        />
                        <Badge
                          bg={getCategoryBadgeColor(product.category)}
                          className="position-absolute top-0 start-0 m-2"
                        >
                          {product.category}
                        </Badge>
                        {product.rating.rate >= 4 && (
                          <Badge bg="warning" className="position-absolute top-0 end-0 m-2">
                            ⭐ Top Rated
                          </Badge>
                        )}
                      </div>

                      {viewMode === 'grid' ? (
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
                              className="btn-professional w-100 mb-2"
                              size="sm"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="success"
                              className="w-100"
                              size="sm"
                              onClick={() => addToCart(product)}
                            >
                              🛒 Add to Cart
                            </Button>
                          </div>
                        </Card.Body>
                      ) : (
                        <Card.Body className="d-flex align-items-center justify-content-between p-2" style={{ width: '100%' }}>
                          <div style={{ flex: 1 }}>
                            <Card.Title className="h6 mb-1">{product.title.substring(0, 40)}...</Card.Title>
                            {renderStars(product.rating.rate)}
                          </div>
                          <div style={{ textAlign: 'right', minWidth: '150px' }}>
                            <div className="product-price">${product.price.toFixed(2)}</div>
                            <Button
                              as={Link}
                              to={`/products/${product.id}`}
                              className="btn-professional btn-sm"
                            >
                              Details
                            </Button>
                          </div>
                        </Card.Body>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>

        {/* Cart Info */}
        {cart.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)',
            zIndex: 100,
            minWidth: '200px',
            textAlign: 'center'
          }}>
            <div style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              🛒 {cart.length} items in cart
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductListing;
