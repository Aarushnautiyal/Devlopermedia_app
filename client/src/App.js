import './App.css';
import {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = ()=> {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path = '/' component = {Landing}/>
        <section className = "container">
          <Switch>
          <Route exact path = '/Login' component = {Login}/>
          <Route exact path = '/Register' component = {Register}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
      
}

export default App;
