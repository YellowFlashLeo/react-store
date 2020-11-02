import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" }, // data for our form
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data.username, this.state.data.password); // if user logged in successfully he get json webtoken
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/"; // we redirect user to home page if any other url was not specified in the pathname
      // and reload the page
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; // error we get from server
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />; // if we already logged and press log in again we are redirected to home
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
