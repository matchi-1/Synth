import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";

function Header({ toggleSidebar }) {
  return (
    <>
      <Navbar key={false} expand={false} className=" mb-3 navbar">
        <Container>
          <Navbar.Brand href="#">
            <img
              className="site-logo"
              src="/assets/img/logo.png"
              alt="logo.png"
            />
            <h1 className="nav-title">SYNTHPAGE TITLE 1</h1>
          </Navbar.Brand>
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
