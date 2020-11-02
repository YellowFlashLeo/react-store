import React, { Component } from "react";
import auth from "../../services/authService";

class Logout extends Component {
  // so basically once we delete token (jwt) which was created when user registred we logout
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
