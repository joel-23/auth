import React, { Component } from "react";
// import { Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
// import "./SignIn.css";
// import "./style.module.css";
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

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

class SignInEmail extends Component {
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
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
    if (err === "auth/invalid-email" || err === "auth/wrong-password") {
      return <p className={styles.error}>Invalid username/password</p>;
    } else if (err === "auth/user-not-found") {
      return <p className={styles.error}>User does not exist</p>;
    } else {
      return <p></p>;
    }
  };
  render() {
    return (
      <div>
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <h1>Sign in</h1>
              <div className={styles.socialContainer}>
                <SignInGoogle />
                <SignInFacebook />
                <SignInGithub />
              </div>
              <form onSubmit={this.handleSubmit}>
                <span>or use your account</span>
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
                <button type="submit">Sign In</button>
              </form>
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.content}>
                <h2>Hello, Friend!</h2>
                <p>
                  Enter your personal details and start your journey with us.
                </p>
                <button className={styles.ghost} id="signUp">
                  <NavLink to="/signup"> Sign Up</NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInEmail);
