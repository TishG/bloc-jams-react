import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import './App.css';

class App extends Component {

  render() {
    return (
      <main>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </div>
      </main>

    );
  }
}

export default App;

//Continue at URL Parameters - Components: Landing
