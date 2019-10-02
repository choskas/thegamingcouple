import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'
import Edit from './components/Edit'
import Team from './components/Team'

const Router = (user) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/team" component={Team}/>
     
      <Route exact path="/edit" component={Edit}/>
    </Switch>
  </BrowserRouter>
);

export default Router;