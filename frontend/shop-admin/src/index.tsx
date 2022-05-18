import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/admin-page/adminPage';
import LoginPage from './pages/login-page/loginPage';
import ShopPage from './pages/shop-page/shopPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element = {<LoginPage/>}> </Route>
      <Route path = '/shop' element = {<ShopPage/>}></Route>
      <Route path='/admin' element = {<AdminPage/>}></Route>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
