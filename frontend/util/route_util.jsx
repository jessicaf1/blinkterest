
import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    
    return {
        loggedIn: Boolean(state.session.currentUser),
        id: state.session.currentUser 
    }
}


const Auth = ({component: Component, path, loggedIn, exact, id}) => (
    <Route path={path} exact={exact} render={(props)=>(
        !loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to={`/users/${id}`} />
        )
    )} />
);

const Protected = ({ path, loggedIn, component: Component}) => (
    <Route path={path} render={(props)=>(
        loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )
    )} />
);


export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));