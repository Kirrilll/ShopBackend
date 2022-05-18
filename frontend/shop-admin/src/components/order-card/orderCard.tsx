import React from 'react'
import { Accordion, Col, Row, Stack } from 'react-bootstrap'
import { Order } from '../../types'

const OrderCard: React.FC<Order> = (order) => {


    let date: Date = new Date(order.createdAt);

    return (
        <Accordion.Item eventKey={order.id.toString()}>
            <Accordion.Header className='align-items-center p-4'>
                <Col>
                    <div className='mb-4 font-weight-bold text-lg-left'> {`Заказ # ${order.id}`}</div>
                    <div className='mb-4 font-weight-bold text-lg-left'>  {`Дата заказа: ${date.toLocaleString()}`} </div>
                    <div>  {`Заказчик: ${order.userName}`} </div>
                </Col>
            </Accordion.Header>
            <Accordion.Body>
                <Stack className='p-2 gap-2'>
                    {order.orderContents.map(orderContent => (
                        <Row>
                            <Col sm={10}>{orderContent.shopItemInOrder.name}</Col>
                            <Col sm={1}>{`Куплено: ${orderContent.count}`}</Col>
                            <Col sm={1}>{`Итого: ${orderContent.count * orderContent.shopItemInOrder.price}`}</Col>
                        </Row>
                    ))}
                </Stack>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default OrderCard;