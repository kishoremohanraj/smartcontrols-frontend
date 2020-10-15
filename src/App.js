import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";
import Manager from "./components/manager";
import Developer from "./components/developer";
import NotFound from "./components/notFound";

function App() {
  return (
    <>
      <main className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/manager" component={Manager} />
          <Route path="/developer" component={Developer} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/register" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
