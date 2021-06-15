// This component is needed in order not to simply allow unauthorized persons (not logged in) accessing /home page just by typing "localhost: 3000/"
import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom"
import AuthContext from "../../context/auth/authContext"

// ..rest (meaning "remaining") collects all the remaining properties and spreads them in the assigned variable named "rest"
function PrivateRoute({component: Component, ...rest}) {
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;
    return (
       <Route {...rest} render={props => !isAuthenticated && !loading ? (
           <Redirect to="/login"/>
       ) : (
        //    Whatever extra props present in the component
           <Component {...props}/>
       )}/>
    )
}

export default PrivateRoute
