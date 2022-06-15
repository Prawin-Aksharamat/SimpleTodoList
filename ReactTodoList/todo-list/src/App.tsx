import React, { Component } from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Login from "pages/login";
import Home from "pages/home"

class App extends Component{
  renderRouter(){
  return (
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
    </Switch>
  );
  }


render(){
  return(
    <BrowserRouter>{this.renderRouter()}</BrowserRouter>
  )
}
}
export default App;
