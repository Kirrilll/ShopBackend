import React from 'react';
import './App.css';
import { IShopItem } from './components/shop-item/shopItem';
import ShopItemContainer from './components/shop-item-container/shopItemContainer';
import MainPage from './pages/main-page/mainPage';
import LoginPage from './pages/login-page/loginPage';

function App() {
  return (
    <LoginPage></LoginPage>
    // <MainPage></MainPage>
  );
}

export default App;
