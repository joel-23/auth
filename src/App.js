import React, { Component } from "react";
import {
  BrowserRouter as Router
  // Router
  // Switch,
  // Route,
  // Link,
  // Redirect
} from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./loader.module.css";

// import SignIn from "./signIn/SignIn";
// import SignInGoogle from "./signIn/SignInGoogle";
// import SignInFacebook from "./signIn/SignInFacebook";
// import SignInGithub from "./signIn/SignInGithub";
// import SignUpEmail from "./signIn/SignUpEmail";
// import SignInEmail from "./signIn/SignInEmail";
// import Profile from "./signIn/Profile";
import Routes from "./signIn/Routes";

import firebase from "firebase";

// const ProtectedRoute = ({ auth, ...props }) =>
//   auth ? <Route {...props} /> : <Redirect to="/signin" />;

class App extends Component {
  constructor() {
    super();
    this.state = { user: null, auth: false, load: true };
    console.log("in app");
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user, auth: true, load: false }, () => {
          console.log("user", this.state.user);
        });
        // User is signed in.
      } else {
        this.setState({ auth: false, load: false });
        // No user is signed in.
      }
    });
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ user: user }, () => {
  //         console.log("user", this.state.user);
  //       });
  //       // User is signed in.
  //     } else {
  //       // No user is signed in.
  //     }
  //   });
  // }
  render() {
    if (!this.state.load) {
      return (
        // <Router>
        <Routes user={this.state.user} auth={this.state.auth} />
        // </Router>
      );
    } else {
      return (
        <div className={styles.center}>
          <ClipLoader
            // css={override}
            size={150}
            color={"#123abc"}
            loading={this.state.load}
          />
        </div>
      );
    }
  }
}

export default App;
