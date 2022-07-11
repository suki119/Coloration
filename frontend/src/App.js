import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import home from "./Component/Home/home";
import createAccount from "./Component/Account/createAccount";
import DatatablePage from "./Component/Account/DatatablePage";
import updateAccount from "./Component/Account/updateAccount";


function App() {

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path='/home' component={DatatablePage} />
          <Route exact path='/Accounts' component={createAccount} />
          <Route exact path='/edit_Account/:id' component={updateAccount} />
 
 


          {/* <Redirect to='/home' component={home} /> */}
        </Switch>

      </Router>

    </div>
  )
}

export default App;
