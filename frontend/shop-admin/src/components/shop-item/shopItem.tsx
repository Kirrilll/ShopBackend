import React from "react";
import { useState } from "react";
import { ShopItemState } from "../../enums/shopItemState";
import { Container, Row, Spinner, Col, Card, CloseButton, Button, Image, FormControl } from "react-bootstrap";
import styled from 'styled-components'
import EDIT_ICON from '../../icons/edit.png'
import DELETE_ICON from '../../icons/delete.png'
import DONE_ICON from '../../icons/done.png'
import CLOSE_ICON from '../../icons/close.webp'

export interface IShopItem {
    id: number,
    name: string,
    price: number,
    count: number,
    imagePath: string
}

const apiPath: string = 'https://localhost:7176/'

const ShopItem: React.FC<IShopItem> = (props) => {

    //const [itemState, setItemState] = useState(ShopItemState.DEFAULT);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [item, setItem] = useState<IShopItem>({ ...props });

    return (
        <CustomCard border='dark' style={{ width: '18rem' }}>
            <Card.Header className='d-flex justify-content-between'>
                {
                    isEdit
                        ? <FormControl type='text' value={item.name} onChange={(e) => setItem({ ...item, name: e.currentTarget.value })} />
                        : <Card.Title>{props.name}</Card.Title>
                }

                <Row className='d-flex align-items-center justify-content-between flex-nowrap'>
                    {
                        isEdit
                            ? < Row className='d-flex justify-content-around align-items-center'>
                                <IconButton onClick={() => setIsEdit(false)}>
                                    <Image width='100%' src={DONE_ICON}></Image>
                                </IconButton>
                                <IconButton onClick={() => setIsEdit(false)}>
                                    <Image width='100%' src={CLOSE_ICON}></Image>
                                </IconButton>
                            </Row>
                            : <IconButton onClick={() => setIsEdit(true)}>
                                <Image width='100%' src={EDIT_ICON}></Image>
                            </IconButton>
                    }

                    <IconButton>
                        <Image width='100%' src={DELETE_ICON}></Image>
                    </IconButton>
                </Row>

            </Card.Header>
            <Card.Img width={'100%'} variant="top" src={'https://localhost:7176/' + props.imagePath} />
            <Card.Body>
                {
                    isEdit
                        ? <>
                            <FormControl type='text' value={item.price} onChange={(e) => setItem({ ...item, price: +e.currentTarget.value })} />
                            <FormControl type='text' value={item.count} onChange={(e) => setItem({ ...item, count: +e.currentTarget.value })} />
                        </>
                        : <>
                            <Card.Text>{`${props.price} руб.`}</Card.Text>
                            <Card.Text>{`${props.count} шт.`}</Card.Text>
                        </>
                }
            </Card.Body>
        </CustomCard>
    )
}

const CustomCard = styled(Card)`
    &&{
        border-radius: 15px;
        background-color: #c5c5c7;
    }
`;

const IconButton = styled(Button)`
    &&{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        padding: 0;
        background-color: transparent;
        border: none;
    }
`;


export default ShopItem