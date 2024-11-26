import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "../src/Redux/store"
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

Kommunicate.init("3fa45b51971ce65b0e46b53933ac893d5", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

reportWebVitals();
