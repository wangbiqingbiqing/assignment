import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter, Router} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from './App';
import history from './history'
import appData from './reducers'
import * as serviceWorker from './serviceWorker';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(appData,composeEnhancers(applyMiddleware(thunk)));
console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    <App />
    </Router>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
