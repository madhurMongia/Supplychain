import React  from "react";
import {Redirect, Route, Switch} from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import {Register } from "./login/register";
import {Instructions} from "./contexts/instructions";
import {Login} from "./login/login";

 function App(){


    return (
      <div style = {{
        height:"100%",
        backgroundColor:"#5cdb95"
      }}>
        <Switch>

          {/*Instructions*/}
          <Route component ={Instructions} path = "/instructions"/>
          {/*Dashboard*/}
          <Redirect path = "/" to = "/home" exact/>
          <Redirect push path = "/home" to = "/home/trackproduct" exact/>
          <PrivateRoute path = "/home"/>

        {/*Auth Route*/}
         <Route component = {Register} path = "/signup"/>
         <Route component = {Login} path = "/login" />
        </Switch>
        </div>
    );
  }

  export default App;
