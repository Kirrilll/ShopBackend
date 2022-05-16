import { AxiosPromise } from "axios";
import { useEffect, useRef } from "react";
import { IShopItem } from "../components/shop-item/shopItem";
import ShopItemComparer from "../helpers/shopItemComparer";


const useHashData = (
    dataHandler: (newValue: Array<IShopItem>) => void,
    apiCall: () => AxiosPromise,
    delay: number,
    initialData: Array<IShopItem>
) => {
    let cache = useRef<Array<IShopItem>>(initialData);
    
    useEffect(() => {
        let handler = setInterval(async () => {
            apiCall().then((res) => {
                if(res.status == 200 && !ShopItemComparer.equalsItems(res.data, cache.current!)) 
                {
                    cache.current = res.data;
                    dataHandler(res.data);
                    console.log(cache.current);
                }
                
            });
        }, delay);

        

        return () => clearInterval(handler);
    }, [])
}

export default useHashData;