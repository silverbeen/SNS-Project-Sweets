import { authService } from "../myBase";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState(null);
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value); //바뀐 값들을 저장
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지 onSubmit 은 기본값이 새로고침

    try {
      let data;
      //계정이 없어서 계정을 만등러야 할때,
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form className="container" onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="text"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
