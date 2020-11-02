import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import * as userService from "../../services/userService"; // allows to import all fucntions exncapsulate in userService
import auth from "../../services//authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" }, // data for our form
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //this.props.history.push("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; // error we get from server
        this.setState({ errors });
      }
    }

    // call the server , save the changes and redirect user to another page
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
