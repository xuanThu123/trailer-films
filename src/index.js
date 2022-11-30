import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalStyle from "~/components/GlobalStyle/GlobalStyle";
import store from "~/app/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle>
        <Provider store={store}>
          <App />
        </Provider>
      </GlobalStyle>
    </Router>
  </React.StrictMode>
);
