import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curDevice: undefined
    };
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home" className="pl-3">
            {'Car Cognition Dashboard'}
          </Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {this.state.curDevice || 'Choose a device'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">TensorRT_AMD64</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Jetson Nano</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>        
          </Dropdown>
        </Navbar>
      </> 
    )
  }
};

export default Topbar;
