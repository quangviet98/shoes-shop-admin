import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import Product from '../features/Product';
import NotFound from './Notfound';
import Customer from '../features/Customer';
import Order from '../features/Order';
import Feedback from '../features/Feedback';

export const tokenContext = React.createContext();

function Admin() {
    const { url } = useRouteMatch();
    //const [token, setToken] = useState("")
    const token = JSON.parse(localStorage.getItem("token"));

    return (
        <div>
            <LeftSideBar />
            <Switch>
                <Redirect exact from={`${url}`} to={`${url}/orders`} />
                <tokenContext.Provider value={{ token }}>
                    <PrivateRoute path={`${url}/orders`} component={Order} />
                    <PrivateRoute path={`${url}/customers`} component={Customer} />
                    <PrivateRoute path={`${url}/products`} component={Product} />
                    <PrivateRoute path={`${url}/feedbacks`} component={Feedback} />
                </tokenContext.Provider>
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default Admin
