import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
      <main>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </BrowserRouter>
      </main>
      </div>
    );
  }
}

export default App;

//Continue at URL Parameters - Components: Landing
