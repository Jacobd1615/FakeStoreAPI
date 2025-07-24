import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './pages/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProductListing from './pages/ProductListing.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AddProduct from './pages/AddProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </main>
      <footer className="footer">
        <Container>
          <div className="text-center">
            <p className="mb-2">
              © 2025 FakeStore - Professional E-Commerce Solution
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="https://fakestoreapi.com" target="_blank" rel="noopener noreferrer">
                🔗 API Documentation
              </a>
              <span className="text-muted">|</span>
              <a href="https://github.com/Jacobd1615" target="_blank" rel="noopener noreferrer">
                👨‍💻 Developer Profile
              </a>
              <span className="text-muted">|</span>
              <span className="text-muted">
                Built with ⚛️ React & 🅱️ Bootstrap
              </span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;