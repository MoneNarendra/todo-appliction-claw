import { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Url from "../Url";

import "./index.css";

class Header extends Component {
  state = { userDetails: "", profile: "" };

  componentDidMount() {
    this.getUserDetails();
  }

  onClickLogout = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/authorize");
  };

  onDeleteUser = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${Url}/todo/deleteUser/`;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "DELETE",
    };
    await fetch(url, options);
    this.onClickLogout();
    alert("User Deleted Successfully");
  };

  getUserDetails = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${Url}/todo/userDetails/`;
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(url, options);
    const data = await response.json();
    const profile = data.username[0];

    this.setState({ userDetails: data, profile: profile });
  };

  render() {
    const { userDetails, profile } = this.state;

    return (
      <div className="header-container">
        <div className="header-inner-container">
          <div className="profile-container">
            <Popup
              trigger={
                <button className="profile-name" type="button">
                  {profile}
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="user-details-container">
                  <div className="close-btn-container">
                    <button className="close close-btn" onClick={close}>
                      &times;
                    </button>
                  </div>
                  <div className="user-details">
                    <h1 className="profile-name-text">
                      Name: {userDetails.name}
                    </h1>
                    <h1 className="profile-name-text">
                      UserName: {userDetails.username}
                    </h1>
                    <h1 className="profile-name-text">
                      Gender: {userDetails.gender}
                    </h1>
                    <button
                      type="button"
                      className="button-ele delete-btn"
                      onClick={this.onDeleteUser}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
          <div className="todo-log-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7692/7692809.png"
              alt="logo"
              className="logo-img"
            />
            <h1 className="todo-heading">Todo</h1>
          </div>
          <button
            type="button"
            className="button-ele"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
