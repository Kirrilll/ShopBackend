import React from "react";
import { DataState } from "../../enums/dataState";
import useData from "../../hooks/useData";
import ShopItem, { IShopItem } from "../shop-item/shopItem";
import './shoptemContainer.css'

//TODO обрабатывать состояние ERROR
const ShopItemContainer:React.FC = () => {

    const {dataState, data} = useData<IShopItem>(
        'https://localhost:7176/api/shop',
        [],
        {
            method: 'GET',
            body: null
        }
    );

    return (
        <div className = 'shop-container'>
            {dataState == DataState.NOT_LOADED
            ? 'Загружается...' 
            : data.map(item => <ShopItem key = {item.id} {...item}></ShopItem>)}
        </div>
    )
}

export default ShopItemContainer;