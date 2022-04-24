import React, { DependencyList, useEffect, useState } from "react";
import { IShopItem } from "../components/shop-item/shopItem";
import { DataState } from "../enums/dataState";

interface IDataConfig{
    method: string,
    body: any
}

const useData = <Type>(url: string, dependincies: DependencyList) => {
    const [dataState, setDataState] = useState<DataState>(DataState.NOT_LOADED);
    const [data, setData] = useState<Array<Type>>([]);

    useEffect(()=> {

    })
}