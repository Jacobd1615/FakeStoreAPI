import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Row, Col, Modal, Spinner, InputGroup, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

// --- AddProduct Component --- //
// This component provides a form for adding a new product to the store.
// It includes form validation, a confirmation modal, and success/error messaging.
function AddProduct() {
  // --- Hooks --- //
  // Hook for programmatic navigation.
  const navigate = useNavigate();

  // --- State Management --- //
  // Holds the form data for the new product.
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
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

  // Confirms and processes the product addition.
  const confirmSubmit = () => {
    setIsSubmitting(true);
    axios.post('https://fakestoreapi.com/products', formData)
      .then(() => {
        setSuccessMessage('Product added successfully!');
        setFormData({ title: '', price: '', description: '', category: '' });
        setErrorMessage('');
        setShowModal(false);
        setShowSuccessModal(true);
      })
      .catch(() => {
        setErrorMessage('Failed to add product.');
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
  return (
    <Container className="mt-5 fade-in">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="mb-0">
                <i className="fas fa-plus-circle me-2"></i>
                Add New Product
              </h2>
              <p className="mb-0 opacity-75">Create a new product for your store</p>
            </div>
            <div className="card-body p-4">
              {/* --- User Feedback Alerts --- */}
              {successMessage && (
                <Alert variant="success" className="mb-4">
                  <i className="fas fa-check-circle me-2"></i>
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert variant="danger" className="mb-4">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {errorMessage}
                </Alert>
              )}

              {/* --- Add Product Form --- */}
              <Form onSubmit={handleSubmit} className="form-professional">
                <Row>
                  <Col md={12}>
                    {/* Title Field */}
                    <Form.Group className="mb-4">
                      <Form.Label className="form-label-professional">
                        <i className="fas fa-tag me-2"></i>Product Title
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter an attractive product title"
                        isInvalid={!!validationErrors.title}
                        className="form-control-professional"
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    {/* Price Field */}
                    <Form.Group className="mb-4">
                      <Form.Label className="form-label-professional">
                        <i className="fas fa-dollar-sign me-2"></i>Price
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          isInvalid={!!validationErrors.price}
                          step="0.01"
                          min="0"
                          className="form-control-professional"
                        />
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.price}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Category Field */}
                    <Form.Group className="mb-4">
                      <Form.Label className="form-label-professional">
                        <i className="fas fa-folder me-2"></i>Category
                      </Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.category}
                        className="form-control-professional"
                      >
                        <option value="">Select a category</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="jewelery">Jewelry</option>
                        <option value="electronics">Electronics</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description Field */}
                <Form.Group className="mb-4">
                  <Form.Label className="form-label-professional">
                    <i className="fas fa-align-left me-2"></i>Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of your product..."
                    isInvalid={!!validationErrors.description}
                    className="form-control-professional"
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.description}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    <small>Tip: Include key features, benefits, and specifications</small>
                  </Form.Text>
                </Form.Group>

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-professional"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plus-circle me-2"></i>
                        Add Product to Store
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>

      {/* --- Confirmation Modal --- */}
      <Modal
        show={showModal}
        onHide={() => !isSubmitting && setShowModal(false)}
        backdrop="static"
        size="lg"
        className="modal-content-professional"
      >
        <Modal.Header
          closeButton={!isSubmitting}
          className="modal-header-professional"
        >
          <Modal.Title>
            <i className="fas fa-check-circle me-2"></i>
            Confirm New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-professional">
          {isSubmitting ? (
            <div className="text-center py-4">
              <div className="loading-spinner mb-3"></div>
              <h5>Adding your product to the store...</h5>
              <p className="text-muted">Please wait while we process your request</p>
            </div>
          ) : (
            <div>
              <p className="lead mb-4">
                <strong>Please review the product details before adding to store:</strong>
              </p>
              <div className="bg-light p-4 rounded">
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong className="text-primary">📦 Title:</strong>
                      <div className="mt-1">{formData.title}</div>
                    </div>
                    <div className="mb-3">
                      <strong className="text-success">💰 Price:</strong>
                      <div className="mt-1 h5 text-success">${formData.price}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong className="text-info">🏷️ Category:</strong>
                      <div className="mt-1">
                        <Badge bg="info">{formData.category}</Badge>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="mb-3">
                  <strong className="text-muted">📝 Description:</strong>
                  <div className="mt-1 text-muted">{formData.description}</div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        {!isSubmitting && (
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              <i className="fas fa-times me-2"></i>Cancel
            </Button>
            <Button className="btn-professional" onClick={confirmSubmit}>
              <i className="fas fa-check me-2"></i>Confirm & Add Product
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* --- Success Modal --- */}
      <Modal
        show={showSuccessModal}
        onHide={handleBackToProducts}
        backdrop="static"
        size="md"
        className="modal-content-professional"
      >
        <Modal.Header
          closeButton
          className="modal-header-professional"
        >
          <Modal.Title>
            🎉 Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-professional text-center">
          <div style={{ fontSize: '4rem' }} className="mb-3">✅</div>
          <h4 className="mb-3">Product Added Successfully!</h4>
          <p className="text-muted mb-4">
            Your new product has been added to the store and is now available for customers to view and purchase.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button className="btn-professional" onClick={handleBackToProducts}>
            <i className="fas fa-arrow-left me-2"></i>Back to Products
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

AddProduct.propTypes = {
  onAddProduct: PropTypes.func,
};

export default AddProduct;