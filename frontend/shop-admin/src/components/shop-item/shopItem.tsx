import React from "react";
import './shopItem.css'

export interface IShopItem{
    id: number,
    name: string,
    price: number,
    count: number
}

const ShopItem: React.FC<IShopItem> = (props) => {
    return (
        <div className = 'shop-item'>
            <div className = 'shop-item__title'>{props.name}</div>
            <div className = 'shop-item__price'>{props.price}</div>
        </div>
    )
}

export default ShopItem