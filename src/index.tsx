import React from "react";
import ReactDOM from "react-dom";

import Kanban from "./Kanban";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Kanban />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
