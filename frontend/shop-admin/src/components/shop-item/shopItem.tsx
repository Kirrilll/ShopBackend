import React from "react";
import { useState } from "react";
import { ShopItemState } from "../../enums/shopItemState";
import './shopItem.css'

export interface IShopItem{
    id: number,
    name: string,
    price: number,
    count: number
}

const ShopItem: React.FC<IShopItem> = (props) => {

    const [itemState, setItemState] = useState(ShopItemState.DEFAULT);

    

    return (
        <div className = 'shop-item'>
            <div>
               <div className = 'shop-item__title'>{props.name}</div>
                <div className = 'shop-item__price'>{`${props.price} руб.`}</div> 
            </div>
            <button>Удалить</button>
        </div>
    )
}

export default ShopItem