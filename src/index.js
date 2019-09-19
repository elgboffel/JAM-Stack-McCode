// JS Goes here - ES6 supported
import "./css/main.scss";
import {onReady} from "./js/events/onReady";
import Clock from "./js/react/components/Clock";
import React from "react";
import ReactDOM from "react-dom";

onReady(() => {
  ReactDOM.render(<Clock />, document.querySelector("#clock"));
});
