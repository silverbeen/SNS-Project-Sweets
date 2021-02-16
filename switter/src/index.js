import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import firebase from "firebase/app";
import "./styles/style.css";

console.log(firebase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
