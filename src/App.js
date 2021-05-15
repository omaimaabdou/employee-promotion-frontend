import './App.css';
import {useState } from 'react';
import Signin from './components/signin/Signin'
import Register from './components/register/Register'
import Navigation from './components/navigation/Navigation'
import NotFound from './components/pages/NotFound'
import Home from './components/home'
import {Switch,Route} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Navigation/>
      <Switch>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route exact  path="/signin" >
          <Signin />
        </Route>
        <Route exact path="/register" >
          <Register />
        </Route>
        <Route >
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
