import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Topbar = () => (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home" className="pl-3">
        {'Car Cognition Dashboard'}
      </Navbar.Brand>
    </Navbar>
  </>  
);

export default Topbar;
