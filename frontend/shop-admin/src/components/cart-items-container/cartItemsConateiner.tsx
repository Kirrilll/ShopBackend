import React from "react";
import { ListGroup } from "react-bootstrap";
import { CartItem } from "../../pages/shop-page/shopPage";
import { IShopItem } from "../admin-shop-item/adminShopItem";
import CartItemCard from "../cart-item/cartItem";

interface ICartItemContainerProp {
    data: Array<CartItem>,
    removeItem: (item: IShopItem) => void,
    changeItemCount: (item: CartItem, newValue: number) => void,
}

const CartItemsContainer: React.FC<ICartItemContainerProp> = (props) => {
    return (
        <ListGroup>
            {props.data.map(item => <CartItemCard
                cartItem={item}
                removeItem={() => props.removeItem(item.item)}
                changeItemCount = {(count) => props.changeItemCount(item, count)}
            />)}
        </ListGroup>
    );
}

export default CartItemsContainer;