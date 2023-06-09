import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import UserProvider from './contexts/user-context';
import CategoryProvider from './contexts/category-context';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store'

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Provider store={ store }>
    <UserProvider>
      <CategoryProvider>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
      </CategoryProvider>
    </UserProvider>
  </Provider>

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
