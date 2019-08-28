import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceName: undefined
    };
  }

  changeDevice = (deviceName) => {
    this.setState(state => ({ deviceName }));
    this.props.onDeviceChange(deviceName);
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
              {this.state.deviceName || 'Choose a device'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onSelect={()=>this.changeDevice('TensorRT_AMD64')}>TensorRT_AMD64</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onSelect={()=>this.changeDevice('Jetson_nano')}>Jetson_nano</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onSelect={()=>this.changeDevice('Something else')}>Something else</Dropdown.Item>
            </Dropdown.Menu>        
          </Dropdown>
        </Navbar>
      </> 
    )
  }
};

export default Topbar;
