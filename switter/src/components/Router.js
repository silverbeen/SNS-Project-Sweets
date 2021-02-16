import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Profile from "../routers/Profile";
import Auth from "../routers/Auth";
import Home from "../routers/Home";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObject }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <Switch>
        <>
          {isLoggedIn ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route path="/" exact>
                <Home userObject={userObject} />
              </Route>
              <Route exact path="/profile">
                {/* 여기서 userObject 안보내줘서 한시간 동안 삽질 함 ㅅㅂ... 반성하자 은빈아 */}
                <Profile userObject={userObject} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </div>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
              <Redirect from="*" to="/" />
            </>
          )}
        </>
      </Switch>
    </Router>
  );
};
export default AppRouter;
