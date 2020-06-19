import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, ...rest }) => {

    //console.log(rest);
    return (
        <Route  {...rest} render={props =>

            localStorage.getItem("token") ? (<Component {...props} {...rest} />)
                : (<Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />)
        } />
    )
}