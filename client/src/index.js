import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-notifications-component/dist/theme.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ReactNotifications } from 'react-notifications-component';
import { Notifications } from 'react-push-notification';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Notifications />
      <ReactNotifications />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
