import './App.css';
import React, { useEffect, useState } from 'react';
import Users from './components/Users'
import Search from './components/Search'
import Graph from './components/Graph'
function App() {

  return (
    <div className="App">
      <header className="App-header">
        
        <div className="user">
          <Users/>
        </div>

        <div className="bottom">
          
          <div className="graph">
            <Graph/>
          </div>
          
          <div className="search">
            <Search/>
          </div>
          
        </div>

      </header>
    </div>
  );
}
export default App;
