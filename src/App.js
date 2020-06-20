import React, { Suspense } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect, Switch, } from 'react-router-dom'
import NotFound from './components/Notfound';
import LazyLoad from './components/LazyLoad';
// import Admin from './components/Admin';
// import Login from './features/Login';

const Admin = React.lazy(() => import('./components/Admin'));
const Login = React.lazy(() => import('./features/Login'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LazyLoad />}>
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
      </Suspense>
    </div >
  );
}

export default App;
