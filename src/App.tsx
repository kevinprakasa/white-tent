import "./App.css";
import "@progress/kendo-theme-default/dist/all.css";
import { Calendar } from "@progress/kendo-react-dateinputs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/register">register</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <div>login</div>
              <Calendar />
            </Route>
            <Route path="/register">
              <div>register</div>
            </Route>
            <Route path="/">
              <div>root</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
