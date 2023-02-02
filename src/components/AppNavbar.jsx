import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas, } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PurchasesSidebar from './PurchasesSidebar';

const AppNavbar = () => {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="lg" variant="dark" bg="primary" size="lg" >
                <Container>
                    <Navbar.Brand style={{fontSize: "2rem"}} as={Link} to="/">E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow} >Cart</Nav.Link>
                            <Nav.Link onClick={logOut}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <PurchasesSidebar show={show} handleClose={handleClose}  />
        </>
    );
};

export default AppNavbar;