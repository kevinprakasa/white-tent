/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense, useEffect, useRef, useState } from "react";
import { isUserLoggedIn, signOut } from "util/FirebaseAPI";

import "./App.scss";
import "@progress/kendo-theme-material/dist/all.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Popup } from "@progress/kendo-react-popup";
import { Loader } from "@progress/kendo-react-indicators";

import AppLogoWhite from "assets/logo-white.svg";
import { ActiveOrderNotification } from "containers/ActiveOrderNotification";
import OrderDetailPage from "containers/OrderDetailPage";

const Homepage = React.lazy(() => import("containers/Homepage"));
const LoginPage = React.lazy(() => import("containers/LoginPage"));
const SignupPage = React.lazy(() => import("containers/SignupPage"));
const StorePage = React.lazy(() => import("containers/StorePage"));
const OrderPage = React.lazy(() => import("containers/OrderPage"));
const ReportPage = React.lazy(() => import("containers/ReportPage"))
const TransactionCompletePage = React.lazy(
  () => import("containers/TransactionCompletePage")
);

function App() {
  const [isUserLoggedInState, setIsUserLoggedInState] = useState(false);
  const [isShowMobileNavLinks, setIsShowMobileNavLinks] = useState(false);
  const burgerNavRef = useRef(null);
  const toggleMobileNavLinks = () => {
    setIsShowMobileNavLinks(!isShowMobileNavLinks);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsUserLoggedInState(isUserLoggedIn());
    }, 1000);
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
                        <a
                          onClick={() => {
                            signOut(
                              (res: any) => {
                                window.location.reload();
                              },
                              (err: any) => {
                                console.error(err);
                              }
                            );
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          Logout
                        </a>
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
                    <li
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={() => {
                        signOut(
                          (res: any) => {
                            window.location.reload();
                          },
                          (err: any) => {
                            console.error(err);
                          }
                        );
                      }}
                    >
                      Logout
                    </li>
                  </ul>
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
            <Route path="/report">
              <Suspense fallback={loader}>
                <ReportPage />
              </Suspense>
            </Route>
            <Route path="/order-detail">
              <Suspense fallback={loader}>
                <OrderDetailPage />
              </Suspense>
            </Route>
            <Route path="/" exact>
              <Suspense fallback={loader}>
                <Homepage />
              </Suspense>
            </Route>
          </Switch>
          <ActiveOrderNotification></ActiveOrderNotification>
        </div>
      </Router>
    </div>
  );
}

export default App;
