import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainPage from './MainPage'
import KuvertPage from './KuvertPage'

export default function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>
            <Link to="/">KUVERT</Link>
          </h1>
        </header>
        <Switch>
          <Route path="/kuvert/:kuvertId" component={KuvertPage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
}
