import axios from "axios";
import React from "react";
import { Accordion, Spinner, Stack } from "react-bootstrap";
import { DataState } from "../../enums/dataState";
import useData from "../../hooks/useData";
import { Order } from "../../types";
import OrderCard from "../order-card/orderCard";

const OrdersContainer: React.FC = () => {


    const { dataState, data, dataHandler } = useData<Order>(
        () => axios.get('https://localhost:7176/api/Order')
    );

    return (
        <Accordion className = 'p-5'>
            {
                dataState == DataState.NOT_LOADED
                    ? <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    : data.map(order => <OrderCard {...order}/>)
            }

        </Accordion>
    )
}
export default OrdersContainer;
