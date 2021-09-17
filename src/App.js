import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNews from "./components/AddNews";
import NewsList from "./components/NewsList";
import UploadImg from "./uploadimg"

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/News"} className="nav-link">
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addNews"} className="nav-link">
              Add News
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addimg"} className="nav-link">
              Add Img
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2> Add News</h2>
        <Switch>
          <Route exact path={["/", "/News"]} component={NewsList} />
          <Route exact path="/addNews" component={AddNews} />
          <Route exact path="/addimg" component={UploadImg} />

        </Switch>
      </div>
    </div>
  );
}

export default App;
