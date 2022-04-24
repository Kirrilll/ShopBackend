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
        <div >
            item
        </div>
    )
}

export default ShopItem