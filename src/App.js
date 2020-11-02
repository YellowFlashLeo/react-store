import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import Cart from "./components/Cart/Cart";
import Model from "./components/Model";
import LoginForm from "./components/Authentication/loginForm";
import RegisterForm from "./components/Authentication/registerForm";
import Logout from "./components/Authentication/logOut";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser(); // we decode json web token
    this.setState({ user }); // this we cause app Component to be rerendered and we can pass the current user to Navbar
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <Switch>
          <Route exact path="/" component={ProductList}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/details" component={Details}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Model />
      </React.Fragment>
    );
  }
}

export default App;
