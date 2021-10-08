import React from 'react';
import '../../src/styles.css';
import NavBar from './components/NavBar';

const App = () => {
  
  return (
    <div className="h-screen bg-gradient-to-b from-gray-light to-white p-4">
      <NavBar/>
    </div>
  )
}

export default App;