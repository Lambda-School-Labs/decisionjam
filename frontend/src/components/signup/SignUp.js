import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

const ROOT_URL = "http://localhost:8000";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      redirect: false,
      loginError: "",
      selectedOption: "",
      url: ""
    };
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(`${ROOT_URL}/api/users/adduser`, newUser)
      .then(res => {
        // console.log("res", res);
        this.setState({ redirect: true });
      })
      .catch(error => {
        // console.log("error", error);
        this.setState({ loginError: error.response.data.error });
      });
  };

  render() {
    // console.log("this.state:", this.state);
    // console.log("this.props:", this.props);

    // redirect to signin page after sign up is successful
    if (this.state.redirect) {
      console.log("href", window.location.href);
      let newhref = window.location.href;
      let newRedirect = newhref.split("?redirect=")[1];
      console.log("newRedirect", newRedirect);
      return <Redirect to={`/signin/?redirect=${newRedirect}`} />;
    }

    return (
      <div>
        <form className="signup-form" onSubmit={this.handleFormSubmit}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </label>
          <label>
            Password
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <div className="login-error">{this.state.loginError}</div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
