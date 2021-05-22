import React, { Suspense, useEffect, useRef, useState } from "react";
import { isUserLoggedIn, signOut } from "util/FirebaseAPI";

import "./App.scss";
import "@progress/kendo-theme-material/dist/all.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from "@progress/kendo-react-layout";
import { Popup } from "@progress/kendo-react-popup";
import { Loader } from "@progress/kendo-react-indicators";

import AppLogoWhite from "assets/logo-white.svg";
import ReportViewer from 'components/ReportComponents/ReportViewer';

const Homepage = React.lazy(() => import("containers/Homepage"));
const LoginPage = React.lazy(() => import("containers/LoginPage"));
const SignupPage = React.lazy(() => import("containers/SignupPage"));
const StorePage = React.lazy(() => import("containers/StorePage"));
const OrderPage = React.lazy(() => import("containers/OrderPage"));
const TransactionCompletePage = React.lazy(
  () => import("containers/TransactionCompletePage")
);

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

  const loader = (
    <div
      style={{
        width: "100%",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size={"large"} type={"infinite-spinner"} />
    </div>
  );

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
                      <div
                        className="popup-nav-link"
                        style={{ fontWeight: "bold" }}
                        onClick={() => {
                          signOut(
                            (res: any) => {
                              console.log(res);
                              window.location.reload();
                            },
                            (err: any) => {
                              console.error(err);
                            }
                          );
                        }}
                      >
                        Logout
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
              <Suspense fallback={loader}>
                <LoginPage />
              </Suspense>
            </Route>
            <Route path="/signup">
              <Suspense fallback={loader}>
                <SignupPage />
              </Suspense>
            </Route>
            <Route path="/store/:id">
              <Suspense fallback={loader}>
                <StorePage />
              </Suspense>
            </Route>
            <Route path="/order/:id">
              <Suspense fallback={loader}>
                <OrderPage />
              </Suspense>
            </Route>
            <Route path="/transaction/:id">
              <Suspense fallback={loader}>
                <TransactionCompletePage />
              </Suspense>
            </Route>
            <Route path="/" exact>
              <Suspense fallback={loader}>
                <Homepage />
              </Suspense>
            </Route>
        </Switch>
        <ReportViewer />
        </div>
      </Router>
    </div>
  );
}

export default App;
