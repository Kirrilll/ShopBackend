import React from "react";
import { useState } from "react";
import { ShopItemState } from "../../enums/shopItemState";
import './shopItem.css'
import { Container, Row, Spinner, Col, Card } from "react-bootstrap";

export interface IShopItem {
    id: number,
    name: string,
    price: number,
    count: number,
    imagePath: string
}

const apiPath: string = 'https://localhost:7176/'

const ShopItem: React.FC<IShopItem> = (props) => {

    const [itemState, setItemState] = useState(ShopItemState.DEFAULT);

    return (
        <Card border='dark' style={{ width: '18rem' }}>
            <Card.Img width={'100%'} variant="top" src={'https://localhost:7176/' + props.imagePath} />
            <Card.Body>
                <Card.Title>
                    {props.name}
                </Card.Title>
                <Card.Text>{`${props.price} руб.`}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ShopItem