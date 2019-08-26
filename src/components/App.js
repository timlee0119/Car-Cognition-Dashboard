import React from 'react';
import '../styles/App.css';
import Topbar from './Topbar';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Dashboard />
    </div>
  );
}

export default App;
