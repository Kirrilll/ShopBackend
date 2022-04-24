import React from "react";
import { AdminTabs } from "../../enums/adminTabs";
import ShopItemContainer from "../shop-item-container/shopItemContainer";

const ContentConfigurator:React.FC<{selectedTab: AdminTabs}> = (props) => {

    let content;

    switch(props.selectedTab){
        case AdminTabs.SHOP:
            content = <ShopItemContainer></ShopItemContainer>
            break;
        case AdminTabs.USERS:
            content = <div>пользователи</div>
            break;
        default:
            content = <div>Такой страницы не существует</div>
    }

    return <section className = 'content'>{content}</section>
}

export default ContentConfigurator