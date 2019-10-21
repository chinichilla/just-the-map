import React from 'react';
import { Router, Route } from 'react-router-dom';
import SingleMapPage from './SingleMapPage';
import { createBrowserHistory as createHistory } from 'history';
import './App.css';

const history = createHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={SingleMapPage} />
      </Router>
    </div>
  );
}
export default App;
