import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Inspector } from "react-dev-inspector";
const InspectorWrapper = import.meta.env.DEV ? Inspector : React.Fragment;
import "./index.css";

console.log("import.meta: ", import.meta.env);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InspectorWrapper
      keys={["control", "shift", "command", "c"]}
      onHoverElement={() => {}}
      onClickElement={() => {}}
    >
      <App />
    </InspectorWrapper>
  </React.StrictMode>,
);
