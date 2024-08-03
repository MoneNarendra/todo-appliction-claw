import { withRouter } from "react-router-dom";

import React, { Component } from "react";
import Cookies from "js-cookie";

import Url from "../Url";

import "./index.css";

class LogInForm extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    showSubmitError: false,
    showPassWord: false,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };

    const url = `${Url}/logIn/`;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
      method: "POST",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken);
      const { history } = this.props;
      history.replace("/");
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangePasswordStatus = () => {
    this.setState((prevState) => ({ showPassWord: !prevState.showPassWord }));
  };

  render() {
    const {
      username,
      password,
      errorMsg,
      showSubmitError,
      showPassWord,
    } = this.state;

    return (
      <div className="login-form">
        <h2>Login</h2>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassWord ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="show-password-contianer">
            <input
              type="checkbox"
              id="showPassword"
              className="checkbox"
              onChange={this.onChangePasswordStatus}
            />
            <label htmlFor="showPassword" className="show-password">
              Show Password
            </label>
          </div>
          <button className="button-login" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-msg">* {errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(LogInForm);
