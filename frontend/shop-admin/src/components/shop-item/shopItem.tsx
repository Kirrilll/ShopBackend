import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { BsFillCartPlusFill } from "react-icons/bs";
import { CustomCard, IShopItem } from "../admin-shop-item/adminShopItem";
import { IoAddOutline } from "react-icons/io5"
import { IoIosRemove } from 'react-icons/io'



interface IShopItemProp {
    item: IShopItem,
    addToBucket: (count: number) => void
}

const ShopItem: React.FC<IShopItemProp> = (props) => {

    const { item, addToBucket } = props;

    const [count, setCount] = useState<number>(1);

    const _handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        const numValue = +value;
        if (!Number.isInteger(numValue)) return;
        if (_isMax(numValue)) return;
        if (numValue < 0) return;
        setCount(numValue);
    }

    const _isMin = (value: number) => value <= 1;
    const _isMax = (value: number) => value >= item.count;

    const increment = () => {
        if (!_isMax(count)) setCount(count + 1);
    }

    const decrement = () => {
        if (!_isMin(count)) setCount(count - 1);
    }

    const isDisabled = () => _isMax(count - 1) || _isMin(count +1) || item.count == 0; 

    const onAddCart = () => {
        addToBucket(count);
        setCount(1);
    }

    return (
        <CustomCard style={{ width: '18rem' }}>
            <Card.Header className='d-flex justify-content-between'>
                <Card.Title>{item.name}</Card.Title>
            </Card.Header>
            <Card.Img width={'100%'} variant="top" src={'https://localhost:7176/' + item.imagePath} />
            <Card.Body>
                <Card.Text>{`${item.price} руб.`}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row className = 'align-items-center'>
                    <Col>
                        {
                            item.count == 0 
                            ? <div className = 'text-center' style = {{color: 'tomato'}}>Нет в налчии</div>
                            :<Row  className = 'align-items-strech'>
                            <Col style={{ padding: 0 }} sm={3} className = 'text-end'>
                                <div onClick={decrement} className='text-center'>
                                    <IoIosRemove />
                                </div>
                            </Col>
                            <Col>
                                <Form.Control size='sm' type="text" value={count} onChange={_handleInput} />
                            </Col>
                            <Col style={{ padding: 0 }} sm={3} className = 'text-end' >
                                <div onClick={increment} className='text-center'>
                                    <IoAddOutline />
                                </div>
                            </Col>
                        </Row>}
                    </Col>

                    <Col sm={4}>
                        <Button variant='primary' disabled = {isDisabled()} onClick = {onAddCart}>
                            <BsFillCartPlusFill color='white' />
                        </Button>
                    </Col>
                </Row>
            </Card.Footer>
        </CustomCard>
    );
}

export default ShopItem;