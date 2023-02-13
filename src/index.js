import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import store from "./redux/store"
import { Provider } from 'react-redux';

import App from './App';
import "./index.css"
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.css';

import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={1500}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        hideProgressBar={false}
        newestOnTop={false}
        />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
