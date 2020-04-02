import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./SignIn.css";
import firebase from "firebase";

class Layout extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="form-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <button className="social">
                  <img src="../../google.svg" alt="logo" />
                </button>
                <button className="social">
                  <img src="./google.svg" alt="" />
                </button>
                <button className="social">
                  <img src="../../google.svg" alt="" />
                </button>
              </div>
              <span>or use your account</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot your password?</a>
              <button>Sign In</button>
            </form>
          </div>

          <div className="content-container">
            <div className="content">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start your journey with us.</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
