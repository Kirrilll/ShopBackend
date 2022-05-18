import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsFillCartFill } from 'react-icons/bs'
import { useState } from "react";
import { IShopItem } from "../../components/admin-shop-item/adminShopItem";
import ShopItemContainer from "../../components/shop-items-container/shopItemContainer";
import { useEffect } from "react";
import useData from "../../hooks/useData";
import axios from "axios";
import CartModal from "../../components/cart-modal/cartModal";
import { useMemo } from "react";
import { RequestState } from "../../enums/requestState";

export interface CartItem {
    item: IShopItem,
    count: number
}

interface ICart {
    items: Array<CartItem>,
}

const ShopPage: React.FC = () => {

    const initialCart: ICart = {items: []};

    const [cart, setCart] = useState<ICart>(initialCart);
    const [isShown, setIsShown] = useState<boolean>(false);

    const allItems = useMemo(() => {
        let sum = 0;
        for (let item of cart.items) sum += item.count;
        return sum;
    }, [cart])

    const getAllItems = () => axios({
        url: 'https://localhost:7176/api/shop',
        method: 'GET'
    });

    const { dataState, data, updateData } = useData<IShopItem>(getAllItems, []);
    const [items, setItems] = useState<Array<IShopItem>>([]);

    useEffect(() => {
        setItems([...data]);
    }, [data])

    useEffect(() => {
        let cartDuplicate = [...cart.items];
        let dataDuplicate = [...data];

        while (cartDuplicate.length != 0) {
            dataDuplicate = dataDuplicate.map(item => {
                let itemDuplicate: IShopItem = { ...item };
                if (itemDuplicate.id === cartDuplicate[0].item.id) itemDuplicate.count -= cartDuplicate[0].count;
                return itemDuplicate;
            });
            cartDuplicate.shift();
        }
        setItems([...dataDuplicate]);
    }, [cart])

    const buy = async ( reqestHandler:(requestState: RequestState) => void) => {
        let ids = cart.items
            .map((cartItem) => Array.from({ length: cartItem.count })
                .fill(cartItem.item.id))
            .flat();
            reqestHandler(RequestState.LOADING);
            let responce = await axios.post(
                'https://localhost:7176/api/Order',
                {
                    userId: 1,
                    shopItemsId: ids
                }
            );
            if(responce.status == 200){
                updateData();
                setCart(initialCart);
                reqestHandler(RequestState.SUCCESSFULL);
            }
            else{
                reqestHandler(RequestState.ERROR);
            }
    }

    const changeItemCount = (item: CartItem, newValue: number) => {

        let index = cart.items.findIndex((el) => el.item.id === item.item.id);
        if (!~index) return;
        if (newValue > item.item.count) return;
        if (newValue < 1) return;
        setCart({
            items: [
                ...cart.items.slice(0, index), {
                    ...cart.items[index],
                    count: newValue
                },
                ...cart.items.slice(index + 1)
            ]
        });
    }

    const removeItem = (item: IShopItem) => {
        let index = cart.items.findIndex((el) => el.item.id === item.id)
        setCart({
            items: [
                ...cart.items.slice(0, index),
                ...cart.items.slice(index + 1)
            ]
        });
    }

    const addToBacket = (item: IShopItem, count: number) => {
        let valueIndex = cart.items.findIndex((el) => el.item.id === item.id);
        if (!~valueIndex) {
            setCart({
                items: [...cart.items, { item: item, count: count }]
            });
        }
        else {
            setCart({
                items: [...cart.items.slice(0, valueIndex), {
                    ...cart.items[valueIndex],
                    count: cart.items[valueIndex].count + count
                },
                ...cart.items.slice(valueIndex + 1)
                ]
            });
        }
    }

    return (
        <>
            <CartModal
                isShown={isShown}
                onBuy={buy}
                handleHide={() => setIsShown(false)}
                removeItem={removeItem}
                changeItemCount={changeItemCount}
                data={cart.items}
            />
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container>
                    <Navbar.Brand >Магазин</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Row className='gap-1 me-3 align-items-md-center' onClick={() => setIsShown(true)}>
                            <Col>
                                <BsFillCartFill className='mr-2' color='white'></BsFillCartFill>
                            </Col>
                            <Col style={{ color: 'white' }}>
                                {allItems}
                            </Col>
                        </Row>
                        <Navbar.Text>
                            <Link to="/">Выйти</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ShopItemContainer
                dataState={dataState}
                data={items}
                addToBucket={addToBacket}
            ></ShopItemContainer>
        </>
    )
}



export default ShopPage;