import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";


import '../styles/navbar.css';

function NavbarBootstrap() {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Horror Dudes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarBootstrap