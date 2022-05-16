import React from 'react'
import { Accordion, Col, Row, Stack } from 'react-bootstrap'
import { Order } from '../../types'

const OrderCard: React.FC<Order> = (order) => {
    return (
        <Accordion.Item eventKey = {order.id.toString()}>
            <Accordion.Header>
                <Row sm = {8}>
                    <Col className = 'p-4 text-start' >{`Заказ # ${order.id}`}</Col>
                    <Col className = 'p-4 text-end'>{`Дата заказа: ${order.createdAt}`}</Col>
                </Row>
            </Accordion.Header>
            <Accordion.Body>
                <Stack className = 'p-5 gap-4'>
                    {order.orderContents.map(orderContent => (
                        <Row>
                            <Col sm = {10}>{orderContent.shopItemInOrder.id}</Col>
                            <Col sm ={1}>{`Куплено: ${orderContent.count}`}</Col>
                            <Col sm = {1}>{`Итого: ${orderContent.count *orderContent.shopItemInOrder.price }`}</Col>
                        </Row>
                    ))}
                </Stack>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default OrderCard;