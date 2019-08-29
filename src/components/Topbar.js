import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curDevice: undefined,
      deviceNames: ['TensorRT_AMD64', 'Jetson_nano', 'IEI_TANK', 'UP2']
    };
  }

  changeDevice = (curDevice) => {
    this.setState(state => ({ curDevice }));
    this.props.onDeviceChange(curDevice);
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
              {
                this.state.deviceNames.map((name, idx) => 
                <Dropdown.Item key={idx} onSelect={()=>this.changeDevice(name)}>
                  {name}
                </Dropdown.Item>)
              }
            </Dropdown.Menu>        
          </Dropdown>
        </Navbar>
      </> 
    )
  }
};

export default Topbar;
