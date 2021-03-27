import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Movies from './components/movies';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NavBar from './components/navBar';
import './App.css';

class App extends Component {
  state = {}
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/register" component={RegisterForm} />
            <Redirect from="/" exact to="/movies"></Redirect>    {/*redirect every component to movies because / is present in all components address*/}
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
