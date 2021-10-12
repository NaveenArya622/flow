import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import LogIn from "./Login/LogIn";
import Header from "./Dashboard/Header";
import Users from "./Users/Users";
import Orders from "./Orders/Orders";
import Items from "./Items/Items";
import Order from "./Orders/Order";
import Dialog from "./Users/Dialog";
import Unassigned from "./UnassignedOrder/Unassigned";

const App = () =>{
  return (
      <Router className={'App'}>
          {/*<Header/>*/}
          <Route path={"/dashboard"} component={Header}/>
          <Route path={"/"} component={LogIn} exact/>
          <Route path={"/dashboard/:name"} component={Dashboard} exact/>
          <Route path={"/dashboard/users/:name"} component={Users}/>
          <Route path={"/dashboard/orders/:name"} component={Orders}/>
          <Route path={"/dashboard/order/:name"} component={Order}/>
          <Route path={"/dashboard/list/:name"} component={Items}/>
          <Route path={"/dashboard/users/:name/:id"} component={Dialog}/>
          <Route path={"/dashboard/Unassigned"} component={Unassigned} exact/>
      </Router>
  );
}

export default App;
