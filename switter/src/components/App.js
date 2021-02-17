import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../myBase";

function App() {
  const [init, setInit] = useState(false);
  //로그인여부 확인
  const [userObject, setUserObject] = useState("");

  //onAuthStateChanged 유저가 로그인이 되는지 안되는지 알려줌
  // 로그인, 로그아웃 할때에 사용
  //초기화가 되었을때에도
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObject({
          // 받아오는 크키를 줄여줌
          displayName: user.displayName,
          uid: user.displayName,
          profileURL: user.profileURL,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.displayName,
      profileURL: user.profileURL,
      updateProfile: (args) => user.updateProfile(args),
    });
    //setUserObject(authService.currentUser);
    //currentUser 로 했을때에는 제대로 작동이 되지만
    //리액트가 상대하기에 너무 상태가 크기때문에
    //크키를 줄여줌
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObject)}
          userObject={userObject}
        />
      ) : (
        "기다려"
      )}
      {/* <footer>&copy; switter {new Date().getFullYear()}</footer> */}
    </>
  );
}

export default App;
