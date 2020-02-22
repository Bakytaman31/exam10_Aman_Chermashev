import React from 'react';
import {NavLink, Route, Switch} from "react-router-dom";

import Form from "./containers/Form/Form";
import News from "./containers/News/News";
import SingleNews from "./containers/SingleNews/SingleNews";

function App() {
  return (
    <div className="App" style={{textAlign: 'center'}}>
      <nav className="navbar navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
            News
        </NavLink>
        <NavLink to="/newPost">
          <button className="btn btn-primary">Add new post</button>
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/" component={News}/>
        <Route path="/news/:id" component={SingleNews}/>
        <Route path="/newPost" component={Form}/>
      </Switch>
    </div>
  );
}

export default App;
