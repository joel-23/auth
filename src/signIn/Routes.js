import React, { Component } from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  Redirect
} from "react-router-dom";

import SignUpEmail from "./SignUpEmail";
import SignInEmail from "./SignInEmail";
import Profile from "../Profile/Profile";

import firebase from "firebase";
import firebaseConfig from "../firebaseConfig";
firebase.initializeApp(firebaseConfig);

const ProtectedRoute = ({ auth, ...props }) =>
  auth ? <Route {...props} /> : <Redirect to="/signin" />;

class Routes extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.auth ? <Redirect to="/profile" /> : <SignInEmail />
            }
          />
          <Route
            path="/signin"
            render={() =>
              this.props.auth ? <Redirect to="/profile" /> : <SignInEmail />
            }
          />
          <Route
            path="/signup"
            render={() =>
              this.props.auth ? <Redirect to="/profile" /> : <SignUpEmail />
            }
          />
          <ProtectedRoute
            auth={this.props.auth}
            path="/profile"
            component={Profile}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
