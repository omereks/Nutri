import './App.css';
import React, { useEffect, useState } from 'react';
import Users from './components/users'
import Search from './components/search'
import Graph from './components/Graph'
import SearchBox from './components/SearchBox';
import {Button} from "reactstrap";

function App() {

  const [UserId, setUserId] = React.useState(0);
  const [ListFood, setListFood] = React.useState([]);



  return (
    <div className="App">
      <header className="App-header">
        <h1>Wellcome to Nutri</h1>
        <h4>please insert your ID to start</h4>
        <div className="user">
          <Users chengeUserId={UserId => setUserId(UserId)}/>
        </div>
          <div className="search">
            <Search/>
           <div className="App-Component"> <SearchBox userId={UserId} chengeListFood={ListFood => setListFood(ListFood)} /></div>
          </div>
          <div className="graph">
            <Graph userId={UserId} ListFood={ListFood} /> 
          </div>
      </header>
    </div>
  );
}
export default App;
