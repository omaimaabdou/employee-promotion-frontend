import './App.css';
import {useState } from 'react';
import Signin from './components/signin/Signin'
import Register from './components/register/Register'
import Navigation from './components/navigation/Navigation'
import Home from './components/home'
import {Switch,Route} from "react-router-dom";

function App() {
  const [isSignin, setIsSignin] = useState(false)
  const onRouteChange = ()=> setIsSignin(!isSignin)

  return (
    <div className="App">
      <Navigation isSignin={isSignin} onRouteChange={onRouteChange} />
      <Switch>
        <Route exact  path="/" >
          <Signin onRouteChange={onRouteChange} />
        </Route>
        <Route exact path="/register" >
          <Register onRouteChange={onRouteChange} />
        </Route>
        <Route exact path='/home' >
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
