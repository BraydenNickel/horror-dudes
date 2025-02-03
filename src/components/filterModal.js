import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'; // Import search icon

function FilterModal({ showModal, setShowModal, handleFilter }) {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [rating, setRating] = useState('');
    const [isUpcoming, setIsUpcoming] = useState(false);

    const handleApplyFilters = () => {
        handleFilter(year, month, rating, isUpcoming);  
        setShowModal(false);  // Close modal after applying filters
    };

    const handleClearFilters = () => {
        setYear('');
        setMonth('');
        setRating('');
        setIsUpcoming(false);
        handleFilter('', '', '', false); // Reset parent filters
        setShowModal(false);
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
                        {/* Year Filter */}
                        <Form.Group controlId="yearFilter">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter year (e.g., 2023)"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>

                        {/* Month Filter */}
                        <Form.Group controlId="monthFilter">
                            <Form.Label>Month</Form.Label>
                            <Form.Control
                                as="select"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                <option value="">Select Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Rating Filter */}
                        <Form.Group controlId="ratingFilter">
                            <Form.Label>Minimum Rating</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter rating (e.g., 7.5)"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                step="0.1"
                                min="0"
                                max="10"
                            />
                        </Form.Group>

                        {/* Upcoming Movies Toggle */}
                        <Form.Group controlId="upcomingFilter">
                            <Form.Check
                                type="checkbox"
                                label="Show Upcoming Movies"
                                checked={isUpcoming}
                                onChange={(e) => setIsUpcoming(e.target.checked)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleClearFilters}>
                        Clear All
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
