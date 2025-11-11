import { Link } from 'react-router-dom';
import { Button, Container, Carousel, Row, Col, Card, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// --- Home Component --- //
// Ultra-professional landing page with stunning features and animations
function Home() {
  const [stats, setStats] = useState({ totalProducts: 0, categories: 0, happyCustomers: 1250 });
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  // --- Data Fetching --- //
  useEffect(() => {
    // Fetch featured products
    fetch('https://fakestoreapi.com/products?limit=4')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data))
      .catch(err => console.error('Error fetching featured products:', err));

    // Fetch real stats
    Promise.all([
      fetch('https://fakestoreapi.com/products').then(r => r.json()),
      fetch('https://fakestoreapi.com/products/categories').then(r => r.json())
    ])
      .then(([products, categories]) => {
        setStats({
          totalProducts: products.length,
          categories: categories.length,
          happyCustomers: 5432
        });
      })
      .catch(err => console.error('Error fetching stats:', err));

    // Scroll effect
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Premium Features --- //
  const features = [
    {
      icon: '🛡️',
      title: 'Secure Transactions',
      description: 'Military-grade encryption protects your data and payments'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant checkout and delivery tracking'
    },
    {
      icon: '🌍',
      title: 'Global Shipping',
      description: 'Worldwide delivery to 195+ countries with real-time tracking'
    },
    {
      icon: '💎',
      title: 'Quality Guaranteed',
      description: 'Premium products with authentic certificates and warranties'
    },
    {
      icon: '🎁',
      title: 'Exclusive Deals',
      description: 'Member-only offers and seasonal promotions year-round'
    },
    {
      icon: '🤝',
      title: 'Expert Support',
      description: '24/7 multilingual customer service and technical support'
    }
  ];

  // --- Premium Testimonials --- //
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Premium Member',
      rating: 5,
      feedback: 'Absolutely incredible! The products exceeded all my expectations. Premium quality at amazing prices. Highly recommend!',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      rating: 5,
      feedback: 'Been a loyal customer for 3+ years. Consistent excellence in every aspect. Their customer service is unmatched!',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Wilson',
      role: 'Fashion Designer',
      rating: 5,
      feedback: 'The variety, quality, and prices are unbeatable. Found my favorite products here. Love the seamless experience!',
      avatar: '👩‍🎨'
    },
    {
      name: 'David Rodriguez',
      role: 'Tech Enthusiast',
      rating: 5,
      feedback: 'Exceptional electronics selection with verified authenticity. Fast delivery and excellent warranty support!',
      avatar: '�‍🔬'
    }
  ];

  // --- Helper Functions --- //
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#fbbf24' : '#e5e7eb', fontSize: '1.3rem' }}>
        ★
      </span>
    ));
  };

  // --- Render Method --- //
  return (
    <div className="fade-in">
      {/* Mega Hero Section */}
      <div className="page-header" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <Container>
          <h1 className="page-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            ✨ Welcome to FakeStore
          </h1>
          <p className="page-subtitle" style={{ fontSize: '1.4rem', marginBottom: '2rem', opacity: 0.95 }}>
            Premium Quality. Unbeatable Prices. Exceptional Service.
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Discover thousands of products from top sellers worldwide
          </p>
          <div className="mt-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              as={Link}
              to="/products"
              className="btn-primary"
              size="lg"
              style={{ padding: '0.95rem 2.5rem', fontSize: '1.1rem' }}
            >
              🛍️ Shop Now
            </Button>
            <Button
              as={Link}
              to="/add-product"
              className="btn-success"
              size="lg"
              style={{ padding: '0.95rem 2.5rem', fontSize: '1.1rem' }}
            >
              ✨ Sell Products
            </Button>
          </div>
        </Container>
      </div>

      {/* Enhanced Stats Section */}
      <Container className="mb-5" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <Row className="g-4">
          {[
            { label: 'Products Available', value: stats.totalProducts, icon: '📦', color: '#3b82f6' },
            { label: 'Categories', value: stats.categories, icon: '📂', color: '#10b981' },
            { label: 'Happy Customers', value: stats.happyCustomers + '+', icon: '😊', color: '#f59e0b' }
          ].map((stat, idx) => (
            <Col md={4} key={idx}>
              <div className="stats-card" style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.1)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(59, 130, 246, 0.1)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#64748b' }}>
                  {stat.label}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enhanced Features Section */}
      <Container className="mb-5" style={{ marginTop: '3rem' }}>
        <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b' }}>
          Why Choose FakeStore?
        </h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="h-100" style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                border: '2px solid rgba(59, 130, 246, 0.1)',
                borderRadius: '16px',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.1)';
              }}>
                <Card.Body className="p-4 text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {feature.icon}
                  </div>
                  <Card.Title className="h5" style={{ fontWeight: '800', marginBottom: '0.75rem', color: '#1e293b' }}>
                    {feature.title}
                  </Card.Title>
                  <Card.Text style={{ color: '#64748b', lineHeight: '1.6' }}>
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enhanced Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '3rem 0' }} className="mb-5">
          <Container>
            <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b' }}>
              🌟 Featured Collection
            </h2>
            <Row className="g-4">
              {featuredProducts.map((product, idx) => (
                <Col md={6} lg={3} key={idx}>
                  <Card style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                    border: '2px solid rgba(59, 130, 246, 0.1)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    height: '100%'
                  }}>
                    <div style={{
                      height: '200px',
                      background: 'linear-gradient(135deg, #f1f5f9, #e0e7ff)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          maxHeight: '180px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                    <Card.Body className="p-3">
                      <Card.Title className="h6" style={{ fontWeight: '700' }}>
                        {product.title.substring(0, 40)}...
                      </Card.Title>
                      <Badge bg="info" className="mb-2">{product.category}</Badge>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, #3b82f6, #0ea5e9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        ${product.price.toFixed(2)}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}

      {/* Enhanced Testimonials Section */}
      <Container className="mb-5">
        <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b' }}>
          💬 Customer Love
        </h2>
        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col md={6} lg={3} key={index}>
              <Card style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
                border: '2px solid rgba(59, 130, 246, 0.1)',
                borderRadius: '16px',
                height: '100%',
                transition: 'all 0.4s ease'
              }}>
                <Card.Body className="p-4 text-center d-flex flex-column">
                  <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                    {testimonial.avatar}
                  </div>
                  <div className="mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <Card.Text style={{
                    fontStyle: 'italic',
                    color: '#475569',
                    marginBottom: '1rem',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    "{testimonial.feedback}"
                  </Card.Text>
                  <div style={{ marginTop: 'auto' }}>
                    <Card.Title className="h6 mb-1" style={{ fontWeight: '700', color: '#1e293b' }}>
                      {testimonial.name}
                    </Card.Title>
                    <small style={{ color: '#64748b' }}>{testimonial.role}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Premium CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #0ea5e9 100%)',
        borderRadius: '20px',
        padding: '3rem 2rem',
        marginBottom: '3rem'
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '1rem'
              }}>
                🚀 Ready to Transform Your Shopping?
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '2rem',
                lineHeight: '1.8'
              }}>
                Join over 5,000+ satisfied customers and discover a world of premium products at unbeatable prices. Experience shopping like never before.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  as={Link}
                  to="/products"
                  className="btn-light"
                  size="lg"
                  style={{ padding: '0.85rem 2rem', fontWeight: '700' }}
                >
                  Browse Products
                </Button>
                <Button
                  as={Link}
                  to="/add-product"
                  className="btn-outline-light"
                  size="lg"
                  style={{ padding: '0.85rem 2rem', fontWeight: '700' }}
                >
                  Become a Seller
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;