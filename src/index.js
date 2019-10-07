// JS Goes here - ES6 supported
import "./css/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import {onReady} from "./js/events/onReady";
import Search from "./js/react/components/instantSearch";

onReady(() => {
  ReactDOM.render(<Search />, document.querySelector("#search"));
});
