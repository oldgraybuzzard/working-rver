import React from 'react';
import logo from '../../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/navbar';

function Footer() {
  function fullYear() {
    const yearFormat = new Date();
    return yearFormat.getFullYear();
  }

  return (
    <Container>
       <Navbar bg="light" fluid="lg">
            <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark">
            <img src="../../assets/logo.png" alt="logo" width="128" height="28"/></a>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
            <Nav.Link href="*">Advertise</Nav.Link>
            <Nav.Link href="/terms">Terms of Service</Nav.Link>
            <Nav.Link href="/privacy">Privacy Statement</Nav.Link>
            <Container>
              <p class="col-md-4 mb-0 text-muted">&copy; <span>{fullYear()} Technical Services & Support, LLC</span></p>              
            </Container>

      </Navbar>
    </Container>
  );
};

export default Footer;
