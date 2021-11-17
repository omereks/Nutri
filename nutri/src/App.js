import './App.css';
import React, { useEffect, useState } from 'react';
import Users from './components/Users'
import Search from './components/Search'
import Graph from './components/Graph'

function App() {

  const [UserId, setUserId] = React.useState(0);



  return (
    <div className="App">
      <header className="App-header">
        
        <div className="user">
          <Users chengeUserId={UserId => setUserId(UserId)}/>
        </div>

        <div className="bottom">
          
          <div className="search">
            <Search/>
          </div>

          <div className="graph">
            <Graph/>
          </div>
          
          
        </div>

      </header>
    </div>
  );
}
export default App;
