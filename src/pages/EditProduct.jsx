import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Modal, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

// --- EditProduct Component --- //
// This component provides a form to edit an existing product.
// It fetches the product data, pre-fills the form, validates the input,
// and submits the changes with a confirmation modal.
function EditProduct() {
  // --- Hooks --- //
  // Gets the product ID from the URL parameters.
  const { id } = useParams();
  // Hook for programmatic navigation.
  const navigate = useNavigate();

  // --- State Management --- //
  // Holds the form data for the product being edited.
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  // Tracks the loading state while fetching product data.
  const [loading, setLoading] = useState(true);
  // Stores success messages for user feedback.
  const [successMessage, setSuccessMessage] = useState('');
  // Stores error messages for user feedback.
  const [errorMessage, setErrorMessage] = useState('');
  // Stores validation errors for form fields.
  const [validationErrors, setValidationErrors] = useState({});
  // Controls the visibility of the confirmation modal.
  const [showModal, setShowModal] = useState(false);
  // Controls the visibility of the success modal.
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Tracks the submission status to prevent multiple submissions.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Data Fetching --- //
  // Fetches the product details when the component mounts.
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
        });
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage('Failed to fetch product details.');
        setLoading(false);
      });
  }, [id]);

  // --- Event Handlers --- //
  // Updates form data state on input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  // --- Form Validation --- //
  // Validates the form fields and sets any validation errors.
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.price) errors.price = 'Price is required';
    else if (formData.price <= 0) errors.price = 'Price must be a positive number';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category.trim()) errors.category = 'Category is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Submission Handling --- //
  // Handles the form submission, triggering validation and showing the confirmation modal.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  // Confirms and processes the product update.
  const confirmSubmit = () => {
    setIsSubmitting(true);
    axios.put(`https://fakestoreapi.com/products/${id}`, formData)
      .then(() => {
        setSuccessMessage('Product updated successfully!');
        setErrorMessage('');
        setShowModal(false);
        setShowSuccessModal(true);
      })
      .catch(() => {
        setErrorMessage('Failed to update product.');
        setShowModal(false);
      })
      .finally(() => setIsSubmitting(false));
  };

  // Handles navigation back to product listing after success
  const handleBackToProducts = () => {
    setShowSuccessModal(false);
    navigate('/products');
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

  return (
    <Container className="mt-5 fade-in">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Edit Product</h2>

          {/* --- User Feedback Alerts --- */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          {/* --- Edit Product Form --- */}
          {/* ================================================================= */}
          <div className="form-container">
            <Form onSubmit={handleSubmit}>
              {/* Title Field */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter product title"
                  isInvalid={!!validationErrors.title}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.title}</Form.Control.Feedback>
              </Form.Group>

              {/* Price Field */}
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  isInvalid={!!validationErrors.price}
                  step="0.01"
                />
                <Form.Control.Feedback type="invalid">{validationErrors.price}</Form.Control.Feedback>
              </Form.Group>

              {/* Description Field */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows={4}
                  isInvalid={!!validationErrors.description}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.description}</Form.Control.Feedback>
              </Form.Group>

              {/* Category Field */}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter product category"
                  isInvalid={!!validationErrors.category}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.category}</Form.Control.Feedback>
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Update Product
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {/* --- Confirmation Modal --- */}
      {/* ================================================================= */}
      <Modal show={showModal} onHide={() => !isSubmitting && setShowModal(false)} backdrop="static">
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Confirm Product Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSubmitting ? (
            <div className="text-center">
              <Spinner animation="border" variant="light" />
              <p className="mt-3">Updating product...</p>
            </div>
          ) : (
            <>
              <p><strong>Please confirm the new details before updating:</strong></p>
              <ul>
                <li><strong>Title:</strong> {formData.title}</li>
                <li><strong>Price:</strong> ${formData.price}</li>
                <li><strong>Description:</strong> {formData.description}</li>
                <li><strong>Category:</strong> {formData.category}</li>
              </ul>
            </>
          )}
        </Modal.Body>
        {!isSubmitting && (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={confirmSubmit}>Confirm Update</Button>
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
            <h5>Product Updated Successfully!</h5>
            <p>Your product changes have been saved.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleBackToProducts}>
            Back to Products
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

EditProduct.propTypes = {
  onUpdateProduct: PropTypes.func,
};

export default EditProduct;