import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './views/Login'
import injectContext from './store/appContext'
import Signup from './views/Signup'
import NotFound from './views/Notfound'
import Note from './views/Note'
import Agenda from './views/Agenda'
import Admin from './views/Admin'
import Welcome from './views/Welcome'


const Layout = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/registro" component={Signup} />
                <Route exact path="/note" component={Note} />
                <Route exact path="/agenda" component={Agenda} /> 
                <Route exact path="/admin" component={Admin} />  
                <Route exact path="/welcome" component={Welcome} />   
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default injectContext(Layout);