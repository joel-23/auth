import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import "./SignIn.css";
// import "./style.css";
// import "./responsive.css";
import firebase from "firebase";
import styles from "./style.module.css";

class SignInGithub extends Component {
  githubAuth = event => {
    // event.preventDefault();
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        this.props.history.push("/profile");
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  render() {
    return (
      <button className={styles.social} onClick={this.githubAuth}>
        <img src={require("../assets/images/github.svg")} />
      </button>
    );
  }
}

export default withRouter(SignInGithub);
