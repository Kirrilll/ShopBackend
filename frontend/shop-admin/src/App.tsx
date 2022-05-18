import React from 'react';
import './App.css';
import { IShopItem } from './components/shop-item/shopItem';
import ShopItemContainer from './components/shop-item-container/shopItemContainer';
import AdminPage from './pages/main-page/mainPage';
import LoginPage from './pages/login-page/loginPage';
import { Route, Router } from 'react-router-dom';

function App() {
  return (
    <LoginPage></LoginPage>
  );
}

export default App;
