import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

const el = document.getElementById("app");

if (el.hasChildNodes()) {
    console.log('hydrate')
    ReactDOM.hydrate(<App />, document.getElementById("app"));
} else {
    console.log('render')
    ReactDOM.render(<App />, document.getElementById("app"));
}
