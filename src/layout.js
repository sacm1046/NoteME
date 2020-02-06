import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './views/login';
import injectContext from './store/appContext';
import Signup from './views/Signup';
import NotFound from './views/Notfound';


const Layout = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={Signup} />    
                <Route exact path="/notfound" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default injectContext(Layout);