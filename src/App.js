import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect, Switch, } from 'react-router-dom'
import NotFound from './components/Notfound';
import Admin from './components/Admin';
import Login from './features/Login';
function App() {
  return (
    <div className="App">
      <Router>
        {/*  <ul>
          <li><Link to="/bills">go to bills</Link></li>
          <li><Link to="/users">go to users</Link></li>
          <li><Link to="/products">go to products</Link></li>
        </ul> */}
        <Switch>
          <Redirect exact from="/" to="/admin" />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />

        </Switch>
      </Router>
    </div >
  );
}

export default App;
