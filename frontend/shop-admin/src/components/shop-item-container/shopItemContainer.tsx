import React from "react";
import { Container, Row, Spinner, Col, Card } from "react-bootstrap";
import { DataState } from "../../enums/dataState";
import useData from "../../hooks/useData";
import ShopItem, { IShopItem } from "../shop-item/shopItem";
import './shoptemContainer.css'

//TODO обрабатывать состояние ERROR
const ShopItemContainer: React.FC = () => {

    const { dataState, data } = useData<IShopItem>(
        'https://localhost:7176/api/shop',
        [],
        {
            method: 'GET',
            body: null
        }
    );

    return (
        dataState == DataState.NOT_LOADED
            ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            : <Container>
                <Row xs={1} md={4} className="g-4">
                    {data.map((item) => (
                        <Col>
                            <ShopItem key ={item.id} {...item}></ShopItem>
                        </Col>
                    ))}
                </Row>
            </Container>



    )
}

export default ShopItemContainer;