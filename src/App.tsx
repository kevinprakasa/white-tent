import "./App.scss";
import "@progress/kendo-theme-material/dist/all.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Homepage } from "containers/Homepage";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from "@progress/kendo-react-layout";
import LoginPage from "containers/LoginPage";

let kendokaAvatar =
  "https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png";

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar>
          <AppBarSection>
            <button className="k-button k-button-clear">
              <span className="k-icon k-i-menu" />
            </button>
          </AppBarSection>

          <AppBarSpacer style={{ width: 4 }} />

          <AppBarSection>
            <h1 className="title">KendoReact</h1>
          </AppBarSection>

          <AppBarSpacer style={{ width: 32 }} />

          <AppBarSection>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/signup">signup</Link>
              </li>
            </ul>
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <span className="k-appbar-separator" />
          </AppBarSection>

          <AppBarSection>
            <Avatar shape="circle" type="image">
              <img src={kendokaAvatar} />
            </Avatar>
          </AppBarSection>
        </AppBar>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <div>register</div>
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
