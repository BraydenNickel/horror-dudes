import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; // Import search icon

function FilterModal({ showModal, setShowModal, handleFilter }) {
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');

    const handleApplyFilters = () => {
        handleFilter(year, rating);  // Pass year and rating to parent for filtering logic
        setShowModal(false);  // Close the modal after applying filters
    };

    return (
        <>
            {/* Floating Search Button */}
            <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    borderRadius: '50%',
                    padding: '15px',
                    fontSize: '20px',
                }}
            >
                <Search color="white" size={36} />
            </Button>

            {/* Filter Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Filter Movies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="yearFilter">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter year (e.g., 2023)"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="ratingFilter">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter rating (e.g., 7.5)"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                step="0.1"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleApplyFilters}>
                        Apply Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FilterModal;
