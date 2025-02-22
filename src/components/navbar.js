import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import '../styles/navbar.css';
import reaperLogo from "../images/reaper.png";


import '../styles/navbar.css';

function NavbarBootstrap() {

    return (
        <Navbar style={{ backgroundColor: "#732D3A"}} variant="dark" expand="lg" fixed="top">
            <Container>
                <img
                    src={reaperLogo}
                    alt="Horror Dudes Logo"
                    className="navbar-logo"
                />
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