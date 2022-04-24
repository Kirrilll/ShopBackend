import React from "react";
import { useState } from "react";
import ContentConfigurator from "../../components/content-configurator/contentConfigurator";
import { AdminTabs } from "../../enums/adminTabs";
import './mainPage.css'

const MainPage: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState(AdminTabs.SHOP);

    return (
        <>
            <header className='header'></header>
            <ContentConfigurator selectedTab = {selectedTab}></ContentConfigurator>
        </>
    )
}

export default MainPage;