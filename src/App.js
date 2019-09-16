import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameComponent from './Game';
import Result from './Result';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-content">
        <div className="app-content__body">
          <Route exact path="/" component={GameComponent} />
          <Route path="/result/:result" component={Result} />
        </div>
      </div>
    </Router>
  );
}

export default App;
