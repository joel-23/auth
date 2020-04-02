import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import "./SignIn.css";
// import "./style.css";
// import "./responsive.css";
import firebase from "firebase";
import styles from "./style.module.css";

class SignInFacebook extends Component {
  facebookAuth = event => {
    // event.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
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
        console.log(error);
        // ...
      });
  };

  render() {
    return (
      <button className={styles.social} onClick={this.facebookAuth}>
        <img src={require("../assets/images/facebook.svg")} />
      </button>
    );
  }
}

export default withRouter(SignInFacebook);
