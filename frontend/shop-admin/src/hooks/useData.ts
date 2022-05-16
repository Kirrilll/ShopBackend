import React, { DependencyList, useEffect, useRef, useState } from "react";
import { IShopItem } from "../components/shop-item/shopItem";
import { DataState } from "../enums/dataState";
import axios, { AxiosPromise } from "axios";


const useData = <Type>(request: () => AxiosPromise) => {
  const [dataState, setDataState] = useState<DataState>(DataState.NOT_LOADED);
  const [data, setData] = useState<Array<Type>>([]);

  useEffect(() => {
    request().then((res) => {
      if (res.status == 200) {
        setData(res.data);
        setDataState(DataState.LOADED);
      }
      else setDataState(DataState.ERROR)
    }).catch((e) => setDataState(DataState.ERROR));
  }, [])

  return { dataState, data, dataHandler: ((value: React.SetStateAction<Type[]>) => setData(value)) };
};

export default useData;

