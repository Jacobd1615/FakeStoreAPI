import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

// --- AppNavbar Component --- //
// This component renders the main navigation bar for the application.
// It includes links to the Home page, Products list, and the Add Product page.
function AppNavbar() {
  return (
    <Navbar bg="none" variant="light" expand="lg" className="navbar">
      <Container>
        {/* --- Brand/Logo --- */}
        <Navbar.Brand as={Link} to="/">FakeStore</Navbar.Brand>
        
        {/* --- Responsive Toggle Button --- */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* --- Navigation Links --- */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;