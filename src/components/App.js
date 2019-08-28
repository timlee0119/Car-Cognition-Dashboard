import React from 'react';
import '../styles/App.css';
import Topbar from './Topbar';
import Dashboard from './Dashboard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceName: ''
    };
  }

  onDeviceChange = (deviceName) => {
    this.setState(state => ({ deviceName }));
  }

  render() {

    return (
      <div className="App">
        <Topbar onDeviceChange={this.onDeviceChange} />
        <Dashboard />
      </div>
    );
  }
};
