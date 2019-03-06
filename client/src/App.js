import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


import NotFound from './NotFound';
import Header from './Header/Header'
import Register from './Register/Register'
import Login from './Login/Login'
import Home from './Home/Home'
import Create from './Create/Create'
import AllCars from './AllCars/AllCars'
import MyRents from './MyRents/MyRents'

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        isLoggedIn: false,
        username: '',
        token: '',
        isAdmin: false,
      },
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login(user) {
    fetch('http://localhost:9999/auth/signin', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        if (!data.token || !data.username || !data.userId) {
          toast.error(data.message);
          return;
        }
        
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', data.isAdmin);

        this.setState({
          user: {
            isLoggedIn: true,
            username: data.username,
            token: data.token,
            isAdmin: data.isAdmin,
          },
        });
        toast.success(data.message);
      })
      .catch(toast.error);
  }
  logout(event) {
    event.preventDefault();

    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    this.setState({
      user: {
        isLoggedIn: false,
        username: '',
        token: '',
        isAdmin: false,
      },
    });

  }
  componentWillMount() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    let isAdmin = localStorage.getItem('isAdmin');
    isAdmin = JSON.parse(isAdmin)
    
    if (localStorage.getItem('token')) {
      this.setState({
        user: {
          isLoggedIn: true,
          username: username,
          token: token,
          isAdmin: isAdmin,
        },
      });
    }
    
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Header logout={this.logout} user={this.state.user} />
            <ToastContainer closeButton={false} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cars" render={() => <AllCars user={this.state.user}/>} />
              <Route exact path="/login" render={() => <Login login={this.login} user={this.state.user} />} />
              <Route exact path="/register" render={() => <Register login={this.login} user={this.state.user} />} />
              <Route exact path="/cars/myrents" render={() => <MyRents user={this.state.user} />} />
              <Route exact path="/car/create" render={() => <Create user={this.state.user} />} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
