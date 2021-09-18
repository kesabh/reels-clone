import React, { useContext } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SingUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";

// firebase import
import firebaseAuth from "./config/firebase";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthProvider";

const App = () => {
  return ( 
    <AuthProvider>
      <Router>
        <Header></Header>
        <Switch>
          <PrivateRoute exact path="/" component={Feed}></PrivateRoute>
          <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
          <Route exact path="/signup" component={SingUp}></Route>
          <Route exact path="/signin" component={SignIn}></Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
};

function PrivateRoute(props) {
  console.log(props);
  let  value = useContext(AuthContext);
  console.log(value)
  return value.currentUser ? (
    <Route path={props.path} component={props.component} exact>
      
    </Route>
  ) : (
    <Redirect to="/signin"></Redirect>
  );
}

export default App;
