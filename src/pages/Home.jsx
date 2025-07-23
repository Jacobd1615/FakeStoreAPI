import { Link } from 'react-router-dom';
import { Button, Container, Carousel, Row, Col, Card, Table } from 'react-bootstrap';

// --- Home Component --- //
// This component serves as the landing page for the FakeStore application.
// It features a welcome message, a product carousel, customer reviews, and a price comparison table.
function Home() {
  // --- Styles --- //
  // Inline style for the carousel captions for better readability.
  const captionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '15px',
    borderRadius: '10px',
  };

  // --- Data --- //
  // Static data for customer reviews.
  const reviews = [
    {
      name: 'Alex D.',
      rating: 5,
      feedback: 'Absolutely love the quality of the products! The backpack I bought is stylish and durable. Will definitely shop here again.',
    },
    {
      name: 'Jessica M.',
      rating: 4,
      feedback: 'Great prices and fast shipping. The t-shirt I ordered was super soft and fit perfectly. The color was slightly different than the picture, but still great.',
    },
    {
      name: 'Sam K.',
      rating: 5,
      feedback: 'I am impressed with the customer service and the quality of the jacket. It\'s warm, comfortable, and looks fantastic. Highly recommended!',
    },
  ];

  // --- Helper Functions --- //
  // Renders a 5-star rating based on the provided rating value.
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#ffc107' : '#e4e5e9' }}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  // --- Render Method --- //
  return (
    <>
      {/* Welcome Section */}
      {/* ================================================================= */}
      <Container className="text-center mt-5 fade-in">
        <h1 className="display-3 mb-4">Welcome to FakeStore</h1>
        <p className="lead mb-4">Discover the best fake products at unbeatable prices!</p>
        <Button variant="primary" as={Link} to="/products" size="lg">Shop Now</Button>
      </Container>
      
      {/* Product Carousel Section */}
      {/* ================================================================= */}
      <Container className="mt-5 border-top pt-5">
        <Carousel fade interval={3000}>
          {/* Carousel Item 1 */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt="Durable & Stylish Backpack"
              style={{ height: '500px', objectFit: 'contain' }}
            />
            <Carousel.Caption style={captionStyle}>
              <h3>Durable & Stylish Backpacks</h3>
              <p>Perfect for your daily commute or weekend adventures.</p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Carousel Item 2 */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
              alt="Comfortable & Casual Wear"
              style={{ height: '500px', objectFit: 'contain' }}
            />
            <Carousel.Caption style={captionStyle}>
              <h3>Comfortable & Casual Wear</h3>
              <p>Discover our collection of premium t-shirts, perfect for any occasion.</p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Carousel Item 3 */}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
              alt="Men's Jacket"
              style={{ height: '500px', objectFit: 'contain' }}
            />
            <Carousel.Caption style={captionStyle}>
              <h3>Stay Warm in Style</h3>
              <p>Explore our latest collection of jackets. Built for comfort and durability.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Customer Reviews Section */}
      {/* ================================================================= */}
      <Container className="mt-5 py-5 bg-light">
        <h2 className="text-center mb-5">What Our Customers Say</h2>
        <Row>
          {reviews.map((review, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="h-100 shadow-sm text-center">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3">{renderStars(review.rating)}</div>
                  <Card.Text className="fst-italic">"{review.feedback}"</Card.Text>
                  <Card.Footer className="mt-auto bg-transparent border-0 pt-3">
                    <strong>- {review.name}</strong>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Price Comparison Section */}
      {/* ================================================================= */}
      <Container className="mt-5 py-5">
        <h2 className="text-center mb-5">Why Shop With Us?</h2>
        <Table striped bordered hover responsive className="text-center shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Feature</th>
              <th>FakeStore</th>
              <th>Other E-Stores</th>
              <th>You Save</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>High-Quality Backpack</td>
              <td>$109.95</td>
              <td>$150.00</td>
              <td className="text-success fw-bold">$40.05</td>
            </tr>
            <tr>
              <td>Casual T-Shirt</td>
              <td>$22.30</td>
              <td>$35.00</td>
              <td className="text-success fw-bold">$12.70</td>
            </tr>
            <tr>
              <td>Men's Jacket</td>
              <td>$55.99</td>
              <td>$80.00</td>
              <td className="text-success fw-bold">$24.01</td>
            </tr>
            <tr>
              <td>Fast Shipping</td>
              <td>2-3 Days</td>
              <td>5-7 Days</td>
              <td className="text-success fw-bold">Time & Money</td>
            </tr>
             <tr>
              <td>Customer Support</td>
              <td>24/7 Live Chat</td>
              <td>Email Only</td>
              <td className="text-success fw-bold">Better Service</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Home;