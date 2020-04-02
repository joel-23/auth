import React, { Component } from "react";
// import { Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
// import "./SignIn.css";
// import "./style.css";
// import "./responsive.css";
import styles from "./style.module.css";

import SignInGoogle from "./SignInGoogle";
import SignInFacebook from "./SignInFacebook";
import SignInGithub from "./SignInGithub";

import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  NavLink
  // Redirect
} from "react-router-dom";

class SignUpEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => {
        console.log("hello");
        console.log(result.user);
        this.props.history.push("/profile");
      })
      .catch(error => {
        this.setState({ error: error.code });
        console.log(this.state.error);
      });
  };
  showError = err => {
    if (err === "auth/email-already-in-use") {
      return (
        <p className={styles.error}>Account with this email already exists</p>
      );
    } else if (err === "auth/invalid-email") {
      return <p className={styles.error}>Invalid email address</p>;
    } else {
      return <p></p>;
    }
  };
  // showError = () => {
  //   if (this.state.error != "") {
  //     var temp = this.state.error
  //       .split("/")[1]
  //       .split("-")
  //       .join(" ");
  //     this.setState({ error: temp });
  //     return <p className="text-danger">{this.state.error}</p>;
  //   }
  // };
  render() {
    return (
      <div>
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.contentContainer}>
              <div className={styles.contentAlt}>
                <h2>Welcome Back!</h2>
                <p>To stay connected with us please login with your account.</p>
                <button className={styles.ghost} id="signUp">
                  <NavLink to="/signin"> Sign In</NavLink>
                </button>
              </div>
            </div>
            <div className={styles.formContainer}>
              <h1>Sign up</h1>
              <div className={styles.socialContainer}>
                <SignInGoogle />
                <SignInFacebook />
                <SignInGithub />
              </div>
              <form onSubmit={this.handleSubmit}>
                <span>or use your email for registration</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleInputChange}
                />
                {this.showError(this.state.error)}
                {/* <p className="error">{this.state.error}</p> */}
                {/* <a href="#">Forgot your password?</a> */}
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpEmail);
