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

interface BucketItem{
    item: IShopItem,
    count: number
}

interface IBucket {
    items: Array<BucketItem>,
    allCount: number
}

const ShopPage: React.FC = () => {

    const [bucket, setBucket] = useState<IBucket>({items: [], allCount: 0 });

    const getAllItems = () => axios({
        url: 'https://localhost:7176/api/shop',
        method: 'GET'
    });

    console.log(bucket);

    const { dataState, data } = useData<IShopItem>(getAllItems, [bucket]);

    const addToBacket = (item: IShopItem, count: number) => {
        let valueIndex = bucket.items.findIndex((el) => el.item.id === item.id);
        if(!~valueIndex){
            setBucket({
                allCount: bucket.allCount + count,
                items: [...bucket.items, {item: item, count: count}]
            });
        }
        else{
           setBucket({
               allCount: bucket.allCount + count,
               items: [...bucket.items.slice(0, valueIndex), {
                   ...bucket.items[valueIndex],
                    count: bucket.items[valueIndex].count + count },
                    ...bucket.items.slice(valueIndex +1)
                  ]
           });
        }
    }
    
    return (
        <>
            <Navbar bg='dark' variant='dark' expand='lg'>
                <Container>
                    <Navbar.Brand href="#home">Магазин</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Row className='gap-1 me-3 align-items-md-center'>
                            <Col>
                                <BsFillCartFill className='mr-2' color='white'></BsFillCartFill>
                            </Col>
                            <Col style = {{color: 'white'}}>
                                {bucket.allCount}
                            </Col>
                        </Row>
                        <Navbar.Text>
                            <Link to="/">Выйти</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ShopItemContainer 
                dataState = {dataState}
                data = {data}
                addToBucket = {addToBacket}
            ></ShopItemContainer>
        </>
    )
}



export default ShopPage;