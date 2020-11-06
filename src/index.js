import React from "react";

import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import TagManager from "react-gtm-module";

import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { loadData } from "./thunk";

import rootReducer from "./reducers/rootReducer.js";
const tagManagerArgs = {
  gtmId: "<G-SJMFFM5EVV>",
};
TagManager.initialize(tagManagerArgs);

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(loadData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
