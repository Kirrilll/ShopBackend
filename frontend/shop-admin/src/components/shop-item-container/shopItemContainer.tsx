import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Spinner, Col, Card, Button } from "react-bootstrap";
import { DataState } from "../../enums/dataState";
import ShopItemComparer from "../../helpers/shopItemComparer";
import useData from "../../hooks/useData";
import useHashData from "../../hooks/useHashedData";
import ShopItemAddModal from "../shop-item-add-modal/shopItemAddModal";
import ShopItem, { IShopItem } from "../shop-item/shopItem";

//TODO обрабатывать состояние ERROR
const ShopItemContainer: React.FC = () => {


    const [isShown, setIsShown] = useState<boolean>(false);

    const getAllItems = () => axios({
        url: 'https://localhost:7176/api/shop',
        method: 'GET'
    });

    //Объединить в 1 хук
    const { dataState, data, dataHandler } = useData<IShopItem>(getAllItems);
    useHashData(dataHandler, getAllItems, 1000, data);

    return (
        <>
        <ShopItemAddModal isShown = {isShown} handleHide = {() => setIsShown(false)}/>
       { dataState == DataState.NOT_LOADED
            ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            : <Container>
                <Button variant="primary" size="lg" onClick = {() => setIsShown(true)}> 
                    Добавить
                </Button>
                <Row xs={1} md={4} className="g-4">
                    {data.map((item) => (
                        <ShopItem key={item.id} {...item}></ShopItem>
                    ))}
                </Row>
            </Container>}
            </>
    )
}

export default ShopItemContainer;