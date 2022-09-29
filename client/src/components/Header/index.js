import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home"><a class="navbar-brand" href="/"><img src="../../assets/logo.png" alt="logo" width="128" height="28"/></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggle-icon"></span>
      </button></Navbar.Brand>
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="/dashboard">RV'er Seeking</Nav.Link>
      <Nav.Link href="/dashboard">Seeking an RV'er</Nav.Link>
      <Button variant="outline-secondary">Login</Button>{' '}
      <Button variant="outline-primary">Join</Button>{' '}
      <Button id="logout" varian="btn-no-style">Log Out</Button>{' '}
      </Container>
    </Navbar>
  );
};

export default Header;
