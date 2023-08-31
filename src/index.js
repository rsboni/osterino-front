// import './ndr '; // <--- first import
// import 'react-hot-loader';
// import 'react-hot-loader/patch';
// import {hot} from 'react-hot-loader/root';
// import whyDidYouRender from "@welldone-software/why-did-you-render";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
