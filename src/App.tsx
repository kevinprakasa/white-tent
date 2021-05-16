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
import SignupPage from "containers/SignupPage";
import AppLogoWhite from "assets/logo-white.svg";
import { useEffect, useRef, useState } from "react";
import { isUserLoggedIn } from "util/FirebaseAPI";
import { Popup } from "@progress/kendo-react-popup";

let kendokaAvatar =
  "https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png";

function App() {
  const [isUserLoggedInState, setIsUserLoggedInState] = useState(false);
  const [isShowMobileNavLinks, setIsShowMobileNavLinks] = useState(false);
  const burgerNavRef = useRef(null);
  const toggleMobileNavLinks = () => {
    setIsShowMobileNavLinks(!isShowMobileNavLinks);
  };

  useEffect(() => {
    setIsUserLoggedInState(isUserLoggedIn());
  }, []);

  return (
    <div className="App">
      <Router>
        <AppBar themeColor="dark">
          <AppBarSection
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
            }}
          >
            <Link to="/" style={{ height: "24px" }}>
              <img src={AppLogoWhite} alt="whitetent-logo-white"></img>
            </Link>
          </AppBarSection>

          <AppBarSpacer />
          <div className="nav-links-mobile">
            <AppBarSection>
              <button
                ref={burgerNavRef}
                className="k-button k-button-clear"
                style={{ color: "white" }}
                onClick={toggleMobileNavLinks}
              >
                <span className="k-icon k-i-menu" />
              </button>
              <Popup
                anchor={burgerNavRef.current}
                show={isShowMobileNavLinks}
                style={{
                  marginLeft: -10,
                }}
              >
                <div className="popup-content">
                  {!isUserLoggedInState ? (
                    <>
                      <div className="popup-nav-link">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          Login
                        </Link>
                      </div>
                      <div className="popup-nav-link">
                        <Link to="/signup" style={{ textDecoration: "none" }}>
                          Signup
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="popup-nav-link">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          Shops
                        </Link>
                      </div>
                      <div className="popup-nav-link">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          Favourites
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </Popup>
            </AppBarSection>
          </div>
          <div className="nav-links">
            {!isUserLoggedInState ? (
              <>
                <AppBarSection>
                  <ul>
                    <li>
                      <Link
                        to="/login"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                </AppBarSection>
                <AppBarSection>
                  <span className="k-appbar-separator" />
                </AppBarSection>

                <AppBarSection>
                  <ul>
                    <li>
                      <Link
                        to="/signup"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Signup
                      </Link>
                    </li>
                  </ul>
                </AppBarSection>
              </>
            ) : (
              <>
                <AppBarSection>
                  <ul>
                    <li>
                      <Link
                        to="/shops"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Shops
                      </Link>
                    </li>
                  </ul>
                </AppBarSection>
                <AppBarSection>
                  <span className="k-appbar-separator" />
                </AppBarSection>
                <AppBarSection>
                  <ul>
                    <li>
                      <Link
                        to="/favourites"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Favourites
                      </Link>
                    </li>
                  </ul>
                </AppBarSection>
                <AppBarSection>
                  <span className="k-appbar-separator" />
                </AppBarSection>
                <AppBarSection>
                  <Avatar shape="circle" type="image">
                    <img src={kendokaAvatar} alt="avatar-logo" />
                  </Avatar>
                </AppBarSection>
              </>
            )}
          </div>
        </AppBar>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
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
