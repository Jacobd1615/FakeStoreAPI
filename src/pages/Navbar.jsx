import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

// --- AppNavbar Component --- //
// Professional navigation bar with enhanced styling and active state management
function AppNavbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar bg="none" variant="dark" expand="lg" className="navbar-professional sticky-top">
      <Container>
        {/* --- Brand/Logo --- */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-professional">
          🛒 FakeStore
          <Badge bg="warning" text="dark" className="ms-2 small">
            Pro
          </Badge>
        </Navbar.Brand>

        {/* --- Responsive Toggle Button --- */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* --- Navigation Links --- */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-link-professional ${isActive('/') ? 'active' : ''}`}
            >
              🏠 Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className={`nav-link-professional ${isActive('/products') ? 'active' : ''}`}
            >
              📦 Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add-product"
              className={`nav-link-professional ${isActive('/add-product') ? 'active' : ''}`}
            >
              ➕ Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;