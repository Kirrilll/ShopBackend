import React from "react";
import ShopItem, { IShopItem } from "../shop-item/shopItem";

export interface IShopContainer{
    items: Array<IShopItem>
}

const ShopItemContainer:React.FC<IShopContainer> = (props) => {
    return (
        <div>
            {props.items.map(item => <ShopItem key = {item.id} {...item}></ShopItem>)}
        </div>
    )
}

export default ShopItemContainer;