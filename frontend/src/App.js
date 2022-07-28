import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import home from "./Component/Home/home";
import createAccount from "./Component/Account/createAccount";

import updateAccount from "./Component/Account/updateAccount";
import Product from "./Component/Products/AddProduct";
import invoice from "./Invoice/invoice";


function App() {

  return (
    <div>
      <Router>
        <Switch>


          <Route exact path='/Accounts' component={createAccount} />
          <Route exact path='/edit_Account/:id' component={updateAccount} />


          {/* product Component*/}
          <Route exact path='/products' component={Product} />

          {/* Invoice Component*/}
          <Route exact path='/invoice' component={invoice} />




          {/* <Redirect to='/home' component={home} /> */}
        </Switch>

      </Router>

    </div>
  )
}

export default App;
