import React, { Component } from 'react';
import './App.css';

import FavoriteSites from './components/FavoriteSites';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FavoriteSites email="testemail@test.com"/>
      </div>
    );
  }
}

export default App;
