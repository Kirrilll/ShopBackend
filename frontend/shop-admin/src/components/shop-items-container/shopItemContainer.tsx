import axios from "axios";
import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { DataState } from "../../enums/dataState";
import useData from "../../hooks/useData";
import { IShopItem } from "../admin-shop-item/adminShopItem";
import ShopItem from "../shop-item/shopItem";

interface IShopItemsContainerProp{
    addToBucket: (item: IShopItem, count: number) => void,
    data: Array<IShopItem>,
    dataState: DataState
}

const ShopItemContainer: React.FC<IShopItemsContainerProp> = (props) => {


    const {data, dataState, addToBucket} = props;

    return (
        <Container className='test-center p-4'>
            {DataState.LOADED
                ? <Row xs={1} md={2} className="g-4">
                    {data.map(item => <Col key = {item.id} ><ShopItem key = {item.id} addToBucket = {(count) => addToBucket(item, count)} item={item}></ShopItem></Col>)}
                </Row>
                : <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
        </Container>
    )
}

export default ShopItemContainer;