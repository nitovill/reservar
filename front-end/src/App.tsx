import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Calendary from "./components/Calendary/Calendary"

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path="/calendary" component={Calendary}/>
    </Switch>
  );
}

export default App;
