import React from "react";
import { useState } from "react";
import { Container, Navbar, Tab, Tabs } from "react-bootstrap";
import ShopItemContainer from "../../components/shop-item-container/shopItemContainer";
import './mainPage.css'

const MainPage: React.FC = () => {

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
                    <div> Страница пользователей в разработке</div>
                </Tab>
                <Tab eventKey="Orders" title="Заказы">
                    <div>Страница заказов в разработке</div>
                </Tab>
            </Tabs>
        </>
    )
}



export default MainPage;