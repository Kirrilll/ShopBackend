import { IShopItem } from "../components/shop-item/shopItem";

export default class ShopItemComparer {
    static equalsItem(item1: IShopItem, item2: IShopItem): boolean {
        return item1.id == item2.id 
                && item1.name == item2.name
                && item1.price == item2.price
                && item1.count == item2.count
                && item1.imagePath == item2.imagePath;
    }

    static equalsItems(list1: Array<IShopItem>, list2: Array<IShopItem>) : boolean {
        if(list1.length != list2.length)
            return false;
        
        for(let i =0; i < list1.length; i++){
            if(!this.equalsItem(list1[i], list2[i])) return false;
        }

        return true;
    }
}