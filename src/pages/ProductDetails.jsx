import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner, Alert, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';

// --- ProductDetails Component --- //
// This component displays the detailed information for a single product.
// It fetches the product data based on the ID from the URL and provides options
// to delete or edit the product.
function ProductDetails() {
  // --- Hooks --- //
  // Gets the product ID from the URL parameters.
  const { id } = useParams();
  // Hook for programmatic navigation.
  const navigate = useNavigate();

  // --- State Management --- //
  // Holds the product data.
  const [product, setProduct] = useState(null);
  // Tracks the loading state while fetching product data.
  const [loading, setLoading] = useState(true);
  // Stores error messages for user feedback.
  const [errorMessage, setErrorMessage] = useState('');
  // Controls the visibility of the delete confirmation modal.
  const [showModal, setShowModal] = useState(false);
  // Controls the visibility of the success modal.
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Tracks the deletion status to prevent multiple actions.
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Data Fetching --- //
  // Fetches the product details when the component mounts.
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage('Failed to fetch product details.');
        setLoading(false);
      });
  }, [id]);

  // --- Event Handlers --- //
  // Shows the delete confirmation modal.
  const handleDelete = () => {
    setShowModal(true);
  };

  // Confirms and processes the product deletion.
  const confirmDelete = () => {
    setIsDeleting(true);
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setShowModal(false);
        setShowSuccessModal(true);
      })
      .catch(() => {
        setErrorMessage('Failed to delete product.');
        setShowModal(false);
      })
      .finally(() => setIsDeleting(false));
  };

  // Handles navigation back to product listing after successful deletion
  const handleBackToProducts = () => {
    setShowSuccessModal(false);
    navigate('/products');
  };

  // Navigates to the edit page for the current product.
  const handleEdit = () => {
    navigate(`/edit-product/${id}`);
  };

  // --- Render Method --- //
  // Displays a spinner while the product data is loading.
  if (loading) {
    return (
      <Container className="text-center mt-5">
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
      <Row className="justify-content-center">
        <Col md={8}>
          {/* --- Product Card --- */}
          {/* ================================================================= */}
          <Card className="product-card">
            <Card.Img variant="top" src={product.image} alt={product.title} />
            <Card.Body>
              <Card.Title className="card-title">{product.title}</Card.Title>
              <Card.Text className="card-text">{product.description}</Card.Text>
              <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
              <Card.Text><strong>Price:</strong> ${product.price.toFixed(2)}</Card.Text>
              {/* Action Buttons */}
              <Button variant="success" className="me-2">Add to cart</Button>
              <Button variant="danger" onClick={handleDelete}>Delete Product</Button>
              <Button variant="light" onClick={handleEdit} className="ms-2">Edit Product</Button>
            </Card.Body>
          </Card>

          {/* --- Delete Confirmation Modal --- */}
          {/* ================================================================= */}
          <Modal show={showModal} onHide={() => !isDeleting && setShowModal(false)} backdrop="static">
            <Modal.Header closeButton={!isDeleting}>
              <Modal.Title>Confirm Product Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {isDeleting ? (
                <div className="text-center">
                  <Spinner animation="border" variant="light" />
                  <p className="mt-3">Deleting product...</p>
                </div>
              ) : (
                <>
                  <p><strong>You are about to delete the following product:</strong></p>
                  <p><strong>Title:</strong> {product.title}</p>
                  <p>Please confirm to proceed with deletion.</p>
                </>
              )}
            </Modal.Body>
            {!isDeleting && (
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)} disabled={isDeleting}>Cancel</Button>
                <Button variant="danger" onClick={confirmDelete} disabled={isDeleting}>Delete</Button>
              </Modal.Footer>
            )}
          </Modal>

          {/* --- Success Modal --- */}
          {/* ================================================================= */}
          <Modal show={showSuccessModal} onHide={handleBackToProducts} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>✅ Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <h5>Product Deleted Successfully!</h5>
                <p>The product has been removed from the store.</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleBackToProducts}>
                Back to Products
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;