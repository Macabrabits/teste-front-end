import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Search from './pages/Search'
import Details from './pages/Details'

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Search}/>
            <Route path="/details/:videoId" exact component={Details}/>
        </Switch>
        </BrowserRouter>
    )
}

