import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import Url from "../Url";

import "./index.css";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      gender: "",
      errorMsg: "",
      showSubmitError: false,
      showPassWord: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSuccess = async (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    alert("User Created Successfully");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  signInUser = async () => {
    const { name, username, password, gender } = this.state;

    const userDetails = { name, username, password, gender };

    const url = `${Url}/signIn/`;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userDetails),
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, username, password, gender } = this.state;
    if (name === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "name required",
      });
    } else if (username === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "username required",
      });
    } else if (password === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "password required",
      });
    } else if (gender === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "gender required",
      });
    } else {
      this.signInUser();
    }
  };

  onChangePasswordStatus = () => {
    this.setState((prevState) => ({ showPassWord: !prevState.showPassWord }));
  };

  render() {
    const {
      name,
      username,
      password,
      gender,
      errorMsg,
      showSubmitError,
      showPassWord,
    } = this.state;

    return (
      <div className="registration-form">
        <h2>Registration Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
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
          <div>
            <div className="show-password-sigin">
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
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={this.handleInputChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button className="button-signin" type="submit">
            Register
          </button>
          {showSubmitError && <p className="error-msg">* {errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(SignInForm);
