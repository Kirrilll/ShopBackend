import React from "react";
import { useState } from "react";
import { Container, Navbar, Tab, Tabs } from "react-bootstrap";
import OrdersContainer from "../../components/orders-container/ordersContainer";
import ShopItemContainer from "../../components/shop-item-container/shopItemContainer";
import UsersContainer from "../../components/users-container/usersContainer";

const AdminPage: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState('Items');

    return (
        <>
            <Navbar bg = 'dark' variant = 'dark' >
                <Container>
                    <Navbar.Brand>Магазин</Navbar.Brand>
                </Container>
            </Navbar>
            <Tabs
                activeKey={selectedTab}
                id="controlled-tab-example"
                onSelect={(key) => setSelectedTab(key!)}
                className="mb-3 ">
                <Tab eventKey="Items" title="Товары">
                    <ShopItemContainer></ShopItemContainer>
                </Tab>
                <Tab eventKey="Users" title="Пользователи">
                    <UsersContainer></UsersContainer>
                </Tab>
                <Tab eventKey="Orders" title="Заказы">
                    <OrdersContainer></OrdersContainer>
                </Tab>
            </Tabs>
        </>
    )
}



export default AdminPage;