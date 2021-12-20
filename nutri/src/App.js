import './App.css';
import React, { useEffect, useState } from 'react';
import Users from './components/users'
import Search from './components/search'
import Graph from './components/Graph'
import SearchBox from './components/SearchBox';

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
           <div className="App-Component"> <SearchBox userId={UserId}/></div>
          </div>

          <div className="graph">
            <Graph userId={UserId}/>
          </div>
          
          
        </div>

      </header>
    </div>
  );
}
export default App;
