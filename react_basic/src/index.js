import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { init } from "./common/redux";
import rootReducer from "./redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
init(store);
