import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Spinner, Col, Card, Button } from "react-bootstrap";
import { DataState } from "../../enums/dataState";
import ShopItemComparer from "../../helpers/shopItemComparer";
import useData from "../../hooks/useData";
import useHashData from "../../hooks/useHashedData";
import AdminShopItemAddModal from "../admin-shop-item-add-modal/adminShopItemAddModal";
import AdminShopItem, { IShopItem } from "../admin-shop-item/adminShopItem";

//TODO обрабатывать состояние ERROR
const AdminShopItemContainer: React.FC = () => {


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
            <AdminShopItemAddModal isShown={isShown} handleHide={() => setIsShown(false)} />
            {dataState == DataState.NOT_LOADED
                ? <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                : <Container>

                    <Row xs={1} md={4} className="g-4">
                        <Col>
                            <Button variant="primary" size="lg" onClick={() => setIsShown(true)}> Добавить </Button>
                        </Col>

                        {data.map((item) => (
                            <Col>
                                <AdminShopItem key={item.id} {...item}></AdminShopItem>
                            </Col>
                        ))}
                    </Row>
                </Container>}
        </>
    )
}

export default AdminShopItemContainer;