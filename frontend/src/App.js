import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import home from "./Component/Home/home";
import createAccount from "./Component/Account/createAccount";



function App() {

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path='/home' component={home} />
          <Route exact path='/Accounts' component={createAccount} />
 


          {/* <Redirect to='/home' component={home} /> */}
        </Switch>

      </Router>

    </div>
  )
}

export default App;
