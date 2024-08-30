import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";

function Header({ toggleSidebar }) {
  return (
    <>
      <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
        <Container>
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            onClick={toggleSidebar}
          />
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
