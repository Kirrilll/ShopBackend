import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { RequestState } from "../../enums/requestState";
import { CartItem } from "../../pages/shop-page/shopPage";
import { IShopItem } from "../admin-shop-item/adminShopItem";
import CartItemsContainer from "../cart-items-container/cartItemsConateiner";

interface ICartModel {
    isShown: boolean,
    onBuy: (reqestHandler: (requestState: RequestState) => void) => Promise<void>,
    handleHide: () => void,
    removeItem: (item: IShopItem) => void,
    changeItemCount: (item: CartItem, newValue: number) => void,
    data: Array<CartItem>
}

const CartModal: React.FC<ICartModel> = (props) => {

    const onHide = () => {
        props.handleHide();
        setRequestState(RequestState.IDLE);
    }

    const [requestState, setRequestState] = useState<RequestState>(RequestState.IDLE);

    const _buildCartBody = () => {
        switch (requestState) {
            case RequestState.IDLE:
                if (props.data.length == 0)
                    return <div className='p-2 text-center'>Корзина пуста =(</div>
                else
                    return <CartItemsContainer
                        removeItem={props.removeItem}
                        changeItemCount={props.changeItemCount}
                        data={props.data} />
            case RequestState.LOADING:
                return <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            case RequestState.ERROR:
                return <div style = {{color: 'tomato'}} className='p-2 text-center'>Ошибка</div>
            case RequestState.SUCCESSFULL:
                return <div style = {{color: 'green'}} className='p-2 text-center'>Ваш заказ принят</div>
        }
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
            show={props.isShown}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Корзина
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {_buildCartBody()}
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={props.data.length == 0} onClick={() => props.onBuy(setRequestState)}>Офрмить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CartModal;