import React from "react";
import { Badge, Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosRemove } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { CartItem } from "../../pages/shop-page/shopPage";

interface ICartItemCardProp {
    cartItem: CartItem,
    removeItem: () => void,
    changeItemCount: (newCount: number) => void
}

const CartItemCard: React.FC<ICartItemCardProp> = (props) => {

    const { cartItem, removeItem, changeItemCount } = props;

    const increment = () => changeItemCount(cartItem.count + 1);
    const decrement = () => changeItemCount(cartItem.count - 1)
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let target = e.currentTarget;
        const numValue = +target;
        if (!Number.isInteger(numValue)) return;
        changeItemCount(numValue);
    }

    return (
        <ListGroup.Item
            className="d-flex justify-content-between align-items-center"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{cartItem.item.name}</div>
                {cartItem.item.price}
            </div>
            <div>
                <Row className='align-items-strech'>
                    <Col style={{ padding: 0 }} sm={3} className='text-end'>
                        <div onClick={decrement} className='text-center'>
                            <IoIosRemove />
                        </div>
                    </Col>
                    <Col>
                        <Form.Control size='sm' type="text" value={cartItem.count} onChange={handleInput} />
                    </Col>
                    <Col style={{ padding: 0 }} sm={3} className='text-end' >
                        <div onClick={increment} className='text-center'>
                            <IoAddOutline />
                        </div>
                    </Col>
                </Row>
            </div>
            <Row className='align-items-center'>
                <Col>
                    <Badge bg="primary" pill>
                        {cartItem.count}
                    </Badge>
                </Col>
                <Col>
                    <div style={{ cursor: 'pointer' }} onClick={removeItem}>
                        <BsFillTrashFill color='tomato'></BsFillTrashFill>
                    </div>
                </Col>

            </Row>

        </ListGroup.Item>
    );
}

export default CartItemCard;